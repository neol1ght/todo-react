import form from "../css/modules/Form.module.css";

const Stats = (props) => {

    const {
        tasks,
        deleteAllTasks,
        loadStats,
    } = props

    return (
        <div className={form.states}>
            {
                loadStats
                ? <p>Загрузка</p>
                :  <p>Выполнено: {tasks.filter(task => task.isDone).length} из {tasks.length} задач</p>
            }
            {tasks.length > 1 ?
                <button onClick={() => deleteAllTasks()} className={form.allDelete}>Удалить все</button>
                : null}

        </div>
    )
}
export default Stats;