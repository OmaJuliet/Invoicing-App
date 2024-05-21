// hooks/useInvoiceForm.ts
import { useReducer, useEffect } from 'react';
import { Invoice } from '../components/InvoiceForm';

const initialState = {
  name: '',
  senderEmail: '',
  recipientEmail: '',
  shippingAddress: '',
  date: '',
  dueDate: '',
  invoiceNote: '',
  description: '',
  qty: 0,
  rate: 0,
  total: 0,
};

function reducer(state = initialState, { field, value }: { field: string, value: any }) {
  return { ...state, [field]: value };
}

const useInvoiceForm = (selectedInvoice: Invoice | null) => {
  const [formFields, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (selectedInvoice) {
      for (const [key, value] of Object.entries(selectedInvoice?.attributes)) {
        dispatch({ field: key, value });
      }
    } else {
      for (const [key, value] of Object.entries(initialState)) {
        dispatch({ field: key, value });
      }
    }
  }, [selectedInvoice]);

  useEffect(() => {
    const { qty, rate } = formFields;
    const total = qty * rate;
    dispatch({ field: 'total', value: total });
  }, [formFields.qty, formFields.rate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  return { formFields, handleInputChange };
};

export default useInvoiceForm;
