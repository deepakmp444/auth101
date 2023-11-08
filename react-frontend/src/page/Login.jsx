import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4004/api/login", {
        email,
        password
      })
      console.log('res:', res.data)
      navigate("/dashboard")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4 offset-sm-4">
          <h1 className="text-center">Login</h1>
          <form onSubmit={login}>
            <input
              className="form-control mt-2"
              placeholder="Enter email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control mt-2"
              placeholder="Enter password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
