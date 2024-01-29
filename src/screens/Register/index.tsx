import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useRef, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ImageContainer from "../../components/ImageContainer";
import { Grid } from "@mui/material";
import Input from "../../components/Input";
import DefaultPlant from './../../assets/Images/defaultPlant.svg';

export default function CreateRegister() {
  const { state } = useLocation();
  const register = state?.register
  const navigate = useNavigate();

  const inputFile = useRef(null)

  const [rega, setRega] = useState(register?.rega || '')
  const [poda, setPoda] = useState(register?.poda || '')
  const [adubacao, setAdubacao] = useState(register?.adubacao || '')
  const [photo, setPhoto] = useState(register?.photo || DefaultPlant)

  const [regaError, setRegaError] = useState('')
  const [podaError, setPodaError] = useState('')
  const [adubacaoError, setAdubacaoError] = useState('')

  function onPressSave() {
    if (!validateForm())
      return

  }

  function onPressGoBack() {
    navigate(-1)
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

  function validateForm() {
    let valid = true;

    if (!poda) {
      setPodaError('Campo obrigatório')
      valid = false;
    }

    if (!rega) {
      setRegaError('Campo obrigatório')
      valid = false;
    }

    if (!adubacao) {
      setAdubacaoError('Campo obrigatório')
      valid = false;
    }

    return valid
  }

  function changePoda(value: string) {
    setPoda(value);
    setPodaError('')
  }

  function changeRega(value: string) {
    setRega(value);
    setRegaError('')
  }

  function changeAdubacao(value: string) {
    setAdubacao(value);
    setAdubacaoError('')
  }

  return (
    <div style={styles.globalContainer}>
      <Header />
      <div style={styles.container}>
        <Grid container item lg={8} md={8} sm={8} xs={10} style={styles.containerForm} >
          <Title styleProps={{ marginBottom: '16px' }}>
            Registro da planta
          </Title>
          <ImageContainer
            src={photo}
            styleProps={{ marginBottom: '16px' }}
            onClick={onPressPhoto}
          />

          <input
            type='file'
            id='file'
            onChange={changePhoto}
            ref={inputFile}
            style={{ display: 'none' }}
            accept=".jpg,.jpeg" />

          <Grid container spacing={2}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Poda"}
                value={poda}
                label={"Poda*"}
                type={"text"}
                placeholder={"Qual foi a poda?"}
                errorMessage={podaError}
                onChange={changePoda} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Rega"}
                value={rega}
                label={"Rega*"}
                type={"text"}
                placeholder={"Quanto foi a última rega?"}
                errorMessage={regaError}
                onChange={changeRega} />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <Input
                id={"Adubacao*"}
                value={adubacao}
                label={"Adubação"}
                type={"text"}
                placeholder={"Qual foi a adubação?"}
                errorMessage={adubacaoError}
                onChange={changeAdubacao} />
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
