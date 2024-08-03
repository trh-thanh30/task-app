
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { useState } from "react";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";
export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
    try {
      const res = await axiosInstance.post("/auth/api/login", {
        email: email,
        password: password,
      });
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
      <div className="flex items-center justify-center mt-28">
        <div className="py-10 bg-white border rounded w-96 px-7">
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
            {error && <p className="pb-1 text-xs text-red-500">{error}</p>}
            <button className="btn-primary" type="submit">
              Login
            </button>
            <p className="mt-4 text-sm text-center">
              Not registered yet?{" "}
              <Link
                className="font-medium underline text-primary"
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
