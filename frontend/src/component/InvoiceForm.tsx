// components/InvoiceForm.tsx
'use client';
import React from 'react';
import axios from 'axios';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import useInvoiceForm from '../hooks/useInvoiceForm';

interface InvoiceFormProps {
  onClose: () => void;
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  selectedInvoice: Invoice | null;
}

interface Invoice {
  id: number;
  name: string;
  attributes: any;
  senderEmail: string;
  recipientEmail: string;
  shippingAddress: string;
  date: string;
  dueDate: string;
  invoiceNote: string;
  description: string;
  qty: number;
  rate: number;
  total: number;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose, setInvoices, selectedInvoice }) => {
  const { formFields, handleInputChange } = useInvoiceForm(selectedInvoice);

  const handleSendInvoice = async () => {
    try {
      const { name, senderEmail, recipientEmail, date, dueDate, shippingAddress, invoiceNote, description, qty, rate, total } = formFields;

      if (selectedInvoice) {
        const data = await axios.put(`http://localhost:1337/api/invoices/${selectedInvoice.id}`, {
          data: { name, senderEmail, recipientEmail, shippingAddress, dueDate, date, invoiceNote, description, qty, rate, total },
        });
        setInvoices((prev) => prev.map((inv) => (inv.id === selectedInvoice.id ? { ...inv, ...formFields } : inv)));
        window.location.reload();
      } else {
        const { data } = await axios.post('http://localhost:1337/api/invoices', {
          data: { name, senderEmail, recipientEmail, shippingAddress, dueDate, date, invoiceNote, description, qty, rate, total },
        });
        setInvoices((prev) => [...prev, data.data]);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <section className="relative lg:px-10 px-6 py-8 lg:mt-8 lg:w-[60%] bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
        <form className="pt-4">
          <h2 className="text-lg font-medium mb-4">{selectedInvoice ? 'Edit Invoice' : 'Create Invoice'}</h2>
          <button className="absolute top-2 right-8 font-bold text-black cursor-pointer text-2xl" onClick={onClose}>
            &times;
          </button>
          <div className="mb-4 flex flex-row justify-between">
            <InputField
              label="Your name"
              id="name"
              name="name"
              type="text"
              placeholder="Sender's name"
              value={formFields.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Your email address"
              id="senderEmail"
              name="senderEmail"
              type="email"
              placeholder="Sender's email"
              value={formFields.senderEmail}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Recipient's Email"
              id="recipientEmail"
              name="recipientEmail"
              type="email"
              placeholder="Client's email address"
              value={formFields.recipientEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4 flex flex-row justify-between">
            <InputField
              label="Date"
              id="date"
              name="date"
              type="date"
              value={formFields.date}
              onChange={handleInputChange}
              required placeholder={''}
            />

            <InputField
              label="Due Date"
              id="dueDate"
              name="dueDate"
              type="date"
              value={formFields.dueDate}
              onChange={handleInputChange}
              required
              placeholder={''}
            />

          </div>

          <div className="mb-4 flex flex-row justify-between">
            <TextAreaField
              label="Shipping Address"
              id="shippingAddress"
              name="shippingAddress"
              placeholder="Office address of recipient"
              value={formFields.shippingAddress}
              onChange={handleInputChange}
              required
            />
            <TextAreaField
              label="Invoice Note"
              id="invoiceNote"
              name="invoiceNote"
              placeholder="Account details"
              value={formFields.invoiceNote}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex justify-center items-center">
            <InputField
              label="Invoice Item"
              id="description"
              name="description"
              type="text"
              placeholder="Description of Item"
              value={formFields.description}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Qty"
              id="qty"
              name="qty"
              type="number"
              placeholder="Quantity of item"
              value={formFields.qty}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Rate"
              id="rate"
              name="rate"
              type="number"
              placeholder="Price of item"
              value={formFields.rate}
              onChange={handleInputChange}
              required
            />

            <div className="block text-gray-700 text-sm font-bold mb-2 w-full mr-3">
              <label>Total</label>
              <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight">
                {formFields.total}
              </div>
            </div>
          </div>

          <hr className="mt-5 border-1" />

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleSendInvoice}
            >
              {selectedInvoice ? 'Update Invoice' : 'Send Invoice'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default InvoiceForm;
