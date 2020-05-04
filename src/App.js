import React from 'react';
import './App.css';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { createPopper } from '@popperjs/core';
import { data } from './data';

const firstData = data[0];
const regions = firstData.regions;

var maxCount = regions.reduce((acc, item) => item.id !== "ryazan" && item.sick > acc ? item.sick : acc,0);
var allSick = regions.reduce((acc, item) => item.sick + acc,0);
for (var i=0; i<regions.length; i++){
  const region = regions[i];
  region.opacity = (region.sick / maxCount);
  if(region.sick !== 0 && region.opacity < 0.07){
    region.opacity = 0.07;
  }
  if(region.id === "ryazan"){
    region.opacity = 1;
  }
}


function App() {
  const [popperElement, setPopperElement] = React.useState(null);
  const [popperContent, setPopperContent] = React.useState(null);
  const hoverElem = (elem, region) => {
    elem.addEventListener("mouseover", () => {
      setPopperContent(<div>
        <h4>{region.name}</h4>
        <p>Всего: <b>{region.sick}</b></p>
        <p>{region.description}</p>
      </div>);
      createPopper(elem, popperElement, {
        placement: 'top',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -40],
            },
          },
        ],
      });
     });
  }
  return (
    <div className="App">
      <p>Последнее обновление: {firstData.date.toLocaleDateString()}</p>
      <p>Всего заразившихся: {allSick}</p>
      <SvgLoader path="./Ryazan_Oblast.svg">
        {regions.map(r=> <SvgProxy selector={"#"+r.id} fill={`rgba(${r.id === "ryazan" ? '140' : '180'}, 0, 0, ${r.opacity})`} onElementSelected={(elem)=> hoverElem(elem, r)}></SvgProxy>)}
      </SvgLoader>
      <div className="tooltip" ref={setPopperElement}>{popperContent}</div>
    </div>
  );
}

export default App;
