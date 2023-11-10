"use client"

import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { useQuery } from '@tanstack/react-query';

export default function TodoList({ user }) {

    const { data } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return await fetch(`http://localhost:3333/todoList/${user}`).then(res => res.json())
        }
    })
    
    console.log(data)

    return(<>
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
    </>)
}