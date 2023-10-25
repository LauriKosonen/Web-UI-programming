
import React from 'react';
import './App.css';

interface User {
  firstname: string;
  lastname: string;
  age: number;
}

const users: Array<User> = [
  {
    "firstname": "Kirsi",
    "lastname": "Kernel",
    "age": 40
  },
  {
    "firstname": "Jeppe",
    "lastname": "Jelonen",
    "age": 20
  },
];

const UserItem:React.FC<User> = ({firstname, lastname, age}:User) => {
  return (
    <div>
      {firstname} {lastname} {age}
    </div>
  )
}

function App() {

  return (
    <div className="App">
      {users.map(user => {
        return (
          <UserItem firstname={user.firstname} 
                    lastname={user.lastname} 
                    age={user.age}/>
        )
      })}
    </div>
  );
}

export default App;
