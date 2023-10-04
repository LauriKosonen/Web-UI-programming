import * as React from "react";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>This is your application Home page.</p>
    </div>
  );
}

function About() {
  const { pathname } = useLocation();
  let navigate = useNavigate();
  return (
    <div className="About">
      <h2>About</h2>
      <p>This is your application About page.</p>
      <p>Current URL: {pathname}</p>
      <button onClick={() => navigate('/') } >Go to home</button>
    </div>
  );
}

function User() {
  const { name } = useParams()
  return (
    <div className="User">
      <h2>User</h2>
      <p>Username is {name}.</p>
    </div>
  );
}


function App() {
  const name = "Kirsi Kernel"
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="/user/:name" element={<User />} />
      </Routes>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to={`/user/${name}`}>User</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
