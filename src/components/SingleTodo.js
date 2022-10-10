import {useEffect, useState} from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import formatDistanceToNow from 'date-fns/esm/formatDistanceToNow';
import Todos from './Todos';

const SingleTodo = () => {
    const [todo , setTodo] = useState("");
    const [search, setSearch] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [check, setCheck] = useState(0);
    const [mytodo, setMytodo] = useState([]);
    const [edited , setEdited] = useState(0);

    const searchChange = (e) => {
        console.log('searching todo');
    }
    const todoChange = (e) =>{
        const {value} = e.target;
        setTodo(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if(edited){
            const updateTodo = mytodo.map(currVal => currVal.id === edited ? (currVal = {todo, id:currVal.id, isDone, createdAt:currVal.createdAt}) : currVal)
            setMytodo(updateTodo);
            setTodo("")
            setEdited(0)
            return;
        }
        if(todo) {
            const id = new Date().getTime().toString();
            const createdAt = Date.now();
            const newTodo = {todo,id, isDone, createdAt};
            setMytodo([...mytodo ,newTodo])
            setTodo("")
        }
    }
    // ! Delete Todo:
    const deleteTodo = (id) => {
        setMytodo(remTodo => remTodo.filter(toodo => toodo.id !== id))
    }

    // ? Edit Todo:
    const editTodo = (id) => {
        const a = mytodo.find(to => to.id === id);
        const {todo:edittodo , id: editId} = a
        setEdited(editId)
        setTodo(edittodo)
    }

    // ? HandleCheck 
    const handleCheck = (ckId) => {
        const doneTodo = mytodo.map(ct => ct.id === ckId ? (ct = {...ct,isDone:!ct.isDone}):ct)
        setMytodo(doneTodo)
    }
    
    useEffect(() => {
        const localTodo = JSON.parse(localStorage.getItem('todo'))
        if(localTodo) {
            setMytodo(localTodo)
        }
    },[])
    
    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(mytodo));
        console.log(mytodo);
    },[mytodo])

  return (
    <div className='flex items-center justify-center flex-col mt-8'>
        <h2 className='uppercase text-4xl font-bold first-letter:text-cyan-600 mb-8'>My Todos</h2>
        <form onSubmit={handleSubmit} className="w-2/4">
            <div className='bg-gray-200'>
                <input name="search" placeholder='search' className='bg-transparent p-2' value={search} onChange={searchChange}></input>
            </div>
            <div className='flex items-center justify-between bg-gray-200  mt-2 mb-8 active:border-blue-500 focus:border-blue-500'>
                <input name="todo" placeholder='eg:your todos' className=' bg-transparent  p-2 w-full' value={todo} onChange={todoChange}></input>
                <button onClick={handleSubmit} type="submit" className='bg-cyan-600 w-max py-2 px-4 uppercase font-bold cursor-pointer hover:bg-cyan-800 hover:text-gray-300'>{edited ? 'edit' : 'add'}</button>
            </div>
        </form>

        {
             mytodo.map(todoo => {
                const {id, todo, isDone, createdAt} = todoo;
                return (
                    <Todos {...todoo} AiFillDelete={AiFillDelete} AiFillEdit={AiFillEdit} deleteTodo={deleteTodo} editTodo={editTodo} handleCheck={handleCheck} formatDistanceToNow={formatDistanceToNow}/>
                )
            }) 
        }
    </div>
  )
}

export default SingleTodo