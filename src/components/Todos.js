import React from 'react'

const Todos = ({isDone, todo, id, AiFillDelete, AiFillEdit , editTodo, deleteTodo , handleCheck, formatDistanceToNow, createdAt}) => {
  return (
        <div className='mt-4 w-full' key={id}>
            <div className='flex justify-between bg-gray-300 p-4 rounded drop-shadow-md'>
                <div>
                <p className={isDone ? 'mr-4 break-words capitalize line-through' : 'mr-4 break-words capitalize'}><span className='mr-2'>
                    <input type="checkbox" id='checkbox' onChange={() => handleCheck(id)} />
                    </span>{todo}</p>
                <p className='lowercase mt-2 text-cyan-600 font-extralight'>{formatDistanceToNow(new Date(createdAt),{addSuffix: true})}</p>
                </div>
                <div className='flex gap-4'>
                    <button onClick={() => editTodo(id)} className='text-xl hover:text-teal-700 transition-color'>
                        <AiFillEdit />
                    </button>
                    <button onClick={() => deleteTodo(id)} className='text-xl hover:text-red-700 transition-color'>
                        <AiFillDelete />
                    </button>
                </div>
            </div>
        </div>
  )
}

export default Todos