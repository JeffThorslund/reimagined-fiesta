import React from 'react';
import './App.css';
import { MantineProvider } from '@mantine/core';
import ApprovalRejectionInterface from "./ApprovalRejectionInterface"



function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ApprovalRejectionInterface />
    </MantineProvider>
  );
}


export default App;
