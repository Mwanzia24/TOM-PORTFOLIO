import React, { useState, useEffect } from "react";
import TransactionTable from "./Table";
import TransactionForm from "./form";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/transactions/${id}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          const updatedTransactions = transactions.filter(
            (transaction) => transaction.id !== id
          );
          setTransactions(updatedTransactions);
          setFilteredTransactions(updatedTransactions);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortDirection("asc");
    }
    let sortedTransactions = [...filteredTransactions];
    sortedTransactions.sort((a, b) => {
      if (a[columnName] < b[columnName]) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (a[columnName] > b[columnName]) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    setFilteredTransactions(sortedTransactions);
  };
  const handleSubmit = (transaction) => {
    setTransactions([...transactions, transaction]);
    setFilteredTransactions([...transactions, transaction]);
  };
  function handleAddTransaction(newTransaction) {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
  }
  return (
    <div className="transactions-page ">
      <header className="transactions-header"><h1 className="transactions-title">BANK OF FLATIRON </h1></header>
      <TransactionForm onSubmit={handleSubmit} onAdd={handleAddTransaction} transactions={transactions}/>
      <input type="text" placeholder="Search by description..." value={searchTerm} onChange={handleSearch} />
      <TransactionTable
        transactions={filteredTransactions}
        onDelete={handleDelete}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  );
};
export default TransactionsPage;







