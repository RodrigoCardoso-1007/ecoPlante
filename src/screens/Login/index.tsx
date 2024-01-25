import { Grid } from '@mui/material';
import LogoType from './../../assets/images/logotype.svg'
import styles from './styles';
import Title from '../../components/tittle';
import Button from '../../components/button';
import ButtonText from '../../components/buttonText';
import Input from '../../components/input';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  function onPressForgetPassword() {
    console.log("onPressForgetPassword")
  }

  function onPressLogin() {
    console.log("onPressLogin")
  }

  function onPressCreateAccount() {
    console.log("onPressCreateAccount")
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