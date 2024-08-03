import { useState } from "react";
import TagInput from "../components/TagInput";
import { MdClose } from "react-icons/md";

export default function AddEditNotes({ onClose, noteData, type }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const addNewNote = async () => {};
  const editNote = async () => {};
  const handleAddNote = () => {
    if (!title) {
      setError("Title is required");
      return;
    }
    if (!content) {
      setError("Content is required");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 right-0 hover:bg-slate-100"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400"></MdClose>
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="" className="input-label">
          CONTENT
        </label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          name=""
          id=""
          className="text-sm text-slate-950 outline-none bg-slate-50 rounded-md"
          placeholder="Content"
          rows={10}
        ></textarea>
      </div>
      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags}></TagInput>
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        onClick={handleAddNote}
        className="btn-primary font-medium mt-5 p-3"
      >
        ADD
      </button>
    </div>
  );
}
