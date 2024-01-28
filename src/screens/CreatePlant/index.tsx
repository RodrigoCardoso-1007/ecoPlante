import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ImageContainer from "../../components/ImageContainer";
import { Grid } from "@mui/material";
import Input from "../../components/Input";


export default function CreatePlant() {
  const { state } = useLocation();
  const plant = state?.plant;
  const navigate = useNavigate();

  const [name, setName] = useState(plant?.name || '');
  const [difficulty, setDifficulty] = useState(plant?.difficulty || '');
  const [local, setLocal] = useState(plant?.local || '');
  const [date, setDate] = useState(plant?.date || '');
  const [description, setDescription] = useState(plant?.description || '');
  const [photo, setPhoto] = useState(plant?.photo || '');

  function onPressSave() {
    console.log('location', state)
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
            Dados da planta
          </Title>
          <ImageContainer styleProps={{ marginBottom: '16px' }}
            src="https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg"
          />

          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"name"}
                value={name}
                label={"Nome comum"}
                type={"text"}
                placeholder={"Digite o nome da planta"}
                onChange={(value) => setName(value)} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"difficulty"}
                value={difficulty}
                label={"Dificuldade"}
                type={"text"}
                placeholder={"Qual o nível de dificuldade de cuidar da planta?"}
                onChange={(value) => setDifficulty(value)} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"local"}
                value={local}
                label={"Local"}
                type={"text"}
                placeholder={"Onde a planta foi está?"}
                onChange={(value) => setLocal(value)} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"date"}
                value={date}
                label={"Data plantio"}
                type={"date"}
                placeholder={"Qual foi a data de plantio?"}
                onChange={(value) => setDate(value)} />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Input
                id={"description"}
                value={description}
                label={"Descrição da planta"}
                type={"text"}
                multiline
                placeholder={"Digite a descrição da planta"}
                onChange={(value) => setDescription(value)} />
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