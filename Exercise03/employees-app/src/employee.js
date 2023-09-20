import React from 'react';
import './App.css';

function Employee(props) {
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

export default Employee;