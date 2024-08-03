/* eslint-disable react/prop-types */
import { getInitilas } from "../utils/helper";

export default function ProfileInfo({ userInfo, onLogout }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-12 h-12 font-medium rounded-full text-slate-950 bg-slate-100">
        {getInitilas(userInfo?.fullName)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.fullName}</p>
        <button className="text-sm underline text-slate-700" onClick={onLogout}>
          Logout{" "}
        </button>
      </div>
    </div>
  );
}
