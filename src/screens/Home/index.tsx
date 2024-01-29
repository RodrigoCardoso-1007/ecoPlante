import { useNavigate } from "react-router-dom";
import styles from "./styles";
import Header from "../../components/Header";
import { Grid } from "@mui/material";
import TitleSubtitle from '../../components/TitleSubTitle'
import ButtonFilled from "../../components/ButtonFilled";
import IPlantModel from "../../model/plant.model";
import CardPlant from "../../components/CardPlant";
import NewPlant from './../../assets/Images/newPlant.svg'

const PLANT_LIST_MOCK: IPlantModel[] = [
  {
    idPlant: 1,
    datePlant: new Date(),
    description: 'Minha planta 1',
    difficulty: 'Fácil',
    local: 'casa',
    namePlant: 'Planta 1',
    photo: 'https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg',
    registerList: [
      {
        idRegister: 1,
        poda: 'Poda 1',
        rega: 'Rega 1',
        adubacao: 'Adubacao 1',
        dateRegister: new Date(),
      }, {
        idRegister: 2,
        poda: 'Poda 2',
        rega: 'Rega 2',
        adubacao: 'Adubacao 2',
        dateRegister: new Date(),
      }, {
        idRegister: 3,
        poda: 'Poda 3',
        rega: 'Rega 3',
        adubacao: 'Adubacao 3',
        dateRegister: new Date(),
      }
    ]
  },
  {
    idPlant: 2,
    datePlant: new Date(),
    description: 'Minha planta 2',
    difficulty: 'Fácil',
    local: 'casa',
    namePlant: 'Planta 2',
  },
  {
    idPlant: 3,
    datePlant: new Date(),
    description: 'Minha planta 3',
    difficulty: 'Fácil',
    local: 'casa',
    namePlant: 'Planta 3',
    photo: 'https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg'
  }, {
    idPlant: 4,
    datePlant: new Date(),
    description: 'Minha planta 4',
    difficulty: 'Fácil',
    local: 'casa',
    namePlant: 'Planta 4',
    photo: 'https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg'
  }
]

export default function Home() {
  const navigate = useNavigate();

  function onPressCard(plant?: IPlantModel | null) {
    if (!!plant)
      navigate('/planta', { state: { plant } })
    else
      navigate('/planta')
  }

  function renderItem(plant: IPlantModel) {
    return (
      <Grid item lg={3} md={4} sm={6} xs={6} key={plant.idPlant}>
        <CardPlant
          title={plant.namePlant}
          src={plant.photo}
          onClick={() => onPressCard(plant)}
        />
      </Grid>
    )
  }

  return (
    <div style={styles.globalContainer}>
      <Header />
      <div style={styles.container}>
        <Grid container item lg={8} md={8} sm={8} xs={10} style={styles.containerHeader} >
          <Grid item lg={3} md={3} sm={6}>
            <TitleSubtitle
              title="Aqui está"
              subTitle="a sua lista de plantas"
            />
          </Grid>

          <Grid item lg={3} md={3} sm={6}>
            <ButtonFilled onClick={() => onPressCard(null)}>
              Adicionar planta
            </ButtonFilled>
          </Grid>
        </Grid>
        <Grid container item lg={8} md={8} sm={8} spacing={2}>
          {PLANT_LIST_MOCK.map(renderItem)}

          <Grid item lg={3} md={4} sm={6} xs={6}>
            <CardPlant
              title="Nova Planta"
              src={NewPlant}
              onClick={() => onPressCard(null)} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}