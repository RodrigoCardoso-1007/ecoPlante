import styles from "./styles";

interface ITitle {
  title: string,
  subTitle: string,
}

export default function TitleSubTitle(props: ITitle) {
  const { title, subTitle } = props;

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.title }}>{title}</h1>
      <h1 style={{ ...styles.subTitle }}>{subTitle}</h1>
    </div>
  )
}