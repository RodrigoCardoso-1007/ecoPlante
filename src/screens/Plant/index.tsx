import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles";
import Button from "../../components/Button";
import { useContext, useEffect, useRef, useState } from "react";
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
import { validateDate } from "../../modules/ValidationsForm";
import { PlantRequest } from "../../modules/Network/Plant";
import { InPlant } from "../../modules/Network/Plant/plantRequest.interface";
import { SnackContext } from "../../contexts/snackProvider.context";
import { RegisterRequest } from "../../modules/Network/Register";

export default function CreatePlant() {
  const { state } = useLocation();
  const plant: IPlantModel = state?.plant;
  const navigate = useNavigate();
  const snack = useContext(SnackContext)

  const inputFile = useRef(null)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState(plant?.namePlant || '');
  const [difficulty, setDifficulty] = useState(plant?.difficulty || '');
  const [local, setLocal] = useState(plant?.local || '');
  const [date, setDate] = useState(plant?.datePlant || null);
  const [description, setDescription] = useState(plant?.description || '');
  const [photo, setPhoto] = useState(plant?.photo || DefaultPlant);

  const [nameError, setNameError] = useState('');
  const [difficultyError, setDifficultyError] = useState('');
  const [localError, setLocalError] = useState('');
  const [dateError, setDateError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const [registerList, setRegisterList] = useState<IRegisterModel[]>([]);

  useEffect(getRegisterList, [])

  function onPressSave() {
    if (!validateForm())
      return
    setIsLoading(true)
    if (plant)
      updatePlant()
    else
      createPlant()
  }

  function createPlant() {
    const plantObj: InPlant = {
      name: name,
      desc: description,
      img: photo,
      local: local,
      care_level: difficulty,
      date_plant: date?.toString(),
    }

    PlantRequest().create(plantObj)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Criado com sucesso!')
          navigate('/')
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function updatePlant() {
    const plantObj: InPlant = {
      id: plant.idPlant,
      name: name,
      desc: description,
      img: photo,
      local: local,
      care_level: difficulty,
      date_plant: date?.toString(),
    }

    PlantRequest().update(plantObj)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Atualizado com sucesso!')
          navigate('/')
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

  function onPressDelete() {
    setIsLoading(true)

    PlantRequest().deleteItem(plant.idPlant)
      .then((res) => {
        if (res.success && res.data) {
          snack.addMessage('Apagado com sucesso!')
          navigate('/')
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function getRegisterList() {
    if (!plant?.idPlant)
      return;

    RegisterRequest().getByPlant(plant.idPlant)
      .then((res) => {
        if (res.success && res.data) {
          const newList: IRegisterModel[] = res.data.map(item => {
            return {
              idRegister: item.id,
              idPlant: item.idPlant,
              rega: item.watering,
              poda: item.pruning,
              adubacao: item.fertilizing,
              decricao: item.description,
              dateRegister: new Date(item.createdAt)
            }
          })
          setRegisterList(newList)
        } else {
          throw new Error(res.message)
        }
      }).catch((err) => {
        snack.addMessage(err.message)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  function onPressEditRegister(register: IRegisterModel) {
    navigate('/register', { state: { register, idPlant: plant.idPlant } })
  }

  function onPressNewRegister() {
    navigate('/register', { state: { idPlant: plant.idPlant } })
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

    if (!name) {
      setNameError('Campo obrigatório')
      valid = false;
    }

    if (!difficulty) {
      setDifficultyError('Campo obrigatório')
      valid = false;
    }

    if (!local) {
      setLocalError('Campo obrigatório')
      valid = false;
    }

    if (!date) {
      setDateError('Campo obrigatório')
      valid = false;
    }

    if (date && !validateDate(date)) {
      setDateError('Data está no futuro')
      valid = false;
    }

    if (!description) {
      setDescriptionError('Campo obrigatório')
      valid = false;
    }

    return valid
  }

  function changeName(value: string) {
    setName(value);
    setNameError('')
  }

  function changeDifficulty(value: string) {
    setDifficulty(value);
    setDifficultyError('')
  }

  function changeLocal(value: string) {
    setLocal(value);
    setLocalError('')
  }

  function changeDate(value: string) {
    if (value) {
      const date = new Date(value).setDate(new Date(value).getDate() + 1);
      setDate(new Date(date));
    }
    setDateError('')
  }

  function changeDescription(value: string) {
    setDescription(value)
    setDescriptionError('')
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
              value={register.poda || ''}
              label={"Poda"}
              type={"text"}
              placeholder={"Qual foi a poda?"} />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Input
              disabled
              id={"Rega"}
              value={register.rega || ''}
              label={"Rega"}
              type={"text"}
              placeholder={"Quanto foi a última rega?"} />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Input
              disabled
              id={"Adubacao"}
              value={register.adubacao || ''}
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
                label={"Nome comum*"}
                type={"text"}
                placeholder={"Digite o nome da planta"}
                errorMessage={nameError}
                onChange={changeName} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"difficulty"}
                value={difficulty}
                label={"Dificuldade*"}
                type={"text"}
                placeholder={"Qual o nível de dificuldade de cuidar da planta?"}
                errorMessage={difficultyError}
                onChange={changeDifficulty} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"local"}
                value={local}
                label={"Local*"}
                type={"text"}
                placeholder={"Onde a planta foi está?"}
                errorMessage={localError}
                onChange={changeLocal} />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Input
                id={"date"}
                value={date ? format(date, 'yyyy-MM-dd') : ''}
                label={"Data plantio*"}
                type={"date"}
                placeholder={"Qual foi a data de plantio?"}
                errorMessage={dateError}
                onChange={changeDate} />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Input
                id={"description"}
                value={description}
                label={"Descrição da planta*"}
                type={"text"}
                multiline
                placeholder={"Digite a descrição da planta"}
                errorMessage={descriptionError}
                onChange={changeDescription} />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container item
          lg={8} md={8} sm={8} xs={10}
          rowSpacing={1}
          style={styles.containerButtons}>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button isLoading={isLoading} children={"Voltar"} onClick={onPressGoBack} />
          </Grid>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button isLoading={isLoading} children={"Salvar"} onClick={onPressSave} />
          </Grid>
          <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
            <Button isLoading={isLoading} children={"Novo Registro"} onClick={onPressNewRegister} />
          </Grid>

          {plant &&
            <Grid item lg={2.8} md={2.8} sm={6} xs={6}>
              <Button isLoading={isLoading} children={"Deletar"} onClick={onPressDelete} />
            </Grid>
          }

        </Grid>

        {plant && registerList &&
          <Grid
            container item
            lg={8} md={8} sm={8} xs={10}
            rowSpacing={1}
            style={{ ...styles.containerButtons, ...{ marginTop: '16px' } }}>
            {registerList.map(renderRegister)}
          </Grid>
        }
      </div>
    </div>
  )
}