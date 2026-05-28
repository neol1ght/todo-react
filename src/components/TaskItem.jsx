import form from "../css/modules/Form.module.css";
import Button from "./Button.jsx";
import {Link} from 'react-router-dom';

const TaskItem = (props) => {
    const {
        task,
        index,
        className,
        deleteTask,
        toggleTask,

    } = props
    return (
        <li className={className}>
            <input type='checkbox'
                   checked={task.isDone}
                   className={form.check}
                   onChange={() => toggleTask(task.id)}  />

            <div className={`${form.content} ${task.isDone ? form.blocked : null}`}>
                <Link to={`task/${task.id}`}
                  className={form.taskText}>
                    {task.text}
                </Link>
                <Button
                    className={form.delete}
                    onClick={() => deleteTask(task.id)}
                >

                    Удалить
                </Button>
            </div>

        </li>
    )
}

export default TaskItem;
