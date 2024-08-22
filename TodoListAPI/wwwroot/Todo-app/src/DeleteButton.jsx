import React from 'react';

function DeleteButton({taskId, deleteTask}){

    const handleDelete = () => {
        deleteTask(taskId);
    };

    return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteButton;