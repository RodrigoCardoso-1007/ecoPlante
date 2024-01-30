import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useContext, useRef, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ImageContainer from "../../components/ImageContainer";
import { Grid } from "@mui/material";
import Input from "../../components/Input";
import DefaultPlant from './../../assets/Images/defaultPlant.svg';
import { RegisterRequest } from "../../modules/Network/Register";
import { InRegister } from "../../modules/Network/Register/plantRequest.interface";
import { SnackContext } from "../../contexts/snackProvider.context";

export default function CreateRegister() {
  const { state } = useLocation();
  const register = state?.register
  const idPlant = state?.idPlant

  const navigate = useNavigate();
  const snack = useContext(SnackContext)

  const inputFile = useRef(null)

  const [isLoading, setIsLoading] = useState(false);
  const [rega, setRega] = useState(register?.rega || '')
  const [poda, setPoda] = useState(register?.poda || '')
  const [adubacao, setAdubacao] = useState(register?.adubacao || '')
  const [photo, setPhoto] = useState(register?.photo || DefaultPlant)
  const [description, setDescription] = useState(register?.decricao)

  const [regaError, setRegaError] = useState('')
  const [podaError, setPodaError] = useState('')
  const [adubacaoError, setAdubacaoError] = useState('')

  function onPressSave() {
    if (!validateForm())
      return
    setIsLoading(true)
    if (register)
      updateRegister()
    else
      createRegister()
  }

  function createRegister() {
    const plantObj: InRegister = {
      pruning: poda,
      watering: rega,
      img: photo,
      fertilizing: adubacao,
      description: description,
      idPlant: idPlant
    }

    RegisterRequest().create(plantObj)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Criado com sucesso!')
          navigate(-1)
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function updateRegister() {
    RegisterRequest().update(description, register.idRegister)
      .then((res) => {
        if (res.success) {
          snack.addMessage('Atualizado com sucesso!')
          navigate(-1)
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function onPressDelete() {
    RegisterRequest().deleteItem(register.idRegister)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Apagado com sucesso!')
          navigate(-1)
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
                disabled={!!register}
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
                disabled={!!register}
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
                disabled={!!register}
                placeholder={"Qual foi a adubação?"}
                errorMessage={adubacaoError}
                onChange={changeAdubacao} />
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
          <Grid item lg={3.5} md={3.5} sm={6} xs={12}>
            <Button children={"Voltar"} isLoading={isLoading} onClick={onPressGoBack} />
          </Grid>

          <Grid item lg={3.5} md={3.5} sm={6} xs={12}>
            <Button children={"Salvar"} isLoading={isLoading} onClick={onPressSave} />
          </Grid>

          {register &&
            <Grid item lg={3.5} md={3.5} sm={6} xs={12}>
              <Button children={"Deletar"} isLoading={isLoading} onClick={onPressDelete} />
            </Grid>
          }
        </Grid>
      </div>
    </div>
  )
}
