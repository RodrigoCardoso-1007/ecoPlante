import { Button } from "@mui/material";
import styles from "./styles";

interface IImageContainer {
  src: string;
  styleProps?: any;
  onClick?: () => void;
}

export default function ImageContainer(props: IImageContainer) {
  const { src, styleProps, onClick } = props;

  return (
    <Button style={{ ...styles.container, ...styleProps }} onClick={onClick}>
      <img
        style={styles.image}
        src={src}
        alt="imagem registro" />
    </Button>
  )
}