// hooks/useInvoices.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Invoice } from '../types';


const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        alert("Are you sure you want to delete this invoice?")
        const { data } = await axios.get('http://localhost:1337/api/invoices');
        setInvoices(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:1337/api/invoices/${id}`);
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error(error);
    }
  };


  return {
    invoices,
    setInvoices,
    selectedInvoice,
    setSelectedInvoice,
    isModalOpen,
    setIsModalOpen,
    handleDelete,
  };
};

export default useInvoices;
