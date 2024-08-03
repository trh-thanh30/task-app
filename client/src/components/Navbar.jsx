/* eslint-disable react/prop-types */
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
export default function Navbar({ userInfo }) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchValue("");
  };
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white drop-shadow">
      <h2 className="py-2 text-xl font-medium text-black">Notes</h2>
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      ></SearchBar>
      <ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>
    </div>
  );
}
