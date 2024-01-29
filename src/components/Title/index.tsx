import styles from "./styles";

interface ITitle {
  children: string,
  styleProps?: any;
}

export default function Title(props: ITitle) {
  const { children, styleProps } = props;

  return (
    <h1 style={{ ...styles.text, ...styleProps }}>{children}</h1>
  )
}