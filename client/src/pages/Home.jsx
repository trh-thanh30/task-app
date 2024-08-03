import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useState } from "react";
export default function Home() {
  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isShow: false,
    type: "add",
    data: null,
  });
  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto px-6">
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
        className="w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
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
