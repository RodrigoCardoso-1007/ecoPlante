import { Button as ButtonMaterial, CircularProgress } from '@mui/material'
import styles from './styles';

interface IButton {
  children: string,
  isLoading?: boolean,
  onClick: () => void
}

export default function Button(props: IButton) {
  const { children, isLoading, onClick } = props;

  return (
    <ButtonMaterial variant="contained" style={styles.button} onClick={onClick}>
      {isLoading ? <CircularProgress size={24} style={{ color: 'white' }} /> : children}
    </ButtonMaterial>
  )
}