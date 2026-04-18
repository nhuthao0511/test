import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [data, setData] = useState([]);

  // Replace this with your copied "Published as CSV" URL
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/11hk1vugEm39QpzhUnjmEmmo5nLKCcTy63P4bL1Fnyqo/edit?gid=953143334#gid=953143334";

  const fetchSheetData = async () => {
    try {
      const response = await fetch(SHEET_URL);
      const csvText = await response.text();
      
      // Parse CSV to JSON
      const lines = csvText.split('\n');
      const headers = lines[0].split(',');
      const result = lines.slice(1).map(line => {
        const columns = line.split(',');
        return {
          name: columns[0],    // Column A
          service: columns[1], // Column B
          status: columns[2]   // Column C
        };
      });

      setData(result);
    } catch (error) {
      console.error("Error loading sheet data:", error);
    }
  };

  useEffect(() => {
    fetchSheetData();
    // Refresh data every 30 seconds for a real-time feel
    const interval = setInterval(fetchSheetData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Real-time Business Dashboard</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.service} ({item.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;