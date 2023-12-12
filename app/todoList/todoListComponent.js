"use client"

import styles from './page.module.css';

import { queryClient } from '../layout';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery, useMutation } from '@tanstack/react-query';

export default function TodoList() {

    const todoDone = (e) => {

        const expectedBtn = e.target.parentElement
        
        if(expectedBtn.nodeName === 'svg') {
            const btn = expectedBtn.parentElement
        
            if(btn.id === 'false') {
                btn.style.backgroundColor = 'green'
                btn.id = 'true'
            } else {
                btn.style.backgroundColor = 'transparent'
                btn.id = 'false'
            }

        } else {

            if(expectedBtn.id === 'false') {
                expectedBtn.style.backgroundColor = 'green'
                expectedBtn.id = 'true'
            } else {
                expectedBtn.style.backgroundColor = 'transparent'
                expectedBtn.id = 'false'
            }
            
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
                                    <button id='false' onClick={todoDone}><CheckIcon/></button>
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