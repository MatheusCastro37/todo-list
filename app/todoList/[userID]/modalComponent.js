"use client"

import { useState } from 'react';

import styles from './page.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import LinearProgress from '@mui/material/LinearProgress';

import { useMutation } from '@tanstack/react-query';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    todo: yup.string().max(100).required(),
}).required()

export default function Modal({ todoUser }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        const lockedScroll = document.querySelector('body')
        const lowBrightness = document.querySelector('main')
        lockedScroll.style.overflowY = 'hidden'
        lowBrightness.style.filter = 'brightness(0.5)'
        setOpen(true);
    }
        const handleClose = () => {
        setValue('todo', '')
        mutation.reset()
        setOpen(false);
        const unlockedScroll = document.querySelector('body')
        const normalBrightness = document.querySelector('main')
        unlockedScroll.style.overflowY = 'scroll'
        normalBrightness.style.filter = 'brightness(1)'
    }

    const mutation = useMutation({
        mutationFn: async (todo) => {
            await fetch(`http://localhost:3333/todoList/${todoUser}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
        }
    })

    const { register, handleSubmit, setValue ,formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return(<>
        { open ?
        <div className={styles.containerAddTodoModal}>
            <section className={styles.addTodoModal}>
                <button onClick={handleClose}><ClearIcon /></button>
                <label>Nome da Tarefa:</label>
                <input {...register("todo")} placeholder='Digite uma tarefa...' />
                {errors?.todo?.type === 'max' ? <p>Digite no maximo 100 caracteres!</p> : null}

                <div className={styles.btnGroup}>
                    <button onClick={handleSubmit(onSubmit)}>Adiconar <CheckIcon /></button>
                    <button onClick={handleClose}>Ainda não <ClearIcon /></button>
                </div>
                
                <div>
                    {mutation.isPending ?
                        <>
                            <p>adicionando tarefa...</p>
                            <LinearProgress />
                        </>
                        :
                        <>
                            {mutation.isSuccess ? <p className={styles.todoSuccess}>tarefa adicionada!</p> : null}

                            {mutation.isError ? <p className={styles.todoFailed}>Erro ao adicionar a tarefa!</p> : null}
                        </>
                    }
                    
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