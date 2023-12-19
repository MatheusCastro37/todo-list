import styles from './page.module.css';
import TodoList from './todoListComponent';
import Modal from './modalComponent';
import BtnLogOff from './btnLogOffComponent';

export const metadata = {
    title: 'Lista de Tarefas',
    description: 'Aqui está sua lista de tarefas!',
    icons: {
      icon: './icon.ico',
    }
  }

export default function TodoPage() {

    return(<>

        <main className={styles.container}>
            <section className={styles.firstLayer}>
                <h1>ToDo List</h1>
                <BtnLogOff />
            </section>

            <TodoList />

        </main>

        <Modal />
    
    </>)
}