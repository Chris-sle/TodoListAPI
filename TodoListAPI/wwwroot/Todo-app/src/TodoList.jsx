import React, { useEffect, useState } from 'react';
import DeleteButton from './DeleteButton';
import CompleteTaskButton from './CompleteTaskButton.jsx';

function TodoList({ todos, deleteTask, markAsDone }) {
    var cardId = 1
    return (
        <div>
            <h3>Task List</h3>
            <div className='card'>
                {todos.map(todo => (
                    <div key={cardId++}>
                        {todo.text} 
                        {todo.done ? (
                            <span style={{ marginLeft: '10px' }}>
                                Completed on: {new Date(todo.done).toLocaleDateString()} {/* Assuming 'done' holds a date */}
                            </span>
                        ) : (
                            <CompleteTaskButton taskId={todo.id} markAsDone={markAsDone} />
                        )}
                        <DeleteButton taskId={todo.id} deleteTask={deleteTask} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
