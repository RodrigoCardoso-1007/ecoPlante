import { Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoType from './../../assets/Images/logotype.svg'
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ButtonText from '../../components/ButtonText';
import styles from './styles';
import UserRequest from '../../modules/Network/User';
import { UserContext } from '../../contexts/user.context';

export default function Login() {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  function onPressForgetPassword() {
    navigate('/trocarSenha')
  }

  function onPressLogin() {
    UserRequest().login({ email, password })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res));
        updateUserData(JSON.stringify(res))
      }).catch((error) => {
        console.log("error", error)
      })
  }

  function onPressCreateAccount() {
    navigate('/cadastro')
  }

  return (
    <Grid container style={styles.containerGlobal}>
      <Grid
        container item lg={7} md={7} sm={12}
        style={styles.containerLogo}>
        <img
          src={LogoType}
          alt='Logo do projeto'
          style={styles.logo} />
      </Grid>

      <Grid
        container item lg={5} md={5} sm={12}
        style={styles.containerForm}>
        <div style={styles.containerItems}>
          <div style={styles.containerTitle}>
            <Title>Login</Title>
          </div>

          <div style={styles.containerInputs}>
            <Input
              id='email'
              label='Email'
              value={email}
              type={'text'}
              placeholder='Digite seu email'
              onChange={(value) => setEmail(value)} />

            <Input
              id='senha'
              label='Senha'
              value={password}
              type='text'
              placeholder='Digite sua senha'
              hidePassword={hidePassword}
              onChange={(value) => setPassword(value)}
              onCLickPasswordVisibility={() => setHidePassword(value => !value)} />
          </div>

          <div style={styles.containerButtons}>
            <Button onClick={onPressLogin}>Entrar</Button>

            <div style={styles.containerButtonsText}>
              <ButtonText
                principalText={'Esqueceu seu senha?'}
                onClick={onPressForgetPassword}
              />
              <ButtonText
                complementeText={'Não tem conta? '}
                principalText={'Cadastre-se'}
                onClick={onPressCreateAccount}
              />
            </div>
          </div>
        </div>
      </Grid>
    </Grid >
  )
}