import React, { useState, useEffect } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [error, setError] = useState('');

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/contacts');
      const data = await res.json();
      setContacts(data);
    } catch (err) { console.error("Backend not reached:", err); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Name, Email, and Phone are required!');
      return;
    }

    const res = await fetch('http://localhost:5001/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setError('');
      fetchContacts();
    }
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Contact Manager</h1>
        <p>MERN Stack Interview Task</p>
      </header>

      <section style={formSectionStyle}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name*" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
          <input type="email" placeholder="Email Address*" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
          <input type="text" placeholder="Phone Number*" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={inputStyle} />
          <textarea placeholder="Your Message (Optional)" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{...inputStyle, height: '80px'}} />
          {error && <p style={{ color: '#ff4d4d', fontWeight: 'bold' }}>{error}</p>}
          <button type="submit" style={btnStyle}>Save Contact</button>
        </form>
      </section>

      <section style={tableSectionStyle}>
        <h3>Stored Contacts</h3>
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: '#333', color: '#fff' }}>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{c.name}</td>
                <td style={tdStyle}>{c.email}</td>
                <td style={tdStyle}>{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// STYLES
const containerStyle = { padding: '40px 20px', maxWidth: '700px', margin: 'auto', fontFamily: 'system-ui, sans-serif' };
const headerStyle = { textAlign: 'center', marginBottom: '30px' };
const formSectionStyle = { background: '#f9f9f9', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', marginBottom: '40px' };
const inputStyle = { display: 'block', width: '100%', padding: '12px', margin: '12px 0', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' };
const btnStyle = { padding: '14px', width: '100%', background: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' };
const tableSectionStyle = { overflowX: 'auto' };
const tableStyle = { width: '100%', borderCollapse: 'collapse', textAlign: 'left' };
const thStyle = { padding: '12px', borderBottom: '2px solid #eee' };
const tdStyle = { padding: '12px' };

export default App;