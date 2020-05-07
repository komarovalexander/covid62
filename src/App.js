import React from 'react';
import './App.css';
import { data } from './data';
import Map from './Map';
import CovidTable from './CovidTable';

const firstData = data[0];
const secondData = data[1];
const regions = firstData.regions;

for (var i = 0; i<regions.length; i++){
  var item = regions[i];
  var secondItem = secondData.regions.find(d=> d.id === item.id);
  item.lastDaySick = item.sick - secondItem.sick;
}

function App() {  
  return (
    <div className="App">
      <p>Всего заразившихся:<b> {firstData.all} </b>(+{firstData.all-secondData.all} за последние сутки) - <a href={firstData.source} target="_blank" rel="noopener noreferrer">Источник</a></p>
      <div className='map-table'>
        <Map regions={regions}/>
        <CovidTable regions={regions}/>
      </div>
      <p>*Последнее обновление: {firstData.date.toLocaleDateString()}</p>
    </div>
  );
}

export default App;
