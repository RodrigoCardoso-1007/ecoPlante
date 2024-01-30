import { createContext, useState } from 'react';
import { Snackbar } from '@mui/material';

interface IUserContext {
  addMessage: (item: string) => void;
}

const SnackContext = createContext<IUserContext>({
  addMessage: () => { }
});

const SnackContextProvider = ({ children }: any) => {
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackMessage, setSnackMessage] = useState('')

  function addMessage(message: string) {
    setSnackOpen(true)
    setSnackMessage(message)
  }

  function closeSnack() {
    setSnackOpen(false)
    setSnackMessage('')
  }

  return (
    <SnackContext.Provider value={{ addMessage }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackOpen}
        onClose={closeSnack}
        message={snackMessage}
      />
    </SnackContext.Provider>
  );
};

export { SnackContextProvider, SnackContext };
