import React from 'react'

export default function ToDo({ todoItem, markComplete }) {

    const markTask = () => {
        markComplete(todoItem.id);
    }
    return (
        <>
            <div className="todo-item" style={todoItem.completed ? {textDecoration: "line-through", color: "rgba(250,250,250,.8)"} : {}}>
                <label >
                    <input 
                    type="checkbox" 
                    onChange={markTask}/>
                    {'  '}
                    {todoItem.title}
                </label>
            </div>
        </>
    )
}
