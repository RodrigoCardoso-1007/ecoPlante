import { useNavigate } from "react-router-dom";
import styles from "./styles";
import Header from "../../components/Header";
import { Grid } from "@mui/material";
import TitleSubtitle from '../../components/TitleSubTitle'
import ButtonFilled from "../../components/ButtonFilled";
import IPlantModel from "../../model/plant.model";
import CardPlant from "../../components/CardPlant";
import NewPlant from './../../assets/Images/newPlant.svg'
import { useContext, useEffect, useState } from "react";
import { PlantRequest } from "../../modules/Network/Plant";
import { SnackContext } from "../../contexts/snackProvider.context";
import { OutPlant } from "../../modules/Network/Plant/plantRequest.interface";

export default function Home() {
  const navigate = useNavigate();
  const snack = useContext(SnackContext)

  const [listPlant, setListPlant] = useState<IPlantModel[]>([])

  useEffect(getPlantByUser, [])

  function getPlantByUser() {
    PlantRequest().getByUser()
      .then((res) => {
        if (res.success && res.data) {
          const plantList = res.data.map((item: OutPlant) => {
            return {
              idPlant: item.id,
              namePlant: item.name,
              difficulty: item.care_level,
              local: item.local,
              datePlant: new Date(item.date_plant),
              description: item.desc,
              photo: item.img,
            }
          })

          setListPlant(plantList)
        }
        else
          throw new Error(res.message)
      }).catch((err) => {
        snack.addMessage(err.message)
      })
  }

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
          title={plant.namePlant || ''}
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
          {listPlant.map(renderItem)}

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