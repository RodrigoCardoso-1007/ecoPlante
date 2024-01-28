import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useContext, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { Grid } from "@mui/material";
import Input from "../../components/Input";
import Avatar from "../../components/Avatar";
import { UserContext } from "../../contexts/user.context";
import IUserModel from "../../model/user.model";


export default function Profile() {
  const { userData, updateUserData } = useContext(UserContext)
  const { state } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.name || '')
  const [about, setAbout] = useState(userData?.about || '')
  const [photo, setPhoto] = useState(userData?.photo || '')
  const [email, setEmail] = useState(userData?.email || '')

  function onPressSave() {
    const newUserData: IUserModel = {
      name: name,
      about: about,
      photo: photo,
      email: email,
      idUser: userData?.idUser || 0
    }

    updateUserData(newUserData)
    // UserCOntrole.updateUser
  }

  function onPressGoBack() {
    navigate('/')
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
            <Avatar size={100}
              src="https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg"
            />
            <p style={styles.email}>{email}</p>
          </div>

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