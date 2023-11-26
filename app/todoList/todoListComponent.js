"use client"

import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';

export default function TodoList() {

    const { data, isPending, isError, isSuccess } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            return await fetch(`http://localhost:3333/todoList`, {credentials: 'include'}).then(res => res.json())
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
                    
                    <>
                    {isSuccess ? 
                        data.map(e => {
                            return(<>
                                <li>
                                    <button><CheckCircleOutlineIcon/></button>
                                    <p>{e.todo_name}</p>
                                    <button><DeleteIcon/></button>
                                </li>
                            </>)
                        }) : null
                    }

                    {isError ? <p className={styles.errorGetTodo}>Erro ao fazer a busca de tarefas!</p> : null}

                    </>
                }

            </ul>
        </section>
    </>)
}