import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with your "Publish to Web" CSV URL
  const SHEET_URL = "YOUR_GOOGLE_SHEET_CSV_URL_HERE";

  const fetchData = async () => {
    try {
      const response = await fetch(SHEET_URL);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      
      // Basic CSV to JSON Parser
      const lines = csv.split('\n');
      const resultData = lines.slice(1).map(line => {
        const [name, service, status] = line.split(',');
        return { name, service, status };
      });

      setData(resultData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching sheet data:", error);
      setLoading(false);
    }
  };

  // Poll for data every 30 seconds for "Real-time" feel
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Business Dashboard</h1>
        <p>Real-time Google Sheets Sync</p>
      </header>

      {loading ? (
        <p>Loading business data...</p>
      ) : (
        <div style={styles.grid}>
          {data.map((item, index) => (
            <div key={index} style={styles.card}>
              <h3>{item.name}</h3>
              <p><strong>Service:</strong> {item.service}</p>
              <span style={styles.badge}>{item.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

      <span style={{
        color: item.status === 'Paid' ? 'green' : 'red',
        fontWeight: 'bold'
      }}>
        {item.status}
      </span>

// Basic CSS-in-JS Layout
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' },
  header: { borderBottom: '2px solid #333', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
  card: { padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  badge: { backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }
};

export default App;