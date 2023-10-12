import Image from 'next/image';
import styles from './styles.module.css';
import img from '../../../public/todolist.png';

export const Header = () => {
    return (<>
    <header className={styles.header}>
        <div className={styles.header_div}>
            <Image src={img} alt='Logo do site' width={100} height={100}></Image>
        </div>
    </header>
</>)
}