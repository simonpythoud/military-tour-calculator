import type React from 'react';
import { useRef } from 'react';
import { FaUpload, FaRoute } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { parseNavigationFile, getSupportedExtensions } from '../utils/gpxParser';
import type { GpxRoute } from '../types';
import { toast } from 'react-toastify';

interface Props {
  onRouteLoaded: (route: GpxRoute) => void;
  hasRoute: boolean;
  onClearRoute: () => void;
}

const GpxUpload: React.FC<Props> = ({ onRouteLoaded, hasRoute, onClearRoute }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const route = parseNavigationFile(content, file.name);
      onRouteLoaded(route);
      toast.success(t('gpxImportSuccess'));
    } catch (_err) {
      toast.error(t('gpxImportError'));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow mb-4 sm:mb-6">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center gap-2">
        <FaRoute className="text-military-green" />
        {t('gpxImport')}
      </h2>
      <p className="text-sm text-gray-600 mb-3">{t('gpxImportDescription')}</p>
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-military-green text-white rounded hover:bg-opacity-90 cursor-pointer">
          <FaUpload />
          {t('gpxUploadFile')}
          <input
            ref={fileInputRef}
            type="file"
            accept={getSupportedExtensions().join(',')}
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {hasRoute && (
          <button
            type="button"
            onClick={onClearRoute}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {t('gpxClearRoute')}
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {t('gpxSupportedFormats')}: .gpx, .kml, .tcx
      </p>
    </div>
  );
};

export default GpxUpload;
