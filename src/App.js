import React from 'react';
import { Grid } from 'semantic-ui-react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import './stylesheets/app.scss';

function App() {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column only='tablet computer' tablet={4} computer={4}>
          <Sidebar />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={12} style={{ height: '100vh', width: '100%' }}>
          <Map />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
