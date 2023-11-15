import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import formatDistanceToNow from "date-fns/esm/formatDistanceToNow";
import Todos from "./Todos";
import { toast } from "react-hot-toast";

import emptyTodo from "../assets/emptyTodo.svg";
import emptyTodo1 from "../assets/emptyTodo1.svg";
import emptySvg from "../assets/emptySvg1.svg";

const SingleTodo = () => {
  const [todo, setTodo] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [mytodo, setMytodo] = useState([]);
  const [edited, setEdited] = useState(0);

  const todoChange = (e) => {
    const { value } = e.target;
    setTodo(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (edited) {
      const updateTodo = mytodo.map((currVal) =>
        currVal.id === edited
          ? (currVal = {
              todo,
              id: currVal.id,
              isDone,
              createdAt: currVal.createdAt,
            })
          : currVal
      );
      setMytodo(updateTodo);
      setTodo("");
      setEdited(0);
      toast.success("Todo edited successfully.", {
        duration: 3000, // 3 seconds
        position: "top-center",
        icon: <AiFillEdit className="text-yellow-400 text-2xl" />,
      });
      return;
    }
    if (todo) {
      const id = new Date().getTime().toString();
      const createdAt = Date.now();
      const newTodo = { todo, id, isDone: false, createdAt };
      setMytodo([...mytodo, newTodo]);
      setTodo("");
      toast.success("Todo added Successfully!!");
    }
  };
  // ! Delete Todo:::
  const deleteTodo = (id) => {
    const isConfirm = window.confirm("You wanna delete it.");
    if (isConfirm === true) {
      setMytodo((remTodo) => remTodo.filter((toodo) => toodo.id !== id));

      toast.success("Todo Deleted successfully!", {
        duration: 3000, // 3 seconds
        position: "top-center",
        icon: <AiOutlineDelete className="text-red-400 text-2xl" />,
      });
    }
  };

  // ? Edit Todo:::
  const editTodo = (id) => {
    const a = mytodo.find((to) => to.id === id);
    const { todo: edittodo, id: editId } = a;
    setEdited(editId);
    setTodo(edittodo);
    setIsDone(false);
    console.log(a);
  };

  // ? HandleCheck Button:::
  const handleCheck = (ckId) => {
    const doneTodo = mytodo.map((ct) =>
      ct.id === ckId ? (ct = { ...ct, isDone: !ct.isDone }) : ct
    );
    setMytodo(doneTodo);
  };

  // ! Fetching the todo data  form the LocalStorage and saving into the mytodo array.
  useEffect(() => {
    const localTodo = JSON.parse(localStorage.getItem("todo"));
    if (localTodo) {
      setMytodo(localTodo);
    }
  }, []);

  // ? Saving the todos date to the LocalStorage:::
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(mytodo));
  }, [mytodo]);

  return (
    <div className="flex items-center justify-center flex-col ">
      <div className="w-full grid place-items-center p-8">
        <h2 className="uppercase text-4xl font-bold first-letter:text-cyan-600 mb-8">
          My Todos
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-7xl">
          <div className="flex items-center justify-between w-full mt-2 mb-8 bg-gray-300 focus:border-blue-500 focus:border-2 focus:outline-none">
            <input
              name="todo"
              placeholder="eg:your todos"
              className=" bg-transparent placeholder:capitalize pl-4 placeholder:text-gray-500 outline-none p-2 w-full"
              value={todo}
              onChange={todoChange}
            ></input>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-cyan-600 max-w-fit py-2 px-4 uppercase font-semibold w-full text-gray-50 cursor-pointer hover:bg-cyan-700 hover:text-gray-300"
            >
              {edited ? "edit" : "add todo"}
            </button>
          </div>
        </form>
      </div>
      {mytodo.length > 0 ? (
        <div className="pt-8 w-full px-8 lg:px-8 xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 max-w-7xl">
          {mytodo.map((todoo) => (
            <Todos
              {...todoo}
              AiFillDelete={AiFillDelete}
              AiFillEdit={AiFillEdit}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              handleCheck={handleCheck}
              formatDistanceToNow={formatDistanceToNow}
            />
          ))}
        </div>
      ) : (
        <div className="w-20 w-96">
          <img
            className="aspect-square w-full"
            src={emptyTodo1}
            alt="empty todo image"
          />
          <p className="texst-2xl font-semibold border border-cyan-500 rounded-md p-5 text-center">Add your new goals.</p>
        </div>
      )}
    </div>
  );
};

export default SingleTodo;
