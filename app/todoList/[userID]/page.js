import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function TodoList({ params }) {
    return(<>
        <main className={styles.container}>
            <section className={styles.firstLayer}>
                <h1>ToDo List</h1>
                <a href='#' className={styles.quit}>Sair</a>
            </section>

            <section>
                <ul className={styles.todoList}>
                    <li>
                        <CheckCircleOutlineIcon/>
                        <p>Tarefa 1</p>
                        <DeleteIcon/>
                    </li>
                    <li>
                        <CheckCircleOutlineIcon/>
                        <p>Tarefa 2</p>
                        <DeleteIcon/>
                    </li>
                    <li>
                        <CheckCircleOutlineIcon/>
                        <p>Tarefa 3</p>
                        <DeleteIcon/>
                    </li>
                    <li>
                        <CheckCircleOutlineIcon/>
                        <p>Tarefa 4</p>
                        <DeleteIcon/>
                    </li>
                    <li>
                        <CheckCircleOutlineIcon/>
                        <p>Tarefa 5</p>
                        <DeleteIcon/>
                    </li>
                </ul>
            </section>
        </main>
    </>)
}