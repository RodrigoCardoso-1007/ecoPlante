import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import LogoType from './../../assets/Images/logotype.svg'
import Input from '../../components/Input';
import Title from '../../components/Title';
import Button from '../../components/Button';
import ButtonText from '../../components/ButtonText';
import styles from './styles';
import { UserRequest } from '../../modules/Network/User';
import { validateEmail } from '../../modules/ValidationsForm';
import { SnackContext } from '../../contexts/snackProvider.context';

export default function CreateAccount() {
  const navigate = useNavigate();
  const snack = useContext(SnackContext)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function onPressLogin() {
    navigate('/')
  }

  function onPressCreate() {
    if (!validateFields())
      return

    setIsLoading(true);

    UserRequest().create({ email, password, name })
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Cadastrado com sucesso')
          navigate('/')
        } else
          throw new Error(res.message)
      }).catch((error) => {
        snack.addMessage('Não foi possível cadastrar usuário')
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function validateFields() {
    let valid = true;
    if (!name) {
      setNameError('Nome é obrigatório')
      valid = false
    }
    if (!validateEmail(email)) {
      setEmailError('Email inválido')
      valid = false;
    }
    if (!password) {
      setPasswordError('Senha é obrigatório')
      valid = false
    }
    if (!confirmPassword) {
      setConfirmPasswordError('COnfirmação de senha é obrigatório')
      valid = false
    }
    if (password !== confirmPassword) {
      setPasswordError('As senhas estão diferentes')
      setConfirmPasswordError('As senhas estão diferentes')
      valid = false;
    }

    return valid;
  }

  function changeName(value: string) {
    setName(value);
    setNameError('');
  }

  function changeEmail(value: string) {
    setEmail(value);
    setEmailError('');
  }

  function changePassword(value: string) {
    setPassword(value);
    setPasswordError('');
  }

  function changeConfirmPassword(value: string) {
    setConfirmPassword(value);
    setConfirmPasswordError('');
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
            <Title>Inscreva-se</Title>
          </div>

          <div style={styles.containerInputs}>
            <Input
              id='name'
              label='Nome'
              value={name}
              type={'text'}
              placeholder='Digite seu nome'
              errorMessage={nameError}
              onChange={changeName} />

            <Input
              id='email'
              label='Email'
              value={email}
              type={'text'}
              placeholder='Digite seu email'
              errorMessage={emailError}
              onChange={changeEmail} />

            <Input
              id='password'
              label='Senha'
              value={password}
              type='text'
              placeholder='Digite sua senha'
              hidePassword={hidePassword}
              errorMessage={passwordError}
              onChange={changePassword}
              onCLickPasswordVisibility={() => setHidePassword(value => !value)} />

            <Input
              id='confirmPassword'
              label='Confirmar senha'
              value={confirmPassword}
              type='text'
              placeholder='Confirme sua senha'
              hidePassword={hideConfirmPassword}
              errorMessage={confirmPasswordError}
              onChange={changeConfirmPassword}
              onCLickPasswordVisibility={() => setHideConfirmPassword(value => !value)} />
          </div>

          <div style={styles.containerButtons}>
            <Button isLoading={isLoading} onClick={onPressCreate}>Cadastrar</Button>

            <div style={styles.containerButtonsText}>
              <ButtonText
                complementeText={'Já se cadastrou? '}
                principalText={'Vá para o login'}
                onClick={onPressLogin}
              />
            </div>
          </div>
        </div>
      </Grid>

    </Grid >
  )
}