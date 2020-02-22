import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import './stylesheets/app.scss';

function App() {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column width={4}>
          <Sidebar />
        </Grid.Column>
        <Grid.Column width={12} style={{ height: '100vh', width: '100%' }}>
          <Map />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
