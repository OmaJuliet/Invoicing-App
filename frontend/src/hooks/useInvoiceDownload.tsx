// hooks/useInvoiceDownload.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from '../types';

const useInvoiceDownload = () => {
  const downloadInvoice = (invoice: Invoice) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Invoice', 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Sender Email', 'Recipient Email', 'Date', 'Due Date', 'Total']],
      body: [
        [
          invoice.attributes.name,
          invoice.attributes.senderEmail,
          invoice.attributes.recipientEmail,
          invoice.attributes.date,
          invoice.attributes.dueDate,
          invoice.attributes.total,
        ],
      ],
    });

    doc.save(`invoice_${invoice.id}.pdf`);
  };

  return { downloadInvoice };
};

export default useInvoiceDownload;
