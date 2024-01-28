import { Button as ButtonMaterial } from '@mui/material'
import styles from './styles';

interface IButton {
  children: string,
  onClick: () => void
}

export default function ButtonFilled(props: IButton) {
  const { children, onClick } = props;

  return (
    <ButtonMaterial variant="contained" style={styles.button} onClick={onClick}>
      {children}
    </ButtonMaterial>
  )
}