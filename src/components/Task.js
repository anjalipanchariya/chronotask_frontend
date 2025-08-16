function Task({ task, onDelete, onChangeText, onCompleteTask }) {


    return (
        <>
            <div className="task">
                <input type="checkbox" name="task" id="task" 
                onChange={() => onCompleteTask(task.id)} 
                checked={!!task.isCompleted} />
                <input type="text"
                    className={`taskInfo ${task.isCompleted ? "completed" : ""}`}
                    value={task.description}
                    onChange={(e) => onChangeText(task.id, e.target.value)}
                />
                <img src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png" alt=""
                    onClick={() => onDelete(task)} />
            </div>
        </>
    )
}

export default Task;  