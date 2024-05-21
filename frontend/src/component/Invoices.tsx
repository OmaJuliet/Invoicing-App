// components/Invoice.tsx
'use client';
import React from 'react';
import InvoiceHeader from './InvoiceHeader';
import InvoiceLayout from './InvoiceLayout';
import InvoiceForm from './InvoiceForm';
import useInvoices from '../hooks/useInvoices';

const Invoices: React.FC = () => {
  const {
    invoices,
    setInvoices,
    selectedInvoice,
    setSelectedInvoice,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
  } = useInvoices();

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <InvoiceHeader onOpen={() => setIsModalOpen(true)} />

        {isModalOpen && (
          <InvoiceForm
            onClose={() => setIsModalOpen(false)}
            setInvoices={setInvoices}
            selectedInvoice={selectedInvoice}
          />
        )}


        {invoices.length === 0 ? (
          <p>No invoice yet.</p>
        ) : (
          <InvoiceLayout invoices={invoices} onEdit={handleEdit} onDelete={handleDelete} />

        )}
      </div>
    </>
  );
};

export default Invoices;
