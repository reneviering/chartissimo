import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';

import { Chart } from './Chart';

import 'normalize.css';

import data from './data.json';

const App: FunctionComponent = () => (
  <Chart width={1024} height={768} data={data} />
);

render(<App />, document.getElementById('root'));
