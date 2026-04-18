import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // 1. Double-check this URL: It MUST end in output=csv
  const SHEET_URL = "PASTE_YOUR_FULL_LINK_HERE";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        if (!response.ok) throw new Error("Failed to fetch sheet");
        
        const csvText = await response.text();
        const lines = csvText.split('\n');
        
        // 2. Add a check to filter out empty lines
        const parsedData = lines.slice(1)
          .filter(line => line.trim() !== "") 
          .map(line => {
            const columns = line.split(',');
            return {
              name: columns[0] || "No Name",
              service: columns[1] || "N/A",
              status: columns[2] || "N/A"
            };
          });

        setData(parsedData);
      } catch (err) {
        console.error(err);
        setError("Could not load data. Check your Google Sheet link!");
      }
    };

    fetchData();
  }, []);

  // 3. Prevent white screen by showing a message if it fails
  if (error) return <div style={{color: 'red', padding: '20px'}}>{error}</div>;
  if (data.length === 0) return <div style={{padding: '20px'}}>Loading dashboard data...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Business Dashboard</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#eee' }}>
          <tr>
            <th>Client Name</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.service}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;