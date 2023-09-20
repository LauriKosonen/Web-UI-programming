
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Employee from './employee';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data)
      })
  }, [])

  const employeeItems = employees.map((employee,index) =>
  <Employee key={index} employee={employee}/>
);



return (
  <div className="App">
    <ul className="employee-container">
      {employeeItems}
    </ul>
  </div>
);
}

export default App;
