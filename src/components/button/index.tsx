import { Button as ButtonMaterial } from '@mui/material'
import styles from './styles';

interface IButton {
  children: string,
  onClick: () => void
}

export default function Button(props: IButton) {
  const { children } = props;

  return (
    <ButtonMaterial variant="contained" style={styles.button}>
      {children}
    </ButtonMaterial>
  )
}