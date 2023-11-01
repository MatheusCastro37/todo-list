import styles from './page.module.css';

import Image from "next/image";
import img_login from '../public/img_login.jpg';
import img_icon from '../app/icon.ico';
import FormLogin from './formLoginComponent';

export const metadata = {
  title: 'Lista de Tarefas - Logar',
  description: 'Logue e veja suas tarefas!',
  icons: {
    icon: './icon.ico',
  }
}

export default function Home() {

  return (<>
    <main className={styles.main}>
      <Image className={styles.img_login} src={img_login} height={515} width={450} style={{objectFit: 'cover'}} alt='imagem de login' />

      <Image className={styles.iconLogin} src={img_icon} height={120} width={120} alt='imagem de login' />

      <div className={styles.login}>
        
        <h2 className={styles.title}>Login</h2>
        <b>Logue e veja suas tarefas!</b>
        <hr/>

        <FormLogin />
      
      </div>
    </main>
  </>)
}