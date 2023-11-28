"use client"

import styles from './page.module.css';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery, useMutation } from '@tanstack/react-query';

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

    const mutation = useMutation({
        mutationFn: async (todoID) => {
            const res = await fetch('http://localhost:3333/todoList', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoID)
            })

            if(res.ok) {
                return
            } else {
                throw new Error('Erro ao deletar tarefa!')
            }
            
        }
    })

    const deleteTodo = () => {
        
        const buttonDel = document.querySelectorAll('.deleteBtn')

        buttonDel.forEach(e => {
            e.addEventListener('click', () => {
                const todoID = e.id
                mutation.mutate(todoID)
            })
        })

    }

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
                                    <button className='deleteBtn' id={e.todo_id} onClick={deleteTodo}><DeleteIcon/></button>
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