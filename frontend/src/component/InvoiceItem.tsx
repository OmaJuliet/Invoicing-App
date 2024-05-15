// function TodoItem({ todo, editTodoItem, deleteTodoItem }) {
//   return (
//     <>
//       <div className="todoItem">
//         <div className="todoItemText">{todo.todoText}</div>
//         <div className="todoItemControls">
//           <i className="todoItemControlEdit">
//             <button className="bg-default" onClick={() => editTodoItem(todo)}>
//               Edit
//             </button>
//           </i>
//           <i className="todoItemControlDelete">
//             <button className="bg-danger" onClick={() => deleteTodoItem(todo)}>
//               Del
//             </button>
//           </i>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TodoItem;





function InvoiceItem({ invoice, editInvoiceItem, deleteInvoiceItem }) {
  return (
    <>
      <div className="invoiceItem">
        <div className="invoiceItemText">{invoice.invoiceText}</div>
        <div className="invoiceItemControls">
          <i className="invoiceItemControlEdit">
            <button className="bg-default" onClick={() => editInvoiceItem(invoice)}>
              Edit
            </button>
          </i>
          <i className="invoiceItemControlDelete">
            <button className="bg-danger" onClick={() => deleteInvoiceItem(invoice)}>
              Del
            </button>
          </i>
        </div>
      </div>
    </>
  );
}

export default InvoiceItem;
