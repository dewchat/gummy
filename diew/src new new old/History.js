// History.js
import React, { useState, useEffect } from 'react';
import data from './data.json';  // นำเข้าข้อมูลจากไฟล์ JSON

function History() {
  const [issues, setIssues] = useState([]);

  // ฟังก์ชันในการดึงข้อมูลจาก JSON และจัดเรียง
  useEffect(() => {
    // ดึงข้อมูลที่จำเป็นจาก JSON
    const customerProblemData = data.Customer_problem.map(problem => {
      // ค้นหาลูกค้า
      const customer = data.Customer.find(cust => cust.Customer_ID === problem.Customer_ID);
      // ค้นหาสถานะของปัญหานั้นๆ
      const statusHistory = data.Status.filter(status => status.Issue_ID === problem.Issue_ID)
        .map(status => ({
          time: new Date().toLocaleString(),  // ตั้งเวลาให้เป็นตัวอย่าง
          status: status.Status
        }));
      // ค้นหาผู้ดูแลปัญหานั้นๆ
      const officer = data.Officer.find(off => off.Officer_ID === problem.Assigned_to);

      return {
        issueId: problem.Issue_ID,
        description: problem.Issue_description,
        customer: ${customer.First_name} ${customer.Last_name},
        officer: officer ? officer.Department_name : 'Unknown',
        statusHistory
      };
    });
    setIssues(customerProblemData);
  }, []);

  return (
    <div className="history">
      <h2>Problem History</h2>
      {issues.map((issue) => (
        <div key={issue.issueId} className="issue">
          <h3>Problem No. #{String(issue.issueId).padStart(5, '0')}</h3>
          <p><strong>Problem Details</strong></p>
          <p>{issue.description}</p>
          <p><strong>Date/Time</strong></p>
          <p>{new Date().toLocaleString()}</p>
          <p><strong>Status</strong></p>
          <div className="status-history">
            {issue.statusHistory.map((status, index) => (
              <p key={index}>{status.time} - {status.status}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;