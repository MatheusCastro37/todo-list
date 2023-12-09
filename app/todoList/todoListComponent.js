"use client"

import { useState } from 'react';

import styles from './page.module.css';

import { queryClient } from '../layout';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery, useMutation } from '@tanstack/react-query';

export default function TodoList() {

    const [checked, setChecked] = useState(false)

    const checkTodo = (e) => {

        const btn = e.target.parentElement

        if(!checked) {
            
            btn.style.backgroundColor = 'green'
            setChecked(true)

        } else {

            btn.style.backgroundColor = 'transparent'
            setChecked(false)

        }
        
    }

    const { data, error, isPending, isError, isSuccess } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {

            const res = await fetch(`https://api-todo-nodejs.onrender.com/todoList`, {credentials: 'include'})
            
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
            const res = await fetch('https://api-todo-nodejs.onrender.com/todoList', {
                method: 'delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todoID)
            })

            if(res.ok) {
                queryClient.invalidateQueries({ queryKey: ['todos'] })
                alert('Tarefa deletada com sucesso!')
            } else {
                alert('Erro ao deletar tarefa!')
            }
            
        }
    })

    const deleteTodo = (e) => {

        const btnDelete = e.target.parentElement.parentElement
        const todoID = btnDelete.id

        mutation.mutate(todoID)

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
                                    <button onClick={checkTodo}><CheckCircleOutlineIcon/></button>
                                    {checked ? <s>{e.todo_name}</s> : <p>{e.todo_name}</p>}
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