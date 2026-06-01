import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("BUTTON CLICKED");
    console.log(email, password);

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      console.log("SUCCESS:", res.data);

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");
      window.location.href = "/";
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button
        onClick={() => {
          console.log("BUTTON WORKING");
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;