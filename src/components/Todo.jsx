import {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {useContext} from 'react';
import {TasksContext} from '../context/TasksContext.jsx'


import style from "../css/modules/ToDo.module.css";
import form from "../css/modules/Form.module.css";

import Button from "./Button.jsx";
import TaskList from "./TaskList.jsx";
import Stats from "./Stats.jsx";

const Todo = () => {

    const {tasks, setTasks} = useContext(TasksContext);

    const [currentTask, setCurrentTask] = useState('')

    const [filter, setFilter] = useState('all')

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTask, setSearchTask] = useState('')


    const taskRef = useRef(null)

    const addTask = useCallback((event) => {
        event.preventDefault()
        const task = {

            text: currentTask,
            isDone: false,
        }
        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(addedTask => {
                setTasks([...tasks, addedTask])
                setCurrentTask('')
                console.log('Отработано')
                console.log(addedTask)
            })
    }, [tasks])

    const deleteAllTasks = () => {
        const confirmed = confirm('Вы точно хотите удалить все задачи?')

        if (confirmed) {
            Promise.all(
                tasks.map(({id}) => {
                    return fetch(`http://localhost:3001/tasks/${id}`,
                        {'method': 'DELETE'})
                        .then(() => setTasks([]))
                })
            )
        }


    }
    const toggleTask = useCallback((id) => {

        const task = tasks.find(t => t.id === id)
        const newIsDone = !task.isDone

        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: newIsDone })
        })
            .then(response => {
                if (!response.ok) throw new Error('Ошибка обновления')
                return response.json()
            })
            .then(updatedTask => {
                setTasks(tasks.map(task =>
                    task.id === id ? updatedTask : task
                ))
            })
    }, [tasks])
    const deleteTask = useCallback((id) => {
        const deletedTasks = tasks.filter(task => task.id !== id)
            fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'DELETE',
            })
                .then(() => setTasks(deletedTasks))
    }, [tasks])
    // const deleteTask = (id) => {
    //     const deletedTasks = tasks.filter(task => task.id !== id)
    //
    //     fetch(`http://localhost:3001/tasks/${id}`, {
    //         method: 'DELETE',
    //     })
    //         .then(() => setTasks(deletedTasks))
    //
    // }

    useEffect(() => {
        if (taskRef.current) {
            taskRef.current.focus()
        }
        setTimeout(() => {
            fetch('http://localhost:3001/tasks')
                .then(response => response.json())
                .then((data) => {
                    setTasks(data)
                    setLoading(false)
                })
                .catch(error => {
                    setError(error.message)
                    console.log(error.message)
                    setLoading(false)
                })
        }, 1000)
    }, [])
    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {

            if (filter === 'active' && task.isDone) return false
            if (filter === 'done' && !task.isDone) return false

            if (searchTask && !task.text.toLowerCase().includes(searchTask.toLowerCase())) {
                return false
            }

            return true
        })
    }, [tasks, filter, searchTask])

    if (error) {
        return (
            <div className='todo'>
                <p>Ошибка! Мы обязательно ее исправим</p>
            </div>

        )
    }

    return (
        <div className="todo">
            <p className={style.title}>Список задач</p>
            <form action="" method="" className={form.form}>
                <input type="text"
                       placeholder='Напишите сюда задачу'
                       className={form.input}
                       value={currentTask}
                       ref={taskRef}
                       onChange={e => setCurrentTask(e.target.value)}
                />
                <p className={form.add}>+</p>
                <Button
                    className={form.button}
                    type='submit'
                    onClick={addTask}
                >
                    Добавить
                </Button>

            </form>
            <div className={form.search_task}>
                <input placeholder='Поиск...'
                        className={form.input_search}
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}/>
            </div>

            <Stats
                tasks={tasks}
                deleteAllTasks={deleteAllTasks}
                loadStats={loading}
            />

            <div className={form.filter}>
                <button onClick={() => setFilter('all')}>Все</button> /
                <button onClick={() => setFilter('active')}>Активные</button> /
                <button onClick={() => setFilter('done')}>Завершенные</button>
            </div>

            {!loading ? <TaskList
                className={form.list}
                tasks={filteredTasks}
                deleteTask={deleteTask}
                toggleTask={toggleTask}
            /> : <><div className='load'></div>
                <div>Загрузка...</div></>
            }


        </div>
    )
}

export default Todo