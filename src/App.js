import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [entries, setEntries] = useState([
    { firstName: 'John', lastName: 'Doe', phone: '123-456-7890', city: 'Montreal', country: 'Canada' }
  ]);

  // Handle adding a new entry
  const handleAddEntry = (entry) => {
    setEntries([...entries, entry]);
  };

  return (
    <div>
      <Form onAddEntry={handleAddEntry} />
      <h2>Entries</h2>
      <Grid entries={entries} />
    </div>
  );
}

function Form({ onAddEntry }){

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const entry = { firstName, lastName, phone, city,country };
  // Function to handle form submission
  const handleSubmit = async (event) => {

    fetch('http://localhost:5299/api/User/createpersonalInformation/5a084730-9a90-47b9-851c-e2a37ce8f289', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry), // Send form data as payload
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      return response.json();
    })
    .then((data) => {
      console.log('API response:', data); // Handle the response as needed
  
    event.preventDefault(); // Prevent page refresh on form submission
    onAddEntry(entry); 
    setFirstName('');
    setLastName('');
    setPhone('');
    setCity('');
    setCountry('');
  })
  .catch((error) => {
    console.error('Error submitting form:', error);
  });
};

  return (
    <div>
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input 
            type="text" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Phone: </label>
          <input 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>City: </label>
          <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Country: </label>
          <input 
            type="text" 
            value={country}
            onChange={(e) => setCountry(e.target.value)} 
            required 
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

function Grid({ entries }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>City</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.firstName}</td>
              <td>{entry.lastName}</td>
              <td>{entry.phone}</td>
              <td>{entry.city}</td>
              <td>{entry.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default App;
