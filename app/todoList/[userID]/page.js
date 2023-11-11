import styles from './page.module.css';
import TodoList from './todoListComponent';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

export default function TodoPage({ params }) {

    return(<>

        <main className={styles.container}>
            <section className={styles.firstLayer}>
                <h1>ToDo List</h1>
                <a href='#' className={styles.quit}>Sair</a>
            </section>

            <TodoList user={params.userID}/>

        </main>

        <section className={styles.addTodoModal}>
            <ClearIcon />
            <label>Nome da Tarefa:</label>
            <input placeholder='Digite uma tarefa...' />

            <div className={styles.btnGroup}>
                <button>Adiconar <CheckIcon /></button>
                <button>Ainda não <ClearIcon /></button>
            </div>
        </section>

        <section className={styles.addTodo}>
            <button><AddIcon /></button>
        </section>
    
    </>)
}