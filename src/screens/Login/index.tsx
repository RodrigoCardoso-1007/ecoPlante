import { Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoType from './../../assets/Images/logotype.svg'
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ButtonText from '../../components/ButtonText';
import styles from './styles';
import { UserRequest } from '../../modules/Network/User';
import { UserContext } from '../../contexts/user.context';
import { validateEmail } from '../../modules/ValidationsForm';

export default function Login() {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function onPressForgetPassword() {
    navigate('/trocarSenha')
  }

  function onPressLogin() {
    if (!validateFields()) return;

    UserRequest().login({ email, password })
      .then((res) => {
        updateUserData(res)
      }).catch((error) => {
        console.log("error", error)
      })
  }

  function onPressCreateAccount() {
    navigate('/cadastro')
  }

  function validateFields() {
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Email inválido')
      valid = false;
    }
    if (!password) {
      setPasswordError('Senha é obrigatório')
      valid = false
    }

    return valid;
  }

  function changeEmail(value: string) {
    setEmail(value)
    setEmailError('')
  }

  function changePassword(value: string) {
    setPassword(value);
    setPasswordError('')
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
              errorMessage={emailError}
              onChange={changeEmail} />

            <Input
              id='senha'
              label='Senha'
              value={password}
              type='text'
              placeholder='Digite sua senha'
              errorMessage={passwordError}
              hidePassword={hidePassword}
              onChange={changePassword}
              onCLickPasswordVisibility={() => setHidePassword(value => !value)} />
          </div>

          <div style={styles.containerButtons}>
            <Button onClick={onPressLogin}>Entrar</Button>

            <div style={styles.containerButtonsText}>
              <ButtonText
                principalText={'Esqueceu sua senha?'}
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