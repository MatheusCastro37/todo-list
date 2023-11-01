"use client"

import styles from './page.module.css';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import TextField from '@mui/material/TextField';
import Link from 'next/link';

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.number().required(),
}).required();

export default function FormLogin() {

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function onSubmit(d) {
        console.log(d)
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

        </form>
    </>)
}