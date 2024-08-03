import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../utils/helper";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Plase enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("");
  };
  console.log(error);
  return (
    <>
      <Navbar></Navbar>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handelSubmit}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="input-box"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="btn-primary" type="submit">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/signup"}
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
