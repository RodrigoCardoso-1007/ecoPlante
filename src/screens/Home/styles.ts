import colors from "../../styles/colors";

const styles = {
  globalContainer: {
    minHeight: '100vh',
    height: '100%',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column' as 'column',
  },
  containerHeader: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: '32px',
  },
  containerButtons: {
    justifyContent: 'space-between',
    marginBottom: '16px'
  }
}

export default styles;