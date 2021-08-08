import React from 'react'

export default function ToDo({ todoItem, markComplete }) {

    const markTask = () => {
        markComplete(todoItem.id);
    }

    return (
        <>
            <div className="todo-item-container" style={todoItem.completed ? {textDecoration: "line-through", color: "rgba(250,250,250,.8)"} : {}}>
                <label className="todo-item">
                    <input style={{display: "inline-block"}}
                    type="checkbox" 
                    onChange={markTask}
                    checked={todoItem.completed ? todoItem.completed : false} />
                    {' '}
                    {todoItem.title}

                </label>
            </div>
        </>
    )
}
