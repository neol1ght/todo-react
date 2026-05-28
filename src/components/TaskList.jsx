import form from "../css/modules/Form.module.css";
import TaskItem from "./TaskItem.jsx";

const TaskList = (props) => {
    const {
        className,
        tasks,
        deleteTask,
        toggleTask,

    } = props

    return (
        <>
            {(tasks.length > 0) ? (
                <ul className={className}>
                    {tasks.map((task, index) => (
                        <TaskItem
                            className={form.element}
                            task={task}
                            index={index}
                            key={task.id}
                            deleteTask={deleteTask}
                            toggleTask={toggleTask}
                        />
                    ))}
                </ul>
            ) : (
                <h2 className={form.emptyTasks}>Сейчас у вас нет задач!</h2>
            )}
        </>
    )
}

export default TaskList;