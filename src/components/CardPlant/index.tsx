import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import DefaultPlant from './../../assets/Images/defaultPlant.svg';
import styles from './styles';
import ImageContainer from '../ImageContainer';

interface ICardPlant {
  src?: string;
  title: string;
  onClick?: () => void;
}

export default function CardPlant(props: ICardPlant) {
  const { src, title, onClick } = props;

  return (
    <Button onClick={onClick}>
      <Card sx={styles.container}>
        <ImageContainer
          src={src || DefaultPlant}
          styleProps={styles.image}
        />
        <h2 style={styles.title}>{title}</h2>
      </Card>
    </Button>
  )
}