import { Button, Avatar as AvatarMaterial } from "@mui/material";
import styles from "./styles";

interface IAvatar {
  src?: string;
  size?: number;
  onClick?: () => void;
}

export default function Avatar(props: IAvatar) {
  const { src, size, onClick } = props;

  const buttonSize = size
    ? { width: `${size}px`, height: `${size}px` }
    : {}

  return (
    <Button onClick={onClick} >
      <AvatarMaterial style={{ ...styles.avatar, ...buttonSize }} src={src} />
    </Button>
  )
}