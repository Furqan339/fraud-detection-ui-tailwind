
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/predict', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResults(res.data.predictions);
      toast.success('Predictions received');
    } catch (err) {
      toast.error('Failed to get predictions');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Dashboard</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-6">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Upload & Predict</button>
      </form>
      {results.length > 0 && (
        <ul className="bg-white rounded shadow p-4">
          {results.map((res, i) => (
            <li key={i} className="mb-2">Transaction {i + 1}: <strong>{res === 1 ? 'Fraud' : 'Legit'}</strong></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
