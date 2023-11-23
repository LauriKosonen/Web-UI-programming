import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmployeeComponent, { Employee } from './employee';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios
    .get('http://localhost:3001/employees')
      .then(response => {
        setEmployees(response.data);
      });
  }, []);

  const employeeItems = employees.map((employee) => (
    <EmployeeComponent key={employee.id} employee={employee} />
  ));

  return (
    <div className="App">
      <ul className="employee-container">{employeeItems}</ul>
    </div>
  );
}

export default App;
