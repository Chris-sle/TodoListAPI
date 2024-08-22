import React from 'react';

function CompleteTaskButton({ taskId, markAsDone }){
    
    const markComplete = () => {
        markAsDone(taskId)
    };

    return(
        <button onClick={markComplete}>Done</button>
    )
    
}

export default CompleteTaskButton;