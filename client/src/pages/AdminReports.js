import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports'); // Adjust the endpoint as needed
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleReportChange = (event) => {
    setNewReport(event.target.value);
  };

  const handleReportAdd = async () => {
    if (!newReport) return; // Prevent adding empty reports
    try {
      await axios.post('/api/reports', { name: newReport }); // Adjust the endpoint as needed
      setNewReport('');
      fetchReports();
    } catch (error) {
      console.error('Error adding report:', error);
    }
  };

  const handleReportDelete = async (reportId) => {
    try {
      await axios.delete(`/api/reports/${reportId}`); // Adjust the endpoint as needed
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div>
      <h2>Admin Reports</h2>

      <div>
        <input
          type="text"
          placeholder="New Report Name"
          value={newReport}
          onChange={handleReportChange}
        />
        <button onClick={handleReportAdd}>Add Report</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>
                <button onClick={() => handleReportDelete(report.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;