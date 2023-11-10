"use client"

import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';

export default function TodoList({ user }) {

    const { data, isPending } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return await fetch(`http://localhost:3333/todoList/${user}`).then(res => res.json())
        }
    })

    return(<>
        <section>
            <ul className={styles.todoList}>
                
                {
                    isPending ?
                    <div className={styles.loading}>
                        <CircularProgress />
                    </div> :
                    data.map(e => {
                        return(<>
                            <li>
                                <CheckCircleOutlineIcon/>
                                <p>{e.todo_name}</p>
                                <DeleteIcon/>
                            </li>
                        </>)
                    })
                }

            </ul>
        </section>
    </>)
}