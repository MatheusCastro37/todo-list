"use client"

import styles from "./page.module.css";

import { useQuery, useMutation } from '@tanstack/react-query';

import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export default function FormCreate() {

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            return fetch('http://localhost:3333/createUser').then((res) => res.json())
        }
    })

    const schema = yup.object({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.number().positive().integer().required(),
        passwordwatch: yup.number().positive().integer().required().test({
            name : 'validate',
            exclusive: true,
            params: {},
            message: 'passwordwatch is not valid',
            test: (value) => value === parseInt(passwordConfirmation),
        }),
    }).required();

    const { register, handleSubmit, watch, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const passwordConfirmation = watch('password')

    const mutation = useMutation({
        mutationFn: async (newUser) => {
            await fetch('http://localhost:3333/createUser', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
        }
    })

    const onSubmit = (dataForm) => {

        const verifiedUsers = data.filter(e => e.user_email === dataForm.email)
        
        if(verifiedUsers.length === 0) {
            mutation.mutate(dataForm)
            window.open('/', '_self')
        }else{
            alert('Este email ja esta cadastro!')
        }

    }

    return(<>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

            <label className={styles.label} >Nome Completo:</label>
            <TextField {...register('name')} id="outlined-basic" label="Digite seu Nome..." variant="outlined" />

            <label className={styles.label} >E-mail:</label>
            <TextField {...register('email')} id="outlined-basic" label="Digite seu E-mail..." variant="outlined" />

            <label className={styles.label} >Senha:</label>
            <TextField {...register('password')} id="outlined-basic" label="Digite uma Senha..." variant="outlined" />

            <label className={styles.label} >Confirme a Senha:</label>
            <TextField {...register('passwordwatch')} id="outlined-basic" label="Digite sua Senha Novamente..." variant="outlined" />
            {errors?.passwordwatch?.type === 'typeError' ? <p>A senha precisa ser numerica</p> : null}
            {errors?.passwordwatch?.type === 'validate' ? <p>A senha não é compativel</p> : null}

            <input className={styles.btn} type="submit" aria-label="Criar" />

        </form>
    </>)
}