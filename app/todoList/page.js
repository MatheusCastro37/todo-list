import styles from './page.module.css';
import TodoList from './todoListComponent';
import Modal from './modalComponent';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function TodoPage() {

    const cookieAPI = cookies().has('tokenAPI')

    return(<>

        {
            cookieAPI ?
            <>
                <main className={styles.container}>
                    <section className={styles.firstLayer}>
                        <h1>ToDo List</h1>
                        <a href='#' className={styles.quit}>Sair</a>
                    </section>

                    <TodoList />

                </main>

                <Modal />
            </>
            : redirect('/')
        }
    
    </>)
}