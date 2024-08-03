import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useState } from "react";
export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/signin");
  };
  const handleSearch = () => {};
  const onClearSearch = () => {
    setSearchValue("");
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      ></SearchBar>
      <ProfileInfo onLogout={onLogout}></ProfileInfo>
    </div>
  );
}
