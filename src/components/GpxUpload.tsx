import type React from 'react';
import { useRef, useState } from 'react';
import { FaUpload, FaRoute, FaTrash, FaFile } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import {
  parseNavigationFile,
  getSupportedExtensions,
} from '../utils/gpxParser';
import type { GpxRoute } from '../types';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE, SUPPORTED_EXTENSIONS } from '../constants/limits';

interface Props {
  onRouteLoaded: (route: GpxRoute) => void;
  hasRoute: boolean;
  onClearRoute: () => void;
  fileName?: string;
}

const GpxUpload: React.FC<Props> = ({
  onRouteLoaded,
  hasRoute,
  onClearRoute,
  fileName,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t('gpxFileTooBig'));
      return;
    }

    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      toast.error(t('invalidFileExtension'));
      return;
    }

    try {
      const content = await file.text();
      const route = parseNavigationFile(content, file.name);
      onRouteLoaded(route);
      toast.success(t('gpxImportSuccess'));
    } catch (_err) {
      toast.error(t('gpxImportError'));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await processFile(file);
  };

  return (
    <section
      className={`p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6 transition-colors duration-200 ${
        isDragging
          ? 'bg-green-50 border-2 border-military-green border-dashed'
          : 'bg-white border-2 border-transparent'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={t('gpxImport')}
    >
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <FaRoute className="text-military-green" />
        {t('gpxImport')}
      </h2>
      <p className="text-sm text-gray-600 mb-3">{t('gpxImportDescription')}</p>
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-military-green text-white rounded hover:bg-opacity-90 cursor-pointer focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-military-green transition-shadow">
          <FaUpload />
          {t('gpxUploadFile')}
          <input
            ref={fileInputRef}
            type="file"
            accept={getSupportedExtensions().join(',')}
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        {!hasRoute && (
          <span className="text-sm text-gray-500 hidden sm:inline">
            or drag & drop file here
          </span>
        )}
        {hasRoute && fileName && (
          <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-2 rounded-md border border-gray-200">
            <FaFile className="text-military-green" />
            <span className="font-medium text-gray-700 truncate max-w-[150px] sm:max-w-[300px]" title={fileName}>
              <span className="font-normal text-gray-500 mr-1">{t('gpxLoadedFile')}:</span>
              {fileName}
            </span>
          </div>
        )}
        {hasRoute && (
          <button
            type="button"
            onClick={onClearRoute}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200 ml-auto sm:ml-0"
            aria-label={t('gpxClearRoute')}
            title={t('gpxClearRoute')}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {t('gpxSupportedFormats')}: .gpx, .kml, .tcx
      </p>
    </section>
  );
};

export default GpxUpload;
