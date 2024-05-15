// import Head from "next/head";
// import { useEffect, useState } from "react";
// import AddInvoice from "./AddInvoice";
// import InvoiceList from "./InvoiceList";
// import axios from "axios";

// export default function Home() {
//   const [todos, setTodos] = useState([]);

//   useEffect(async () => {
//     const result = await axios.get("http://localhost:1337/todos");
//     setTodos(result?.data);
//   }, []);

//   const addTodo = async (todoText) => {
//     if (todoText && todoText.length > 0) {
//       const result = await axios.post("http://localhost:1337/todos", {
//         todoText: todoText,
//       });
//       setTodos([...todos, result?.data]);
//     }
//   };

//   const deleteTodoItem = async (todo) => {
//     if (confirm("Do you really want to delete this item?")) {
//       await axios.delete("http://localhost:1337/todos/" + todo.id);
//       const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
//       console.log(newTodos);
//       setTodos(newTodos);
//     }
//   };

//   const editTodoItem = async (todo) => {
//     const newTodoText = prompt("Enter new todo text or description:");
//     if (newTodoText != null) {
//       const result = await axios.put("http://localhost:1337/todos/" + todo.id, {
//         todoText: newTodoText,
//       });
//       const moddedTodos = todos.map((_todo) => {
//         if (_todo.id === todo.id) {
//           return result?.data;
//         } else {
//           return _todo;
//         }
//       });
//       setTodos(moddedTodos);
//     }
//   };

//   return (
//     <div>
//       <main className="main">
//         <AddInvoice addTodo={addTodo} />
//         <InvoiceList
//           todos={todos}
//           deleteTodoItem={deleteTodoItem}
//           editTodoItem={editTodoItem}
//         />
//       </main>
//     </div>
//   );
// }





import Head from "next/head";
import { useEffect, useState } from "react";
import AddInvoice from "./AddInvoice";
import InvoiceList from "./InvoiceList";
import axios from "axios";

export default function Home() {
  const [invoices, setInvoices] = useState([]);

  useEffect(async () => {
    const result = await axios.get("http://localhost:1337/invoices");
    setInvoices(result?.data);
  }, []);

  const addInvoice = async (invoiceData) => {
    if (invoiceData) {
      const result = await axios.post("http://localhost:1337/invoices", invoiceData);
      setInvoices([...invoices, result?.data]);
    }
  };

  const deleteInvoiceItem = async (invoice) => {
    if (confirm("Do you really want to delete this item?")) {
      await axios.delete("http://localhost:1337/invoices/" + invoice.id);
      const newInvoices = invoices.filter((_invoice) => _invoice.id !== invoice.id);
      setInvoices(newInvoices);
    }
  };

  const editInvoiceItem = async (invoice) => {
    // Assuming you have a form or modal for editing invoices
    // You can implement this part based on your UI
  };

  return (
    <div>
      <main className="main">
        <AddInvoice addInvoice={addInvoice} />
        <InvoiceList
          invoices={invoices}
          deleteInvoiceItem={deleteInvoiceItem}
          editInvoiceItem={editInvoiceItem}
        />
      </main>
    </div>
  );
}