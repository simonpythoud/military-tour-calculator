import type React from 'react';
import jsPDF from 'jspdf';
import { FaFilePdf, FaFileCsv } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

interface Props {
  results: any;
  //   breaks: any[];
}

// const ExportResults: React.FC<Props> = ({ results, breaks }) => {
const ExportResults: React.FC<Props> = ({ results }) => {
  const { t } = useLanguage();

  const exportPDF = () => {
    const doc = new jsPDF();

    // Set title
    doc.setFontSize(20);
    doc.setTextColor(75, 83, 32); // military green
    doc.text(t('title'), 105, 20, { align: 'center' });

    // Input Parameters Section
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(t('distanceMeasurements'), 20, 40);

    // Create a table for distance measurements
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    const distanceData = [
      [t('horizontalDistance'), `${results.inputs.horizontalDistance} km`],
      [t('verticalDistance'), `${results.inputs.verticalDistance} m`],
    ];
    autoTable(doc, {
      startY: 45,
      head: [],
      body: distanceData,
      theme: 'plain',
      margin: { left: 20 },
      styles: { fontSize: 12 },
    });

    // Influencing Factors Section
    doc.setFontSize(16);
    doc.text(t('influencingFactors'), 20, 75);

    const factorsData = [
      [t('condition_title'), t(`condition_${results.inputs.condition.toLowerCase()}` as any)],
      [t('technical_title'), t(`technical_${results.inputs.technicalSkill.toLowerCase()}` as any)],
      [t('weight_title'), t(`weight_${results.inputs.weight.toLowerCase()}` as any)],
      [t('terrain_title'), t(`terrain_${results.inputs.terrain.toLowerCase()}` as any)],
      [t('conditions_title'), t(`conditions_${results.inputs.conditionType.toLowerCase()}` as any)]
    ];

    autoTable(doc, {
      startY: 80,
      head: [],
      body: factorsData,
      theme: 'plain',
      margin: { left: 20 },
      styles: { fontSize: 12 },
    });

    // Results Section
    doc.setFontSize(16);
    doc.text(t('results'), 20, 145);

    const resultsData = [
      [t('totalTime'), results.calculations.total],
      [t('horizontalTime'), results.calculations.horizontal],
      [t('verticalTime'), results.calculations.vertical],
      [
        t('speedAdaptedToFactorPercentage'),
        `${Math.round(results.calculations.multiplier * 100)}%`,
      ],
    ];

    autoTable(doc, {
      startY: 150,
      head: [],
      body: resultsData,
      theme: 'striped',
      margin: { left: 20 },
      styles: { fontSize: 12 },
      headStyles: { fillColor: [75, 83, 32] },
    });

    // Performance Graph
    doc.addPage();
    doc.setFontSize(16);
    doc.text(t('performanceEvolution'), 20, 20);

    // Convert performance graph to image and add it
    const graphElement = document.querySelector(
      '.recharts-wrapper'
    ) as HTMLElement;
    if (graphElement) {
      html2canvas(graphElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 20, 30, 170, 100);

        // Add performance warning
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(t('performanceWarning'), 20, 140, { maxWidth: 170 });

        // Save the document
        doc.save('military-tour-calculation.pdf');
      });
    } else {
      doc.save('military-tour-calculation.pdf');
    }
  };

  const exportCSV = () => {
    // Prepare the CSV data
    const headers = ['Category', 'Value'];
    const rows = [
      // Distance Measurements
      [t('horizontalDistance'), `${results.inputs.horizontalDistance} km`],
      [t('verticalDistance'), `${results.inputs.verticalDistance} m`],
      ['', ''], // Empty row for separation

      // Tactical Factors
      [t('condition_title'), t(`condition_${results.inputs.condition.toLowerCase()}` as any)],
      [t('technical_title'), t(`technical_${results.inputs.technicalSkill.toLowerCase()}` as any)],
      [t('weight_title'), t(`weight_${results.inputs.weight.toLowerCase()}` as any)],
      [t('terrain_title'), t(`terrain_${results.inputs.terrain.toLowerCase()}` as any)],
      [t('conditions_title'), t(`conditions_${results.inputs.conditionType.toLowerCase()}` as any), '', ''], // Empty row for separation

      // Results
      [t('totalTime'), results.calculations.total],
      [t('horizontalTime'), results.calculations.horizontal],
      [t('verticalTime'), results.calculations.vertical],
      [
        t('speedAdaptedToFactorPercentage'),
        `${Math.round(results.calculations.multiplier * 100)}%`,
      ],
    ];

    // Convert to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'military-tour-calculation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={exportPDF}
        className="flex items-center gap-2 px-4 py-2 bg-military-green text-white rounded hover:bg-opacity-90"
      >
        <FaFilePdf />
        {t('exportPDF')}
      </button>
      <button
        onClick={exportCSV}
        className="flex items-center gap-2 px-4 py-2 bg-military-brown text-white rounded hover:bg-opacity-90"
      >
        <FaFileCsv />
        {t('exportCSV')}
      </button>
    </div>
  );
};

export default ExportResults;
