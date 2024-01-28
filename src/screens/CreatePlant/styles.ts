import colors from "../../styles/colors";

const styles = {
  globalContainer: {
    minHeight: '100vh',
    height: '100%',
    backgroundColor: colors.background.default,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column' as 'column',
  },
  containerForm: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: '32px'
  },
  containerButtons: {
    justifyContent: 'space-between',
    marginBottom: '16px'
  }
}

export default styles;