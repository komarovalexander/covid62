import React, {useState} from 'react';
import './App.css';
import { data } from './data';
import Map from './Map';
import CovidTable from './CovidTable';

const maxCount =  data[0].regions.reduce((acc, item) => item.id !== "ryazan" && item.sick > acc ? item.sick : acc,0);

function App() {
  const [dataIndex, setDataIndex] = useState(0);
  const firstData = data[dataIndex];
  const secondData = data[dataIndex + 1];
  const weekData = data[dataIndex + 7];
  const regions = firstData.regions;

  for (var i = 0; i<regions.length; i++){
    const item = regions[i];
    const secondItem = secondData.regions.find(d=> d.id === item.id);

    if(dataIndex < data.length - 7){
      const weekItem = weekData.regions.find(d=> d.id === item.id);
      item.lastWeekSick = item.sick - weekItem.sick;
    }
    item.lastDaySick = item.sick - secondItem.sick;
  }
  return (
    <div className="App">
      <p>
        <span className={'date'}>Дата: <b>{firstData.date.toLocaleDateString()}</b></span>
        <span className="day-buttons">
          <button className="day" onClick={() => setDataIndex(dataIndex + 1)} disabled={dataIndex >= data.length -2}>Предыдущий день</button>
          <button className="day" onClick={() => setDataIndex(dataIndex - 1)} disabled={dataIndex === 0}>Следующий день</button>
        </span>
      </p>
      <p>Всего заразившихся:<b> {firstData.all} </b>(+{firstData.all-secondData.all} за последние сутки{weekData && `, +${firstData.all-weekData.all} за последнюю неделю`}) - <a href={firstData.source} target="_blank" rel="noopener noreferrer">Источник</a></p>
      <div className='map-table'>
        <Map regions={regions} maxCount={maxCount}/>
        <CovidTable regions={regions}/>
      </div>
    </div>
  );
}

export default App;
