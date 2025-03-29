'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CsvToJson() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, processing, success, error

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
    setStatus('idle');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setStatus('processing');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('CSV successfully converted to JSON and saved.');
        setStatus('success');
      } else {
        setMessage(result.error || 'An error occurred.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('An error occurred while uploading the file.');
      setStatus('error');
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-orange-500';
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-4">
      <h1 className="text-4xl font-bold mt-8 mb-12 text-center">CSV to JSON Converter</h1>
      <div className="flex flex-col items-center">
        <label
          htmlFor="fileInput"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && (
          <div className="mt-4 px-4 py-2 bg-gray-800 text-white rounded text-center">
            {file.name}
          </div>
        )}
      </div>
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-6 hover:bg-blue-600"
      >
        Convert and Save
      </button>
      <div
        className={`w-6 h-6 rounded-full mt-4 ${getStatusColor()}`}
        title={status === 'processing' ? 'Processing...' : ''}
      ></div>
      {message && <p className="mt-4 text-white">{message}</p>}
      <div className="w-full flex justify-center mt-auto mb-4">
        <button className="bg-gray-300 w-72 h-20 text-center flex flex-row items-center justify-center text-2xl font-extralight rounded-2xl hover:bg-gray-400">
          <Link className="flex flex-row justify-evenly gap-2 text-black" href="/">
            Return to Home
          </Link>
        </button>
      </div>
    </main>
  );
}
