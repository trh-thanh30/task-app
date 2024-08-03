/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
export default function PasswordInput({ value, onChange, placeholder }) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="mt-3 flex items-center bg-transparent border-[1.5px] px-5 mb-3 rounded ">
      <input
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "Password"}
        className="w-full bg-transparent text-sm py-3 mr-3 rounded outline-none  "
        value={value}
        onChange={onChange}
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="cursor-pointer text-primary"
          onClick={() => toggleShowPassword()}
        ></FaRegEye>
      ) : (
        <FaRegEyeSlash
          size={22}
          className="cursor-pointer text-slate-400"
          onClick={() => toggleShowPassword()}
        ></FaRegEyeSlash>
      )}
    </div>
  );
}
