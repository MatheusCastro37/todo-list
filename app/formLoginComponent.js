"use client"

import styles from './page.module.css';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useMutation } from '@tanstack/react-query';

import TextField from '@mui/material/TextField';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.number().required(),
}).required();

export default function FormLogin() {

    const route = useRouter();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useMutation({
        mutationFn: async (loginUser) => {

            const res = await fetch('http://localhost:3333', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(loginUser)
            })

            if(res.ok) {
                route.push('/todoList')
            } else {
                throw new Error('Erro ao tentar realizar o login.')
            }

        }
    })

    const onSubmit = (data) => {
        mutation.mutate(data)
    }

    return(<>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <label className={styles.label}>E-MAIL:</label>
            <TextField {...register('email')} id="outlined-basic" label="Digite seu E-mail..." variant="outlined" />
            {errors?.email?.type === "required" ? <p className={styles.errorForm}>*Campo Obrigatorio</p> : null}

            <label className={styles.label}>SENHA:</label>
            <TextField {...register('password')} id="outlined-basic" label="Digite sua Senha" variant="outlined" />
            {errors?.password?.type === "typeError" ? <p className={styles.errorForm}>*A senha precisa ser numerica</p> : null}

            <input className={styles.btn} type='submit'/>
            <p className={styles.createUser}>Não possue conta?<Link className={styles.link} href='/createUser'>Criar Conta</Link></p>
            
            {mutation.isError ? <p className={styles.loginError}>{mutation.error.message}</p> : null}

        </form>
    </>)
}