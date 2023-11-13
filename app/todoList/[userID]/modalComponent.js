"use client"

import styles from './page.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

export default function Modal() {
    return(<>
        <section id='modal' className={styles.addTodoModal}>
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