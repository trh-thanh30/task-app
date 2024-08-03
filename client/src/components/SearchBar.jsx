import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
export default function SearchBar({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-slate-400 cursor-pointer hover:text-black mr-3 text-xl"
        ></IoMdClose>
      )}
      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      ></FaMagnifyingGlass>
    </div>
  );
}
