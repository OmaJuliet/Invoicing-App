// components/InvoiceHeader.tsx
import React from 'react';

interface InvoiceHeaderProps {
  onOpen: () => void;
}

const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ onOpen }) => (
  <div className="w-[65%] flex flex-row justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Invoices</h1>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onOpen}
    >
      Create Invoice
    </button>
  </div>
);

export default InvoiceHeader;
