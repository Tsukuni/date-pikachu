import React from 'react';
import { DatePicker } from './components/DatePicker';

function App() {
  return (
    <div>
      <DatePicker unavailableDates={['2021-4-30']} />
    </div>
  );
}

export default App;
