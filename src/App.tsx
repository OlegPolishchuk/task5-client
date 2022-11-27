import React from 'react';
import {DataList, Header} from "components";
import {Container} from "@mui/material";

function App() {
  console.log('app')

  return (
   <Container>
     <Header />
     <DataList />
   </Container>
  );
}

export default App;
