import React from "react";
import TransactionRow from "./row";

function TransactionTable({ transactions, onDelete }) {
  return (
    <table className=" transactions-table">
      <thead>
        <tr>
          <th>ID</th>
          <th >DATE</th>
          <th >DESCRIPTION</th>
          <th >CATEGORY</th>
          <th >AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
export default TransactionTable;