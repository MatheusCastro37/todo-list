"use client"

import styles from './page.module.css';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { useQuery, useMutation } from '@tanstack/react-query';

import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Link from 'next/link';

import { useRouter } from 'next/navigation';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.number().required(),
}).required();

export default function FormLogin() {

    const route = useRouter();

    const { isError } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {

            const res = await fetch(`https://api-todo-nodejs.onrender.com`, {credentials: 'include'})
            
            if(res.ok) {
                route.push('/todoList')
            } else {
                throw new Error()
            }
            
        }
    })

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useMutation({
        mutationFn: async (loginUser) => {

            const res = await fetch('https://api-todo-nodejs.onrender.com', {
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

        {

            isError ?

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <label className={styles.label}>E-MAIL:</label>
                <TextField {...register('email')} id="outlined-basic" label="Digite seu E-mail..." variant="outlined" />
                {errors?.email?.type === "required" ? <p className={styles.errorForm}>*Campo Obrigatorio</p> : null}

                <label className={styles.label}>SENHA:</label>
                <TextField {...register('password')} id="outlined-basic" label="Digite sua Senha" variant="outlined" />
                {errors?.password?.type === "typeError" ? <p className={styles.errorForm}>*A senha precisa ser numerica</p> : null}

                <button className={styles.btn} type='submit'>{mutation.isPending ? <CircularProgress className={styles.loadingMutation} /> : <>Enviar</>}</button>
                <p className={styles.createUser}>Não possue conta?<Link className={styles.link} href='/createUser'>Criar Conta</Link></p>
                
                {mutation.isError ? <p className={styles.loginError}>{mutation.error.message}</p> : null}

            </form>
            :
            <div className={styles.checkCookie}>
                <CircularProgress />
            </div>
        }

    </>)
}