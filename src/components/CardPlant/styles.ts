import colors from "../../styles/colors";

const styles = {
  container: {
    backgroundColor: colors.background.default,
    borderRadius: '8px',
    padding: '18px 16px 0px 16px',
    maxWidth: '180px',
    minWidth: '180px',
    height: '200px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  title: {
    color: colors.primary.dark,
    paddingTop: '16px'
  },
  image: {
    height: '120px',
    width: '120px',
    backgroundColor: colors.background.light
  }
}

export default styles;