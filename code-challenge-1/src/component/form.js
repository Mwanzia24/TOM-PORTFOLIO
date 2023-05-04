import React, { useState } from "react";

function TransactionForm({ onSubmit },{transactions}) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [ID, setID] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTransaction = {
      id: ID,
      date,
      category,
      description,
      amount: Number(amount),
    };
    onSubmit(newTransaction);
    setCategory("");
    setDescription("");
    setAmount("");
  };
  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <h2>Add a transaction</h2>
      <label htmlFor="ID">ID:</label>
      <input
        type="id"
        id="ID"
        value={ID}
        onChange={(event) => setID(event.target.value)}
      />
      <br />
      <label htmlFor="date">Date:</label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <br />
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <br />
      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <br />
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
      />
      <br />
      <button type="submit">Add A Transaction</button>
    </form>
  );
}
export default TransactionForm;