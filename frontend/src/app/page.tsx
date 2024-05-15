'use client'
// import Form from "@/components/Form";
import Invoices from "../components/Invoices";


function App() {
    return (
        <div className="p-5">
            <Invoices />
            {/* <Form /> */}
        </div>
    );
}
export default App;





// // src/app/page.tsx
// 'use client';
// import { useEffect, useState } from 'react';
// import AddInvoice from '@/component/AddInvoivce';
// import InvoiceList from '@/component/InvoiceList';

// export default function Home() {
//   const [invoices, setInvoices] = useState<[]>([]);
//   const [createInvoice] = useMutation(ADDMUT);
//   const [updateInvoice] = useMutation(UPDATEMUT);
//   const [deleteMUT] = useMutation(DELETEMUT);
//   const { loading, error, data } = useQuery(GETQUERY, {
//     fetchPolicy: 'no-cache',
//   }); //Fetching all todos
//   useEffect(() => {
//     setInvoices(data?.invoices?.data); //Storing all the todos
//   }, [data]);

//   const addInvoice = async (invoiceText: string) => {
//     await createInvoice({
//       //Creating a new todo
//       variables: {
//         invoiceText: invoiceText, //Passing the todo text
//       },
//     }).then(({ data }: any) => {
//       setInvoices([...invoices, data?.createInvoice?.data] as any); //Adding the new todo to the list
//     });
//   };
//   const editInvoiceItem = async (invoice: any) => {
//     const newInvoiceText = prompt('Enter new todo text or description:');
//     if (newInvoiceText != null) {
//       await updateInvoice({
//         //updating the todo
//         variables: {
//           id: invoice.id,
//           invoiceText: newInvoiceText,
//         },
//       }).then(({ data }: any) => {
//         const moddedInvoices: any = invoices.map((_invoice: any) => {
//           if (_invoice.id === invoice.id) {
//             return data?.updateInvoice?.data;
//           } else {
//             return _invoice;
//           }
//         });
//         setInvoices(moddedInvoices);
//       });
//     }
//   };
//   const deleteInvoiceItem = async (invoice: any) => {
//     if (confirm('Do you really want to delete this item?')) {
//       await deleteMUT({
//         //Deleting the todo
//         variables: {
//           id: invoice.id,
//         },
//       }).then(({ data }: any) => {
//         const newInvoices = invoices.filter((_invoice: any) => _invoice.id !== invoice.id);
//         setInvoices(newInvoices as any);
//       });
//     }
//   };

//   return (
//     <div>
//       <main className="main">
//         <AddInvoice addInvoice={addInvoice} />
//         <InvoiceList
//           invoices={invoices}
//           deleteInvoiceItem={deleteInvoiceItem}
//           editInvoiceItem={editInvoiceItem}
//         />
//       </main>
//     </div>
//   );
// }





// pages/index.js
// 'use client'
// import { useState, useEffect } from 'react';
// import InvoiceItem from '@/component/InvoiceItem';

// function App() {
//   const [invoices, setInvoices] = useState([]);
//   const [newInvoice, setNewInvoice] = useState("");

//   useEffect(() => {
//     update();
//   }, []);

//   function update() {
//     fetch('http://localhost:1337/api/invoices')
//       .then(res => res.json())
//       .then(invoice => {
//         setInvoices(invoice.data);
//       })
//   }

//   function addInvoice(e: { preventDefault: () => void; }) {
//     e.preventDefault();
//     let item = newInvoice;
//     let body = {
//       data: {
//         item
//       }
//     };
 
//     fetch('http://localhost:1337/api/invoices', {
//       method: "POST",
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//       .then(() => {
//         setNewInvoice("");
//         update();
//       })
//   }

//   return (
//     <div className="app">
//       <main>
//         <form className="form" onSubmit={addInvoice}>
//           <input type="text" className="todo_input" placeholder="Enter new todo" value={newInvoice} onChange={e => setNewInvoice(e.currentTarget.value) }/>
//           <button type="submit" className="todo_button">Add todo</button>
//         </form>

//         <div>
//           {
//             invoices.map((todo, i) => {
//               return <InvoiceItem invoice={invoices} key={i} update={update} />
//             })
//           }
//         </div>

//       </main>
//     </div>
//   )
// }
// export default App;







// 'use client'
// import { useState, useEffect } from 'react';
// import InvoiceItem from '@/component/InvoiceItem';

// function App() {
//   const [invoices, setInvoices] = useState([]);
//   const [newInvoice, setNewInvoice] = useState("");

//   useEffect(() => {
//     update();
//   }, []);
  
//   function update() {
//     fetch('http://localhost:1337/api/invoices')
//       .then(res => res.json())
//       .then(data => {
//         setInvoices(data);
//       })
//       .catch(error => {
//         console.error("Error fetching invoices:", error);
//       });
//   }  

//   function addInvoice(e: { preventDefault: () => void; }) {
//     e.preventDefault();
//     fetch('http://localhost:1337/api/invoices', {
//       method: "POST",
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify({ item: newInvoice })
//     })
//       .then(() => {
//         setNewInvoice("");
//         update();
//       })
//   }

//   return (
//     <div className="app">
//       <main>
//         <form className="form" onSubmit={addInvoice}>
//           <input type="text" className="todo_input" placeholder="Enter new todo" value={newInvoice} onChange={e => setNewInvoice(e.target.value)}/>
//           <button type="submit" className="todo_button">Add todo</button>
//         </form>

//         <div>
//           {invoices.map((invoice, i) => (
//             <InvoiceItem invoice={invoice} key={i} update={update} />
//           ))}
//         </div>

//       </main>
//     </div>
//   )
// }
// export default App;
