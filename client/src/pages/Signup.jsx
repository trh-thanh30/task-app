import { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/helper";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return
    }
    setError(null);
  };
  return (
    <>
      <Navbar></Navbar>

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handelSubmit}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="input-box"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              className="input-box"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></PasswordInput>
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button className="btn-primary" type="submit">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/signin"}
              >
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
