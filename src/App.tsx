import React from 'react';
import RouteComponent from "./routes";
import { UserContextProvider } from './contexts/user.context';
import { SnackContextProvider } from './contexts/snackProvider.context';

export default function App() {

  return (
    <SnackContextProvider>
      <UserContextProvider>
        <RouteComponent />
      </UserContextProvider>
    </SnackContextProvider>
  );
}