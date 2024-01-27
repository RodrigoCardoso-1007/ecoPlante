import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './styles';

interface IInput {
  id: string;
  value: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  hidePassword?: boolean;
  style?: React.CSSProperties,
  errorMessage?: string,
  onChange: (item: string) => void;
  onCLickPasswordVisibility?: () => void;
}

export default function Input(props: IInput) {
  const {
    id,
    value,
    label,
    type,
    placeholder,
    required,
    disabled,
    style,
    hidePassword,
    errorMessage,
    onChange,
    onCLickPasswordVisibility
  } = props;

  function onChangeClosed(value: any) {
    onChange(value.target.value)
  }

  const defaultStyle = disabled
    ? styles.disableInput
    : styles.availableInput;

  return (
    <FormControl variant="outlined" style={styles.container}>
      <label style={styles.label}>{label}</label>

      <OutlinedInput
        id={id}
        autoFocus={false}
        value={value}
        required={required}
        placeholder={placeholder}
        size='small'
        type={hidePassword ? 'password' : type}
        style={{ ...defaultStyle, ...style }}
        onChange={onChangeClosed}
        endAdornment={!!onCLickPasswordVisibility && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onCLickPasswordVisibility}
              edge="end"
            >
              {hidePassword
                ? <VisibilityOff style={styles.icon} />
                : <Visibility style={styles.icon} />
              }
            </IconButton>
          </InputAdornment>
        )}
      />

      {errorMessage && !disabled &&
        <label style={styles.errorMessage}>{errorMessage}</label>
      }
    </FormControl>
  )
}