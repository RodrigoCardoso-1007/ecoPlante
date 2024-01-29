import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useRef, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import ImageContainer from "../../components/ImageContainer";
import { Grid, Accordion, AccordionSummary, Button as ButtonMaterial } from "@mui/material";
import { ExpandMore, BorderColor } from '@mui/icons-material';
import Input from "../../components/Input";
import IPlantModel from "../../model/plant.model";
import { format } from 'date-fns'
import colors from "../../styles/colors";
import IRegisterModel from "../../model/register.model";
import DefaultPlant from './../../assets/Images/defaultPlant.svg';

export default function CreatePlant() {
  const { state } = useLocation();
  const plant: IPlantModel = state?.plant;
  const navigate = useNavigate();

  const inputFile = useRef(null)

  const [name, setName] = useState(plant?.namePlant || '');
  const [difficulty, setDifficulty] = useState(plant?.difficulty || '');
  const [local, setLocal] = useState(plant?.local || '');
  const [date, setDate] = useState(plant?.datePlant || '');
  const [description, setDescription] = useState(plant?.description || '');
  const [photo, setPhoto] = useState(plant?.photo || DefaultPlant);

  function onPressSave() {
    console.log('location', state)
  }

  function onPressGoBack() {
    navigate('/')
  }

  function onPressDelete() {
    console.log('onPressDelete')
  }

  function onPressEditRegister(register: IRegisterModel) {
    navigate('/register', { state: { register } })
  }

  function onPressNewRegister() {
    navigate('/register', { state: { plant } })
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

  function renderRegister(register: IRegisterModel) {
    return (
      <Accordion style={styles.containerRegister} key={register.idRegister}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          title="teste"
        >
          <div style={styles.containerRegisterTitle}>
            Registro dia: {format(register.dateRegister, 'dd/MM/yyyy hh:mm')}

            <ButtonMaterial onClick={() => onPressEditRegister(register)}>
              <BorderColor style={{ color: colors.primary.dark }} />
            </ButtonMaterial>
          </div>
        </AccordionSummary>

        <Grid container spacing={2} style={styles.contentRegister}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Input
              disabled
              id={"Poda"}
              value={register.poda}
              label={"Poda"}
              type={"text"}
              placeholder={"Qual foi a poda?"} />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Input
              disabled
              id={"Rega"}
              value={register.rega}
              label={"Rega"}
              type={"text"}
              placeholder={"Quanto foi a última rega?"} />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Input
              disabled
              id={"Adubacao"}
              value={register.adubacao}
              label={"Adubação"}
              type={"text"}
              placeholder={"Qual foi a adubação?"} />
          </Grid>
        </Grid>
      </Accordion>
    )
  }

  return (
    <div style={styles.globalContainer}>
      <Header />
      <div style={styles.container}>
        <Grid container item lg={8} md={8} sm={8} xs={10} style={styles.containerForm} >
          <Title styleProps={{ marginBottom: '16px' }}>
            Dados da planta
          </Title>

          <ImageContainer
            styleProps={{ marginBottom: '16px' }}
            src={photo}
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
                value={format(date, 'yyyy-MM-dd')}
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
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button children={"Voltar"} onClick={onPressGoBack} />
          </Grid>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button children={"Salvar"} onClick={onPressSave} />
          </Grid>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button children={"Novo Registro"} onClick={onPressNewRegister} />
          </Grid>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button children={"Deletar"} onClick={onPressDelete} />
          </Grid>
        </Grid>

        <Grid
          container item
          lg={8} md={8} sm={8} xs={10}
          rowSpacing={1}
          style={{ ...styles.containerButtons, ...{ marginTop: '16px' } }}>
          {plant.registerList?.map(renderRegister)}
        </Grid>
      </div>
    </div>
  )
}