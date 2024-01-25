import colors from "../../styles/colors"

const defaultInput = {
  borderRadius: '20px',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  height: '44px',
  fontSize: '14px',
}

const defaultLabel = {
  fontWeight: 'bold',
  marginLeft: '10px',
  fontSize: '18px'
}

const styles = {
  container: {
    width: '100%'
  },
  availableInput: {
    ...defaultInput,
    backgroundColor: colors.base.white,
  },
  disableInput: {
    ...defaultInput,
    backgroundColor: colors.background.disable
  },
  label: {
    ...defaultLabel,
    color: colors.primary.dark,
  },
  errorMessage: {
    ...defaultLabel,
    color: 'red',
  }
}

export default styles