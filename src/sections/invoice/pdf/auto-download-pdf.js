import { pdf } from '@react-pdf/renderer';
import { useEffect } from 'react';

import InvoicePDF from './invoice-pdf';

const AutoDownloadPDF = ({ invoice, customer, handleGoBack }) => {
  useEffect(() => {
    const generateAndDownloadPDF = async () => {
      const doc = <InvoicePDF invoice={invoice} customer={customer} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);

      // Criar e simular um clique no link para baixar o arquivo
      const a = document.createElement('a');
      a.href = url;
      a.download = `${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      handleGoBack();
    };

    generateAndDownloadPDF();
  }, [invoice, customer]);

  return null; // Este componente não renderiza nada visível
};

export default AutoDownloadPDF;
