import styles from './page.module.css'
import FormCreate from './formCreateComponent';

import Link from "next/link";

export const metadata = {
    title: 'Lista de Tarefas - Criar',
    description: 'Crie uma nova conta e crie suas tarefas!',
    icons: {
      icon: './icon.ico',
    }
  }

export default function CreateUser() {

    return(<>
        <main className={styles.main}>

            <h2>Crie sua conta, e organize suas tarefas</h2>

            <FormCreate />

            <p>Possui uma conta?</p>
            <Link className={styles.login} href="/">Logue aqui!</Link>

        </main>
    </>)
}