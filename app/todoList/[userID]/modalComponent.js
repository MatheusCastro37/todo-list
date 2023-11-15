"use client"

import { useState } from 'react';

import styles from './page.module.css';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

import { useMutation } from '@tanstack/react-query';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    todo: yup.string().max(100).required(),
}).required()

export default function Modal({ todoUser }) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const { register, handleSubmit, formState: { errors } } = useForm({
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
            </section>
        </div>
        :
        null}
        <section className={styles.addTodo}>
            <button onClick={handleOpen}><AddIcon /></button>
        </section>
    </>)
}