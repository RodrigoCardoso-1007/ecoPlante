import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ImageContainer from "../../components/ImageContainer";
import { Grid } from "@mui/material";
import Input from "../../components/Input";


export default function CreateRegister() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [rega, setRega] = useState(state?.register?.rega || '')
  const [poda, setPoda] = useState(state?.register?.poda || '')
  const [adubacao, setAdubacao] = useState(state?.register?.adubacao || '')

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
            Registro da planta
          </Title>
          <ImageContainer styleProps={{ marginBottom: '16px' }}
            src="https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg"
          />

          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Poda"}
                value={poda}
                label={"Poda"}
                type={"text"}
                placeholder={"Qual foi a poda?"}
                onChange={(value) => setPoda(value)} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Rega"}
                value={rega}
                label={"Rega"}
                type={"text"}
                placeholder={"Quanto foi a última rega?"}
                onChange={(value) => setRega(value)} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Adubacao"}
                value={adubacao}
                label={"Adubação"}
                type={"text"}
                placeholder={"Qual foi a adubação?"}
                onChange={(value) => setAdubacao(value)} />
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