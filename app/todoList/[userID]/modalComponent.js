"use client"

import { useState } from 'react';

import styles from './page.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

export default function Modal() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false); 

    return(<>
        { open ?
        <div className={styles.containerAddTodoModal}>
            <section className={styles.addTodoModal}>
                <button onClick={handleClose}><ClearIcon /></button>
                <label>Nome da Tarefa:</label>
                <input placeholder='Digite uma tarefa...' />

                <div className={styles.btnGroup}>
                    <button>Adiconar <CheckIcon /></button>
                    <button onClick={handleClose}>Ainda não <ClearIcon /></button>
                </div>
            </section>
        </div>
        :
        null}
        <section className={styles.addTodo}>
            <button onClick={handleOpen}><AddIcon /></button>
        </section>
    </>)
}