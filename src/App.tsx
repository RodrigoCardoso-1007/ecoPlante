import React from 'react';
import RouteComponent from "./routes";
import { UserContextProvider } from './contexts/user.context';

export default function App() {

  return (
    <UserContextProvider>
      <RouteComponent />
    </UserContextProvider>
  );
}