import styles from './page.module.css';
import TodoList from './todoListComponent';
import Modal from './modalComponent';

export default function TodoPage({ params }) {

    return(<>

        <main className={styles.container}>
            <section className={styles.firstLayer}>
                <h1>ToDo List</h1>
                <a href='#' className={styles.quit}>Sair</a>
            </section>

            <TodoList user={params.userID}/>

        </main>

        <Modal />
    
    </>)
}