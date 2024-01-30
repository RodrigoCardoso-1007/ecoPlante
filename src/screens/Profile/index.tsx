import { useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useContext, useRef, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Grid } from "@mui/material";
import Input from "../../components/Input";
import Avatar from "../../components/Avatar";
import { UserContext } from "../../contexts/user.context";
import IUserModel from "../../model/user.model";
import { UserRequest } from "../../modules/Network/User";
import { SnackContext } from "../../contexts/snackProvider.context";
import { InUpdate } from "../../modules/Network/User/userRequest.interface";


export default function Profile() {
  const { userData, updateUserData } = useContext(UserContext)
  const navigate = useNavigate();
  const snack = useContext(SnackContext)

  const inputFile = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState(userData?.name || '')
  const [about, setAbout] = useState(userData?.about || '')
  const [photo, setPhoto] = useState(userData?.photo || '')

  function onPressSave() {

    const data: InUpdate = {
      name: name,
      about: about,
      img: photo,
    }

    UserRequest().update(data)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Atualizado com sucesso!')

          const newUserData: IUserModel = {
            name: name,
            about: about,
            photo: photo,
            email: userData?.email || '',
          }

          updateUserData(newUserData);
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function onPressGoBack() {
    navigate('/')
  }

  function onPressPhoto() {
    // @ts-ignore
    if (inputFile) inputFile.current.click();
  }

  function changePhoto(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof (reader.result) === 'string')
          setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div style={styles.globalContainer}>
      <Header />
      <div style={styles.container}>
        <Grid container item lg={8} md={8} sm={8} xs={10} style={styles.containerForm} >
          <Title styleProps={{ marginBottom: '16px' }}>
            Perfil
          </Title>

          <div style={styles.containerPhoto}>
            <Avatar size={100} src={photo} onClick={onPressPhoto} />
            <p style={styles.email}>{userData?.email || ''}</p>
          </div>

          <input
            type='file'
            id='file'
            onChange={changePhoto}
            ref={inputFile}
            style={{ display: 'none' }}
            accept='image/*' />

          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Input
                id={"name"}
                value={name}
                label={"Nome"}
                type={"text"}
                placeholder={"Digite seu nome"}
                onChange={(value) => setName(value)} />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Input
                id={"about"}
                value={about}
                label={"Sobre"}
                type={"text"}
                multiline
                placeholder={"Conte sobre você"}
                onChange={(value) => setAbout(value)} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container item
          lg={8} md={8} sm={8} xs={10}
          rowSpacing={1}
          style={styles.containerButtons}>
          <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}>
            <Button children={"Voltar"} onClick={onPressGoBack} />
          </Grid>
          <Grid item lg={5.5} md={5.5} sm={5.5} xs={12}>
            <Button children={"Salvar"} onClick={onPressSave} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}