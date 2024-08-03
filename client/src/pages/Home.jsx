import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
export default function Home() {
  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      const res = await axiosInstance.get("/auth/api/get-users");
      if (res.data && res.data.isUser) {
        setUserInfo(res.data.isUser);
      }
    } catch (error) {
      if (error.res.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }
  };
  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);
  console.log(userInfo);
  return (
    <>
      <Navbar userInfo={userInfo}></Navbar>
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"Meeting on Tuesday"}
            date={"10/10/2022"}
            content={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. "
            }
            tags={"#Meinting #note"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          ></NoteCard>
        </div>
      </div>
      <button
        className="absolute flex items-center justify-center w-14 h-14 rounded-2xl bg-primary hover:bg-blue-600 right-10 bottom-10"
        onClick={() => {
          setOpenAddEditNotes({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white"></MdAdd>
      </button>
      <Modal
        isOpen={openAddEditNotes.isShow}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditNotes.type}
          noteData={openAddEditNotes.data}
          onClose={() =>
            setOpenAddEditNotes({ isShow: false, type: "add", data: null })
          }
        ></AddEditNotes>
      </Modal>
    </>
  );
}
