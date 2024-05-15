'use client'
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';


interface InvoiceFormProps {
  onClose: () => void;
}


const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose }) => {
  const initialState = {
    name: '',
    senderEmail: '',
    shippingAddress: '',
    recipientEmail: '',
    date: '',
    dueDate: '',
    invoiceNote: '',
  };

  const [invoices, setInvoices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    date: '',
    dueDate: '',
    recipientEmail: '',
    shippingAddress: '',
    InvoiceNote: '',
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    fetch("http://localhost:1337/api/invoices?populate=invoice")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched invoices:", data);
        if (Array.isArray(data.data)) {
          setInvoices(data.data);
        } else {
          console.error("Fetched data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
      });
  };

  function reducer(state = initialState, { field, value }) {
    return { ...state, [field]: value };
  }

  const [formFields, dispatch] = useReducer(reducer, initialState);
  const [total, setTotal] = useState(0);
  const [invoiceFields, setInvoiceFields] = useState([
    {
      itemDescription: '',
      qty: '',
      price: '',
    },
  ]);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const addInvoiceItem = () => {
    // const values = [...invoiceFields];
    // values.push({
    //   itemDescription: '',
    //   qty: '',
    //   price: '',
    // });
    // setInvoiceFields(values);

    // setInvoiceFields((prevState) => [
    //   ...prevState,
    //   {
    //     itemDescription: '',
    //     qty: '',
    //     price: '',
    //   },
    // ]);

    setInvoiceFields([
      ...invoiceFields,
      {
        itemDescription: '',
        qty: '',
        price: '',
      },
    ]);
  };

  const handleRemoveInvoice = (index: number) => {
    const values = [...invoiceFields];
    if (values.length === 1) return false;
    values.splice(index, 1);
    setInvoiceFields(values);
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const values = [...invoiceFields];
    if (event.target.name === 'itemDescription') {
      values[index].itemDescription = event.target.value;
    } else if (event.target.name === 'qty') {
      values[index].qty = event.target.value;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
    }
    setInvoiceFields(values);
  };

  const getTotal = () => {
    let computedTotal = 0;
    invoiceFields.forEach((field) => {
      const quantityNumber = parseFloat(field.qty);
      const rateNumber = parseFloat(field.price);
      const amount =
        quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
      computedTotal += amount;
    });
    return setTotal(computedTotal);
  };

  useEffect(() => {
    getTotal();
  }, [total, invoiceFields]);

  const handleSendInvoice = async () => {
    try {
      let { name, senderEmail, recipientEmail, shippingAddress, dueDate, date, invoiceNote } = formFields;
      const { data } = await axios.post('http://localhost:1337/invoices', {
        name,
        shippingAddress,
        dueDate,
        date,
        invoiceNote,
        senderEmail,
        recipientEmail,
        invoiceItemDetails: invoiceFields,
        total,
      });
      console.log(data);

      // Add the new invoice to the list of invoices displayed on the frontend
      setInvoices([...invoices, data]);

      window.print();
    } catch (error) {
      console.error(error);
    }
  };


  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <>
      {/* <Modal isOpen={true} onRequestClose={onClose}> */}
      <main className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
        <section className="relative lg:px-10 px-6 py-8 lg:mt-8 lg:w-[60%] bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4">
          <form className="pt-4">
            <h2 className="text-lg font-medium mb-4">Create invoice</h2>
            <button className="absolute top-2 right-8 font-bold text-black cursor-pointer text-2xl" onClick={onClose}>
              &times;
            </button>

            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-col w-[30%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Your name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Sender's name"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-[30%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="senderEmail"
                >
                  Your email address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  required
                  placeholder="Sender's email"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-[30%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="recipientEmail"
                >
                  Recipient's Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                  required
                  placeholder="Client's email address"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-col w-[45%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  name="date"
                  type="date"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-[45%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="dueDate"
                >
                  Due Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mb-4 flex flex-row justify-between">
              <div className="flex flex-col w-[45%]">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="shippingAddress"
                >
                  Shipping Address
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="shippingAddress"
                  name="shippingAddress"
                  required
                  placeholder="Office address of recipient"
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col w-[45%]">
                <label
                  htmlFor="invoiceNote"
                  className="block text-gray-700 text-sm font-bold mb-2 w-full"
                >
                  Invoice Notes
                </label>
                <textarea
                  id="invoiceNote"
                  name="invoiceNote"
                  required
                  placeholder="Account details"
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>

            {invoiceFields.map((invoiceField, i) => (
              <div
                className="flex justify-center items-center"
                key={`${invoiceField}~${i}`}
              >
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full mr-5"
                  htmlFor={`${invoiceField.itemDescription}~${i}`}
                >
                  Invoice Item
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.itemDescription}~${i}`}
                    name="itemDescription"
                    type="text"
                    spellCheck="false"
                    value={invoiceField.itemDescription}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full mr-5"
                  htmlFor={`${invoiceField.qty}~${i}`}
                >
                  Quantity
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.qty}~${i}`}
                    name="qty"
                    type="number"
                    spellCheck="false"
                    value={invoiceField.qty}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 w-full  mr-5"
                  htmlFor={`${invoiceField.price}~${i}`}
                >
                  Unit Price
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id={`${invoiceField.price}~${i}`}
                    name="price"
                    type="tel"
                    spellCheck="false"
                    value={invoiceField.price}
                    onChange={(event) => handleChange(i, event)}
                  />
                </label>
                <button
                  className="bg-red-500 hover:bg-red-700 h-8 px-5 py-3 flex items-center justify-center text-white font-bold rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => handleRemoveInvoice(i)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addInvoiceItem}
            >
              Add Item
            </button>

            <div className="my-6 flex justify-between font-semibold text-xl">
              <p>Total:</p>
              <p>{total}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSendInvoice}
              >
                Submit Invoice
              </button>
            </div>
          </form>
        </section>
      </main>
      {/* </Modal> */}
    </>
  );
}

export default InvoiceForm