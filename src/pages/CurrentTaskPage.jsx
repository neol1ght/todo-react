import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useState } from "react";
import {TasksContext} from "../context/TasksContext";
import '../index.css'
import curPage from '../css/modules/CurrentPage.module.css'
const CurrentTaskPage = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const {tasks} = useContext(TasksContext)

    const task = tasks.find(task => task.id === id)

    const [taskDetail, setTaskDetail] = useState('')


    return (
        <div className='todo'>
            <h2 className={curPage.title}>Задача</h2>
            <h3>{task.text}</h3>
        </div>


    )
}
export default CurrentTaskPage