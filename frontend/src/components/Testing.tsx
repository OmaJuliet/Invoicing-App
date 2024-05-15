import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import React from 'react';
import InvoiceForm from './InvoiceForm';

export default function Home() {
  const initialState = {
    name: '',
    senderEmail: '',
    shippingAddress: '',
    recipientEmail: '',
    date: '',
    dueDate: '',
    invoiceNote: '',
  };
  
  // const [formData, setFormData] = useState({
  //   name: "",
  //   senderEmail: "",
  //   dueDate: "",
  //   date: "",
  //   recipientEmail: "",
  //   total: "",
  //   invoiceNote: "",
  // });

  const [invoices, setInvoices] = useState([]);
  
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

  // const [formFields, dispatch] = useReducer(reducer, initialState);
  // const [total, setTotal] = useState(0);
  // const [invoiceFields, setInvoiceFields] = useState([
  //   {
  //     itemDescription: '',
  //     qty: '',
  //     price: '',
  //   },
  // ]);

  //////////////////////////////
  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
  };
  //////////////////////

  // const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
  //   dispatch({ field: e.target.name, value: e.target.value });
  // };

  // const addInvoiceItem = () => {
  //   // const values = [...invoiceFields];
  //   // values.push({
  //   //   itemDescription: '',
  //   //   qty: '',
  //   //   price: '',
  //   // });
  //   // setInvoiceFields(values);

  //   // setInvoiceFields((prevState) => [
  //   //   ...prevState,
  //   //   {
  //   //     itemDescription: '',
  //   //     qty: '',
  //   //     price: '',
  //   //   },
  //   // ]);

  //   setInvoiceFields([
  //     ...invoiceFields,
  //     {
  //       itemDescription: '',
  //       qty: '',
  //       price: '',
  //     },
  //   ]);
  // };

  // const handleRemoveInvoice = (index: number) => {
  //   const values = [...invoiceFields];
  //   if (values.length === 1) return false;
  //   values.splice(index, 1);
  //   setInvoiceFields(values);
  // };

  // const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
  //   const values = [...invoiceFields];
  //   if (event.target.name === 'itemDescription') {
  //     values[index].itemDescription = event.target.value;
  //   } else if (event.target.name === 'qty') {
  //     values[index].qty = event.target.value;
  //   } else if (event.target.name === 'price') {
  //     values[index].price = event.target.value;
  //   }
  //   setInvoiceFields(values);
  // };

  // const getTotal = () => {
  //   let computedTotal = 0;
  //   invoiceFields.forEach((field) => {
  //     const quantityNumber = parseFloat(field.qty);
  //     const rateNumber = parseFloat(field.price);
  //     const amount =
  //       quantityNumber && rateNumber ? quantityNumber * rateNumber : 0;
  //     computedTotal += amount;
  //   });
  //   return setTotal(computedTotal);
  // };

  // useEffect(() => {
  //   getTotal();
  // }, [total, invoiceFields]);

  // const handleSendInvoice = async () => {
  //   try {
  //     let { name, shippingAddress, dueDate, date, invoiceNote, senderEmail, recipientEmail } = formFields;
  //     const { data } = await axios.post('http://localhost:1337/invoices', {
  //       name,
  //       shippingAddress,
  //       dueDate,
  //       date,
  //       invoiceNote,
  //       senderEmail,
  //       recipientEmail,
  //       invoiceItemDetails: invoiceFields,
  //       total,
  //     });
  //     console.log(data);

  //     // Add the new invoice to the list of invoices displayed on the frontend
  //     setInvoices([...invoices, data]);

  //     window.print();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };


  // const handlePrintInvoice = () => {
  //   window.print();
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="w-[65%] flex flex-row justify-between py-4">
          <h2 className="text-3xl text-gray-700 font-medium">INVOICE</h2>
          <button onClick={openModal} className="bg-green-500 p-2 w-30 text-white rounded-lg">
            Create invoice
          </button>
        </section>

        {invoices.length === 0 ? (
          <p>No invoice yet.</p>
        ) : (

          <div className="w-[70%]">
            <div className="px-5 py-8 mx-auto">
              {invoices.map((invoice) => (
                <>
                  <div className="flex flex-wrap border-t-2 border-b-2 border-gray-200 border-opacity-60">
                    <div className="lg:w-1/3 md:w-full px-8 py-6 border-opacity-60">
                      <div>
                        <h2 className="text-base text-gray-900 font-medium mb-1">Issued:</h2>
                        <p className="leading-relaxed text-sm mb-4">{invoice.attributes.date}</p>
                      </div>
                      <div className="mt-12">
                        <h2 className="text-base text-gray-900 font-medium">Due:</h2>
                        <p className="leading-relaxed text-sm mb-4">{invoice.attributes.dueDate}</p>
                      </div>
                    </div>

                    <div className="lg:w-1/3 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                      <h2 className="text-base text-gray-900 font-medium mb-2">Billed To:</h2>
                      <div className="">
                        <h2 className=" text-gray-900 text-sm mb-1 font-medium">Recipient's Email</h2>
                        <p className="leading-relaxed text-sm mb-5">{invoice.attributes.recipientEmail}</p>
                      </div>

                      <div>
                        <h2 className=" text-gray-900 text-sm mb-1 font-medium">Shipping Address</h2>
                        <p className="leading-relaxed text-sm mb-4">{invoice.attributes.shippingAddress}</p>
                      </div>
                    </div>

                    <div className="lg:w-1/3 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                      <h2 className="text-base text-gray-900 font-medium mb-2">From:</h2>
                      <div className="">
                        <h2 className=" text-gray-900 text-sm mb-1 font-medium">Sender's Name</h2>
                        <p className="leading-relaxed text-sm mb-5">{invoice.attributes.name}</p>
                      </div>

                      <div>
                        <h2 className=" text-gray-900 text-sm mb-1 font-medium">Sender's Email</h2>
                        <p className="leading-relaxed text-sm mb-4">{invoice.attributes.senderEmail}</p>
                      </div>
                    </div>
                  </div>


                  {/* invoice item */}
                  <div className="w-full px-5 py-12 mx-auto">
                    <div className="flex flex-row justify-between border-b-2 border-gray-300">
                      <div>
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Invoice Item</h2>
                      </div>

                      <div className="flex flex-row mb-4">
                        <p className="ml-2 text-lg font-medium text-gray-800">Qty</p>
                        <p className="ml-[6rem] text-lg font-medium text-gray-800">Rate</p>
                        <p className="ml-[6rem] text-lg font-medium text-gray-800">Total</p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between mt-4">
                      <div>
                        <h2 className="text-base text-gray-700 mb-4">Paystack Article</h2>
                      </div>

                      <div className="flex flex-row mb-4">
                        <p className="ml-2 text-base text-gray-800">2</p>
                        <p className="ml-[6rem] text-base text-gray-800">$350</p>
                        <p className="ml-[6rem] text-base text-gray-800">$700</p>
                      </div>
                    </div>


                    <div className="grid justify-end pt-[4rem]">
                      <div className="flex flex-row justify-between border-b-2 border-gray-300">
                        <div>
                          <h2 className="text-lg font-medium text-gray-700 mb-4">Subtotal</h2>
                        </div>

                        <div className="flex flex-row mb-4">
                          <p className="ml-[10rem] text-base text-gray-800">$700</p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between">
                        <div className="pt-4">
                          <h2 className="text-lg font-medium text-gray-700 mb-4">Tax (0%)</h2>
                        </div>

                        <div className="flex flex-row pt-4">
                          <p className="ml-[10rem] text-base text-gray-800">0.00</p>
                        </div>
                      </div>

                      <div className="flex flex-row justify-between border-y-2 border-green-400">
                        <div className="pt-4">
                          <h2 className="text-lg font-medium text-gray-700 mb-4">Amount due:</h2>
                        </div>

                        <div className="flex flex-row pt-4">
                          <p className="ml-[10rem] text-lg font-medium text-gray-800">$700.00</p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-center w-full mt-2">
                    <button className="w-full bg-green-500 px-2 py-3 rounded text-white hover:bg-green-600">Download invoice</button>
                  </div>

                </>

              ))}
            </div>
          </div>
        )}

        {isModalOpen && (
          <InvoiceForm
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}