import React from 'react';
import './App.css';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  image: string;
}

function EmployeeComponent(props: { employee: Employee }) {
  return (
    <div className="employee">
      <img src={props.employee.image} alt={`${props.employee.firstName} ${props.employee.lastName}`} />
      <h2>{props.employee.firstName} {props.employee.lastName}</h2>
      <p>Email: {props.employee.email}</p>
      <p>Phone: {props.employee.phone}</p>
      <p>Title: {props.employee.title}</p>
      <p>Department: {props.employee.department}</p>
    </div>
  );
}

export default EmployeeComponent;