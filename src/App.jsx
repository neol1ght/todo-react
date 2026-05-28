import {useState, useEffect, useRef} from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import {TasksContext} from './context/TasksContext'
import './index.css'

import Todo from './components/Todo.jsx'
import AboutPage from './pages/AboutPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import CurrentTaskPage from './pages/CurrentTaskPage.jsx'
import style from "./css/modules/ToDo.module.css";
import form from "./css/modules/Form.module.css";
import Button from "./components/Button.jsx";
import TaskList from "./components/TaskList.jsx";

const App = () => {

    const [tasks, setTasks] = useState(() => {

        const getTasks = localStorage.getItem('tasks')
        if (getTasks) {
            return JSON.parse(getTasks)
        }
        return [
            {id: 1, text: 'Task 1', isDone: false},
            {id: 2, text: 'Task 2', isDone: false},
            {id: 3, text: 'Task 3', isDone: true},
        ]

    })

    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li><NavLink to='/'
                                 className={({ isActive }) =>
                        `navbar__element ${isActive ? 'active' : ''}`
                    }>Главная</NavLink></li>
                    <li><NavLink to='/about'
                                 className={({ isActive }) =>
                        `navbar__element ${isActive ? 'active' : ''}`
                    }>О нас</NavLink></li>
                </ul>


            </nav>
            <TasksContext.Provider value={{tasks, setTasks}}>
                <Routes>
                    <Route path='/' element={<Todo />}></Route>
                    <Route path='/about' element={<AboutPage />}></Route>
                    <Route path='/task/:id' element={<CurrentTaskPage />}></Route>
                    <Route path='*' element={<NotFoundPage />}></Route>
                </Routes>
            </TasksContext.Provider>

        </>

    )
}
export default App;