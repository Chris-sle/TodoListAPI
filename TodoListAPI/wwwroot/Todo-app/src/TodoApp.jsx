import React, { useEffect, useState } from 'react';
import AddNewTaskForm from './AddNewTaskForm.jsx';
import TodoList from './TodoList.jsx';

function TodoApp(){

    const [todos, setTodos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch initial todos from the backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('/todo');

                if (!response.ok) throw new Error('Network response was not ok')
                
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
                setErrorMessage('Failed to load tasks. Please try again later.')
            }
        };
        fetchTodos();
    }, []);

    //Add new task
    const addTask = async (newTask) => {
        try {
            const response = await fetch('/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) throw new Error('failed to add task')
            
            const createdTodo = await response.json();
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
            setErrorMessage('');
        } catch(error) {
            console.error('There was a problem with your fetch operation:', error);
            setErrorMessage('Failed to add task. Please try again.');
        }  
    };

    // Delete a task
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`/todo/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete task.');

            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
            setErrorMessage(''); 
        } catch (error) {
            console.error('There was a problem with your delete operation:', error);
            setErrorMessage('Failed to delete task. Please try again.');
        }
    };

    // Mark task done
    const markAsDone = async (id) => {
        try {
            const response = await fetch('/todo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) throw new Error('Failed to update task status.');

            const updatedTodo = await response.json();
            setTodos((prevTodos) => 
                prevTodos.map(todo => (todo.id === id ? updatedTodo : todo))
            );
        } catch (error) {
            console.error('There was a problem with your update operation:', error);
            setErrorMessage('Failed to update task status. Please try again.');
        }        
    };

    return (
        <div className='Main'>
            <AddNewTaskForm addTask={addTask} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <TodoList todos={todos} deleteTask={deleteTask} markAsDone={markAsDone} />
        </div>
    );
}

export default TodoApp;