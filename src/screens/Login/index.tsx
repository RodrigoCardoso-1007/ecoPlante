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
import { SnackContext } from '../../contexts/snackProvider.context';
import IUserModel from '../../model/user.model';

export default function Login() {
  const navigate = useNavigate();
  const snack = useContext(SnackContext)
  const { updateUserData } = useContext(UserContext)

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function onPressLogin() {
    if (!validateFields()) return;

    setIsLoading(true);

    UserRequest().login({ email, password })
      .then((res) => {
        if (res.success && res.data) {

          const newUserData: IUserModel = {
            name: res.data.name,
            about: res.data.about,
            photo: res.data.img,
            email: email || '',
          }
          updateUserData(newUserData)
          navigate('/')
        } else
          throw new Error(res.message)
      }).catch((error) => {
        snack.addMessage('Não foi possível realizar o login')
      }).finally(() => {
        setIsLoading(false)
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
            <Button isLoading={isLoading} onClick={onPressLogin}>Entrar</Button>

            <div style={styles.containerButtonsText}>
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