// function AddTodo({ addTodo }) {
//   return (
//     <>
//       <div className="addTodoContainer">
//         <input
//           className="todoInputText"
//           type="text"
//           placeholder="Add new todo here..."
//           id="todoText"
//           onKeyDown={(e) => {
//             if (e.code === "Enter") {
//               addTodo(todoText.value);
//               todoText.value = "";
//             }
//           }}
//         />
//         <input
//           className="todoInputButton"
//           type="button"
//           value="Add Todo"
//           onClick={() => {
//             addTodo(todoText.value);
//             todoText.value = "";
//           }}
//         />
//       </div>
//     </>
//   );
// }


// export default AddTodo;





import { useState } from "react";


function AddInvoice({ addInvoice }) {
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [invoiceNote, setInvoiceNote] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    const invoiceData = {
      senderEmail,
      recipientEmail,
      invoiceNote,
      shippingAddress,
      date,
      dueDate
    };
    addInvoice(invoiceData);
    // Clear input fields after submitting
    setSenderEmail("");
    setRecipientEmail("");
    setInvoiceNote("");
    setShippingAddress("");
    setDate("");
    setDueDate("");
  };

  return (
    <>
      <div className="addInvoiceContainer">
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Sender Email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
        />
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
        />
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Invoice Note"
          value={invoiceNote}
          onChange={(e) => setInvoiceNote(e.target.value)}
        />
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className="invoiceInputText"
          type="text"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          className="invoiceInputButton"
          type="button"
          value="Add Invoice"
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}

export default AddInvoice;