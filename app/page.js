"use client"

import styles from './page.module.css';

import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import Image from "next/image";
import img_login from '../public/img_login.jpg';
import img_icon from '../app/icon.ico';
import Link from 'next/link';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.number().positive().integer().required(),
}).required();

export default function Home() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (<>
    <main className={styles.main}>
      <Image className={styles.img_login} src={img_login} height={515} width={450} style={{objectFit: 'cover'}} alt='imagem de login' />

      <Image className={styles.iconLogin} src={img_icon} height={120} width={120} alt='imagem de login' />

      <div className={styles.login}>
        
        <h2 className={styles.title}>Login</h2>
        <b>Logue e veja suas tarefas!</b>
        <hr/>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

          <label className={styles.label}>E-MAIL:</label>
          <TextField {...register('email')} id="outlined-basic" label="Digite seu E-mail..." variant="outlined" />

          <label className={styles.label}>SENHA:</label>
          <TextField {...register('password')} id="outlined-basic" label="Digite sua Senha" variant="outlined" />

          <input className={styles.btn} type='submit' onClick={() => console.log(errors)}/>
          <p className={styles.createUser}>Não possue conta?<Link className={styles.link} href='/createUser'>Criar Conta</Link></p>

        </form>
      
      </div>
    </main>
  </>)
}