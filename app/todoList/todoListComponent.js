"use client"

import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@tanstack/react-query';

export default function TodoList() {

    const { data, error, isPending, isError, isSuccess } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {

            const res = await fetch(`http://localhost:3333/todoList`, {credentials: 'include'})
            
            if(res.ok) {
                const data = res.json()
                return data
            } else {
                throw new Error('erro ao buscar tarefa!')
            }
            
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

                    {isError ? <p className={styles.errorGetTodo}>{error.message}</p> : null}

                    </>
                }

            </ul>
        </section>

    </>)
}