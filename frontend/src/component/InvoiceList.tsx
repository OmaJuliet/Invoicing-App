// import TodoItem from "../components/todoItem";


// function TodoList({ todos, editTodoItem, deleteTodoItem }) {
//   return (
//     <div className="todoListContainer">
//       <div className="todosText">Todos</div>
//       {todos
//         .sort((a, b) => b.created_at.localeCompare(a.created_at))
//         .map((todo, i) => (
//           <TodoItem
//             todo={todo}
//             key={i}
//             deleteTodoItem={deleteTodoItem}
//             editTodoItem={editTodoItem}
//           />
//         ))}
//     </div>
//   );
// }

// export default TodoList;




import InvoiceItem from "./InvoiceItem";

function InvoiceList({ invoices, editInvoiceItem, deleteInvoiceItem }) {
  return (
    <div className="invoiceListContainer">
      <div className="invoicesText">Invoices</div>
      {invoices
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map((invoice, i) => (
          <InvoiceItem
            invoice={invoice}
            key={i}
            deleteInvoiceItem={deleteInvoiceItem}
            editInvoiceItem={editInvoiceItem}
          />
        ))}
    </div>
  );
}

export default InvoiceList;