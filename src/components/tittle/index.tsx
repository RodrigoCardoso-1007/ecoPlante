import styles from "./styles";

interface ITitle {
  children: string,
}

export default function Title(props: ITitle) {
  const { children } = props;

  return (
    <h1 style={styles.text}>{children}</h1>
  )
}