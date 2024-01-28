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
import { UserContext } from '../../contexts/user.context';

export default function CreateAccount() {
  const navigate = useNavigate();
  const { updateUserData } = useContext(UserContext)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  function onPressLogin() {
    navigate('/')
  }

  function onPressCreate() {
    UserRequest().login({ email, password })
      .then((res) => {
        localStorage.setItem('userData', JSON.stringify(res));
        updateUserData(JSON.stringify(res))
        navigate('/')
      }).catch((error) => {
        console.log("error", error)
      })
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
              placeholder='Digite seu email'
              onChange={(value) => setName(value)} />

            <Input
              id='email'
              label='Email'
              value={email}
              type={'text'}
              placeholder='Digite seu email'
              onChange={(value) => setEmail(value)} />

            <Input
              id='password'
              label='Senha'
              value={password}
              type='text'
              placeholder='Digite sua senha'
              hidePassword={hidePassword}
              onChange={(value) => setPassword(value)}
              onCLickPasswordVisibility={() => setHidePassword(value => !value)} />

            <Input
              id='confirmPassword'
              label='Confirmar senha'
              value={confirmPassword}
              type='text'
              placeholder='Confirme sua senha'
              hidePassword={hideConfirmPassword}
              onChange={(value) => setConfirmPassword(value)}
              onCLickPasswordVisibility={() => setHideConfirmPassword(value => !value)} />
          </div>

          <div style={styles.containerButtons}>
            <Button onClick={onPressCreate}>Cadastrar</Button>

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