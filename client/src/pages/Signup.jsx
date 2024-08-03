import { useState } from "react";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

export default function Signup() {
  const navigate = useNavigate();
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
      return;
    }
    setError(null);

    try {
      const res = await axiosInstance.post("/auth/api/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      if (res.data && res.data.error) {
        setError(res.data.error);
        return;
      }
      if (res.data && res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.res && error.res.data && error.res.data.message) {
        setError(error.res.data.message);
      } else {
        setError("An unexpected error occurred. Please try agian");
      }
    }
  };
  return (
    <>
      <Navbar></Navbar>

      <div className="flex items-center justify-center mt-28">
        <div className="py-10 bg-white border rounded w-96 px-7">
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
            {error && <p className="pb-1 text-xs text-red-500">{error}</p>}
            <button className="btn-primary" type="submit">
              Create Account
            </button>
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link
                className="font-medium underline text-primary"
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
