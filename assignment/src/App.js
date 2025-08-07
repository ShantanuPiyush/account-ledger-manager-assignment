import './App.css';
import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const ACCOUNT_TYPES = ['asset', 'liability', 'equity', 'income', 'expense'];

function App() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ name: '', openingBalance: '', type: 'asset' });
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');
  const [editId, setEditId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleTypeChange = (e) => {
    setForm({ ...form, type: e.target.value });
  };

  const addAccount = () => {
    if(form.name === '' || form.openingBalance === ''){
      alert("Please fill Entry")
      return
    }
    const newAccount = {
      id: uuidv4(),
      name: form.name,
      parentId: null,
      type: form.type,
      openingBalance: parseFloat(form.openingBalance || 0),
      currentBalance: parseFloat(form.openingBalance || 0),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAccounts([...accounts, newAccount]);
    setForm({ name: '', openingBalance: '', type: 'asset' });
  };

  const updateAccount = () => {
    const updatedAccounts = accounts.map(acc =>
      acc.id === editId
        ? {
            ...acc,
            name: form.name,
            type: form.type,
            openingBalance: parseFloat(form.openingBalance),
            currentBalance: parseFloat(form.openingBalance),
            updatedAt: new Date(),
          }
        : acc
    );
    setAccounts(updatedAccounts);
    resetForm();
  };

  const editAccount = (acc) => {
    setForm({
      name: acc.name,
      openingBalance: acc.openingBalance,
      type: acc.type,
    });
    setEditId(acc.id);
  };

  const deleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const resetForm = () => {
    setForm({ name: '', openingBalance: '', type: 'asset' });
    setEditId(null);
  };

  const filteredAccounts = accounts.filter((acc) => {
    return (
      (!filterType || acc.type === filterType) &&
      acc.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h3>2. Assignment Account Ledger Manager</h3>
      <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>{editId ? 'Edit Account' : 'Add Account'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Account Name"
          value={form.name}
          onChange={handleInputChange}
          style={{ display: 'block', margin: '8px 0', width: '97.5%', padding: '8px' }}
        />
        <input
          type="number"
          name="openingBalance"
          placeholder="Opening Balance"
          value={form.openingBalance}
          onChange={handleInputChange}
          style={{ display: 'block', margin: '8px 0', width: '97.5%', padding: '8px' }}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleTypeChange}
          style={{ display: 'block', margin: '8px 0', width: '100%', padding: '8px' }}
        >
          {ACCOUNT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        {editId ? (
          <>
            <button onClick={updateAccount} style={{ padding: '8px 16px', marginRight: '10px' }}>Update</button>
            <button onClick={resetForm} style={{ padding: '8px 16px', backgroundColor: '#ccc' }}>Cancel</button>
          </>
        ) : (
          <button onClick={addAccount} style={{ padding: '8px 16px' }}>Add</button>
        )}
      </div>

      <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="">All</option>
            {ACCOUNT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Type</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Opening Balance</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Current Balance</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((acc) => (
              <tr key={acc.id}>
                <td style={{ padding: '8px' }}>{acc.name}</td>
                <td style={{ padding: '8px' }}>{acc.type}</td>
                <td style={{ padding: '8px' }}>{acc.openingBalance.toFixed(2)}</td>
                <td style={{ padding: '8px' }}>{acc.currentBalance.toFixed(2)}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => editAccount(acc)}
                    style={{ padding: '4px 8px', marginRight: '6px', backgroundColor: '#0a7', color: 'white', border: 'none' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteAccount(acc.id)}
                    style={{ padding: '4px 8px', backgroundColor: 'red', color: 'white', border: 'none' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>No accounts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
