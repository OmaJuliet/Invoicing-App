import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InvoiceForm from './InvoiceForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


interface Invoice {
  [x: string]: any;
  id: number;
  name: string;
  senderEmail: string;
  recipientEmail: string;
  date: string; //number
  dueDate: string; //number
  shippingAddress: string;
  invoiceNote: string;
  description: string;
  qty: number;
  rate: number;
  total: number;
}

class PDFWithAutoTable extends jsPDF {
  autoTable(options: any) {
    // @ts-ignore
    super.autoTable(options);
  }
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
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

    fetchInvoices();
  }, []);

  const handleOpenInvoiceForm = () => {
    setSelectedInvoice(null);
    setIsInvoiceFormOpen(true);
  };

  const handleCloseInvoiceForm = () => {
    setSelectedInvoice(null);
    setIsInvoiceFormOpen(false);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsInvoiceFormOpen(true);
  };

  const handleDeleteInvoice = async (id: number) => {
    try {
      alert("Are you sure you want to delete this invoice?")
      await axios.delete(`http://localhost:1337/api/invoices/${id}`);
      setInvoices(invoices.filter((invoice) => invoice.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

//  console.log(selectedInvoice)
 
  const handleDownloadPDF = (invoice: Invoice) => {
    // const doc = new jsPDF();
    const doc = new PDFWithAutoTable();

    // Set the font size and style
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    // Tabular format of the invoice with corresponding information
    const tableData = [
      ["Invoice id", `${invoice.id}`],
      ["Sender's name", `${invoice.attributes.name}`],
      ["Sender's email", `${invoice.attributes.senderEmail}`],
      ["Recipient's email", `${invoice.attributes.recipientEmail}`],
      ["Invoice date", `${invoice.attributes.date}`],
      ["Due date", `${invoice.attributes.dueDate}`],
      ["Shipping address", `${invoice.attributes.shippingAddress}`],
      ["Invoice note", `${invoice.attributes.invoiceNote}`],
      ["Invoice description", `${invoice.attributes.description}`],
      ["Item quantity", `(${invoice.attributes.qty})`],
      ["Rate", `${invoice.attributes.rate}`],
      ["Total", `${invoice.attributes.total}`],
    ];

    doc.autoTable({
      startY: 40,
      head: [['Item', 'Details']],
      body: tableData,
      headStyles: { fontSize: 18, fontStyle: 'bold' },
      styles: { fontSize: 15, fontStyle: 'semibold' },
    });

    // To save the PDF with a specific filename
    doc.save(`Invoice_${invoice.id}.pdf`);
  };


  return (
    <div className="flex flex-col items-center justify-center">
      <section className="w-[65%] flex flex-row justify-between py-4">
        <h2 className="text-3xl text-gray-700 font-medium">INVOICE</h2>
        <button onClick={handleOpenInvoiceForm} className="bg-green-500 p-2 w-30 text-white rounded-lg">
          Create invoice
        </button>
      </section>

      {isInvoiceFormOpen && (
        <InvoiceForm
          onClose={handleCloseInvoiceForm}
          setInvoices={setInvoices} 
          selectedInvoice={selectedInvoice}
        />
      )}


      {invoices.length === 0 ? (
        <p>No invoice yet.</p>
      ) : (

        <div className="w-[70%]">
          <div className="px-5 py-5 mx-auto">
            {invoices.map((invoice) => (
              <>
                <div className="flex flex-wrap border-t-2 border-b-2 border-gray-200 border-opacity-60" key={invoice.id}>
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


                <div className="w-full px-5 py-12 mx-auto">
                  <div className="flex flex-row justify-between border-b-2 border-gray-300">
                    <div>
                      <h2 className="text-lg font-medium text-gray-700 mb-2">Invoice Item</h2>
                    </div>

                    <div className="flex flex-row mb-2">
                      <p className="ml-2 text-lg font-medium text-gray-800">Qty</p>
                      <p className="ml-[6rem] text-lg font-medium text-gray-800">Rate</p>
                      <p className="ml-[6rem] text-lg font-medium text-gray-800">Total</p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between mt-4">
                    <div>
                      <h2 className="text-base text-gray-700 mb-4">{invoice.attributes.description}</h2>
                    </div>

                    <div className="flex flex-row mb-4">
                      <p className="ml-2 text-base text-gray-800">{invoice.attributes.qty}</p>
                      <p className="ml-[6rem] text-base text-gray-800">${invoice.attributes.rate}</p>
                      <p className="ml-[6rem] text-base text-gray-800">${invoice.attributes.total}</p>
                    </div>
                  </div>


                  <div className="grid justify-end pt-[2.5rem]">
                    <div className="flex flex-row justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Tax (0%)</h2>
                      </div>

                      <div className="flex flex-row">
                        <p className="ml-[10rem] text-base text-gray-800">0.00</p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between border-y-2 border-green-400">
                      <div className="pt-4">
                        <h2 className="text-lg font-medium text-gray-700 mb-4">Amount due:</h2>
                      </div>

                      <div className="flex flex-row pt-4">
                        <p className="ml-[10rem] text-lg font-medium text-gray-800">${invoice.attributes.total}.00</p>
                      </div>
                    </div>
                  </div>

                </div>


                <div className="flex flex-row justify-between w-full mt-1">
                  <div>
                    <button className="bg-blue-500 px-2 py-2 rounded text-white hover:bg-blue-600"
                      onClick={() => handleDownloadPDF(invoice)}>
                      Download invoice
                    </button>

                    <button className="bg-green-500 px-2 py-2 rounded text-white hover:bg-green-600 ml-4"
                      onClick={() => handleEditInvoice(invoice)}>
                      Edit invoice
                    </button>
                  </div>

                  <div className="flex justify-end bg-red-400 px-2 py-2 rounded text-white hover:bg-red-500">
                    <button onClick={() => handleDeleteInvoice(invoice.id)}>Delete invoice</button>
                  </div>
                </div>

              </>

            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
