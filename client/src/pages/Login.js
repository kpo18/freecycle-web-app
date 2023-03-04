import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const HOSTNAME = "http://localhost:5050"

export function Login() {
  const userRef = useRef();
  const errRef = useRef();
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(`${HOSTNAME}/users/login`,
              JSON.stringify({ username, password }),
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          );
          console.log(JSON.stringify(response?.data));
          //console.log(JSON.stringify(response));
          //store it locally
        localStorage.setItem("token", response?.data?.token);
        console.log(response?.data?.message, response?.data?.token);
          
          setUsername('');
          setPassword('');
          setSuccess(true);
      } catch (err) {
          if (!err?.response) {
              setErrMsg('No Server Response');
          } else if (err.response?.status === 400) {
              setErrMsg('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setErrMsg('Unauthorized');
          } else {
              setErrMsg('Login Failed');
          }
          errRef.current.focus();
      }
  }

  const requestData = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  


  {/*
   const [credentials, setCredentials] = useState({
        username: "",
        password: "",
   });
   

   const { username, password } = credentials;

   const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/login`, {
        method: "POST",
        data: credentials,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  const requestData = async () => {
    try {
      const { data } = await axios(`${HOSTNAME}/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      // setUser

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  */}

  return (
    <div className="page-container">
      <Header />
      <div className="spacer-20"></div>
      {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <Link to="/">Got to Home</Link>
                    <button onClick={requestData}>Request protected data</button>
                </section>
            ) : (
        <section className="main">
          <div className="container">
          <h2>Login to your account</h2>
            <div className="form-control">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
              <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                 />         
                <label htmlFor="password">Password:</label>
                <input
                   type="password"
                   id="password"
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
                   required
                />
                <button>Sign In</button>
                </form>
                  <p>
                    Need an account?<br />
                    <Link to="/register" className="line">Register</Link>
                   </p>
            </div>
        </div>
      </section>
      )}
      <div className="spacer-50"></div>
      <Footer />
    </div>
  );
}