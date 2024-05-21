// components/InvoiceTable.tsx
import React from 'react';
import { Invoice } from '../types';
// import useInvoiceDownload from '../hooks/useInvoiceDownload';

interface InvoiceLayoutProps {
    invoices: Invoice[];
    onEdit: (invoice: Invoice) => void;
    onDelete: (id: number) => void;
}



const InvoiceLayout: React.FC<InvoiceLayoutProps> = ({ invoices, onEdit, onDelete }) => (
    // const { downloadInvoice } = useInvoiceDownload();

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
                                // onClick={() => downloadInvoice(invoice)}
                                >
                                Download invoice
                            </button>

                            <button className="bg-green-500 px-2 py-2 rounded text-white hover:bg-green-600 ml-4"
                                onClick={() => onEdit(invoice)}>
                                Edit invoice
                            </button>
                        </div>

                        <div className="flex justify-end bg-red-400 px-2 py-2 rounded text-white hover:bg-red-500">
                            <button onClick={() => onDelete(invoice.id)}>Delete invoice</button>
                        </div>
                    </div>

                </>

            ))}
        </div>
    </div>
);

export default InvoiceLayout;
