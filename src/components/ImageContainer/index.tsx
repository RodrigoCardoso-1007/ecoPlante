import { Button } from "@mui/material";
import styles from "./styles";

interface IImageContainer {
  src: string;
  styleProps?: any;
}

export default function ImageContainer(props: IImageContainer) {
  const { src, styleProps } = props;

  return (
    <Button style={{ ...styles.container, ...styleProps }}>
      <img
        style={styles.image}
        src={src}
        alt="imagem registro" />
    </Button>
  )
}