import type {NextPage} from 'next'
import {useDispatch, useSelector} from "react-redux";
import styles from '../styles/Login.module.css'

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  return (
    <div className={styles.container}>

    </div>
  )
}

export default Login
