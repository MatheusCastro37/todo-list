import styles from './page.module.css';

import TextField from '@mui/material/TextField';

import Image from "next/image";
import img_login from '../public/img_login.jpg';
import img_icon from '../app/icon.ico';
import Link from 'next/link';

export default function Home() {
  return (<>
    <main className={styles.main}>
      <Image className={styles.img_login} src={img_login} height={515} width={450} style={{objectFit: 'cover'}} />

      <Image className={styles.iconLogin} src={img_icon} height={120} width={120} />

      <div className={styles.login}>
        
        <h2 className={styles.title}>Login</h2>
        <b>Logue e veja suas tarefas!</b>
        <hr/>
        <form className={styles.form}>
          <label className={styles.label}>E-MAIL:</label>
          <TextField id="outlined-basic" label="Digite seu E-mail..." variant="outlined" />
          <label className={styles.label}>SENHA:</label>
          <TextField id="outlined-basic" label="Digite sua Senha" variant="outlined" />
        
          <button className={styles.btn}>Login</button>
          <p className={styles.createUser}>Não possue conta?<Link className={styles.link} href='/'>Criar Conta</Link></p>

        </form>
      
      </div>
    </main>
  </>)
}