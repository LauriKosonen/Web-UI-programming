import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: "AIzaSyCXQyxEn2r2sxFz9gRm0nFIVxFRVTJ1Nrs",
  authDomain: "wuip-todo-6a5dd.firebaseapp.com",
  projectId: "wuip-todo-6a5dd",
  storageBucket: "wuip-todo-6a5dd.appspot.com",
  messagingSenderId: "380185912030",
  appId: "1:380185912030:web:2ffa4e5c31ff6ea403584f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Banner() {
  return (
    <h2>Todo Example with React</h2>
  )
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("");
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  // load todo list items
  useEffect(() => {
    const fetchData = async () => {
      // connect todos collection
      const todosCol = collection(db, 'todos');
      const todoSnapshot = await getDocs(todosCol);
      // todo text and id 
      // document id is unique, so it can be used with deleting todo
      const todos = todoSnapshot.docs.map(doc => {
        return  { 
          text: doc.data().text,
          id: doc.id 
        };
      });
      // set states
      console.log(todos);
      setItems(todos);
      setLoading(false);
    }
    // start loading data
    console.log("fetch data...")
    fetchData();
  },[]); // called only once

  // add todo
  const handleSubmit = async (event) => {
    // prevent normal submit event
    event.preventDefault();
    // add item to Firebase
    let newItem =  { text: itemText };
    const docRef = await addDoc(collection(db, "todos"), newItem);
    // get added doc id and set id to newItem
    newItem.id = docRef.id;
    // update states in App
    setItems( [...items, newItem]);
    // modify newItem text to ""
    setItemText("");
  }

  // remove a todo
  const removeItem = async (item) => {
    // delete from firebase
    await deleteDoc(doc(db, "todos", item.id));
    // delete from items state and update state
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
        <input type='submit' value='Add'/>
      </form>
      <ul>
      { loading  && 
        <p>Loading...</p>
      }
      {items.map(item => (
        <li key={item.id}>
          {item.text+" "} <span onClick={() => removeItem(item)}> x </span>
        </li>
      ))}
    </ul>    
    </div>
  )  
}

function App() {
  return (
    <div>
      <Banner/>
      <ToDoFormAndList/>
    </div>
  );
}

export default App;
