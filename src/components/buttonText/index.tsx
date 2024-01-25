import styles from "./styles";

interface IButtonText {
  complementeText?: string;
  principalText: string;
  onClick: () => void;
}

export default function ButtonText(props: IButtonText) {
  const { complementeText, principalText, onClick } = props;

  return (
    <p style={styles.text}>
      {complementeText}
      <a onClick={onClick} style={styles.clickableText}>{principalText}</a>
    </p>
  )
}