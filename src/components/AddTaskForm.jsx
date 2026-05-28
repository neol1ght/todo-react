import form from '../css/modules/Form.module.css'
import AddTask from './components/AddTask.jsx'
const AddTaskForm = (props) => {
    const {
        className
    } = props
    {/*<form action="" method="" className={form.form}>*/}
    {/*    <input type="text"*/}
    {/*           placeholder='Напишите сюда задачу'*/}
    {/*           className={form.input}*/}
    {/*           value={currentTask}*/}
    {/*           ref={taskRef}*/}
    {/*           onChange={e => setCurrentTask(e.target.value)}*/}
    {/*    />*/}
    {/*    <p className={form.add}>+</p>*/}
    {/*    <Button*/}
    {/*        className={form.button}*/}
    {/*        type='submit'*/}
    {/*        onClick={addTask}*/}
    {/*    >*/}
    {/*        Добавить*/}
    {/*    </Button>*/}
    {/*</form>*/}

    return (
        <form action="" method="" className={className}>
        <AddTask type="text"
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
    )
}
export default AddTaskForm