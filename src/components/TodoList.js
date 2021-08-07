import React from 'react'
import Todo from "./ToDo"
export default function TodoList({ todoList, markComplete }) {

    return (
        <>
            <div className="todos-container">
                <div className="todos-header">
                    <h2 >YOUR TASKS LIST</h2>
                    <span>TASKS LEFT: {' '}
                        <strong>
                            {todoList.filter(todo => todo.completed === false).length} / {todoList.length}
                        </strong>
                    </span>
                </div>

                {todoList.map(todo => <Todo key={todo.id} todoItem={todo} markComplete={markComplete}/>)}
            </div>
        </>
    )
}
