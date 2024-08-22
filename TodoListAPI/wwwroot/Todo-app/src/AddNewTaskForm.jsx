import React, { useState } from 'react';

function AddNewTaskForm({ addTask }) {

    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim()) {
            const newTask = { text: inputValue };
            addTask(newTask);
            setInputValue('');
            setErrorMessage('')
        } else {
            setErrorMessage('Please enter a task.')
        }
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <input
                type="text"
                placeholder="Add a new task"
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
            />
            <button type="submit">Add Task</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
}

export default AddNewTaskForm;