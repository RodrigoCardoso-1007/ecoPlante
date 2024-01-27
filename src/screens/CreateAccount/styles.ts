import colors from "../../styles/colors";

const styles = {
  containerGlobal: {
    display: 'flex',
    height: '100vh',
    backgroundColor: colors.background.dark,
  },
  containerLogo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    maxWidth: '76%',
    maxHeight: '100%',
    height: 'auto',
    width: 'auto'
  },
  containerForm: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  containerInputs: {
    display: 'flex',
    width: '100%',
    gap: '16px',
    flexDirection: 'column' as 'column',
  },
  containerItems: {
    width: '74%',
  },
  containerTitle: {
    marginBottom: '20px'
  },
  containerButtons: {
    marginTop: '30px'
  },
  containerButtonsText: {
    marginTop: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row' as 'row',
  }
}

export default styles;