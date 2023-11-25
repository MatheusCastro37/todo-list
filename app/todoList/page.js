import styles from './page.module.css';
import TodoList from './todoListComponent';
import Modal from './modalComponent';

export default function TodoPage() {

    return(<>

        <main className={styles.container}>
            <section className={styles.firstLayer}>
                <h1>ToDo List</h1>
                <a href='#' className={styles.quit}>Sair</a>
            </section>

            <TodoList />

        </main>

        <Modal />
    
    </>)
}