import React from 'react';
import { DateRangePicker } from './components/DateRangePicker';
import { useDateRangePicker } from './hooks/useDateRangePicker';

function App() {
  const { startDate, endDate, ...methods } = useDateRangePicker({});

  return (
    <div>
      <DateRangePicker {...methods} />
    </div>
  );
}

export default App;
