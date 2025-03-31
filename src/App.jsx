import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routing from './routes/Routing';
import SessionProvider from './context/SessionProvider';



function App() {

  return (
    <>
      <SessionProvider>
        <Routing />
      </SessionProvider>
    </>
  )
}

export default App
