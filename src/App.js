import React from 'react';
import './App.css';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { createPopper } from '@popperjs/core';
import { data } from './data';

const regions = data[0].regions;

var maxCount = regions.reduce((acc, item) => item.id !== "ryazan" && item.sick > acc ? item.sick : acc,0);
for (var i=0; i<regions.length; i++){
  const region = regions[i];
  region.opacity = (region.sick / maxCount) - 0.4;
  if(region.opacity !== 0 && region.opacity < 0.15){
    region.opacity = 0.15;
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
      setPopperContent(<div><div>{region.name}</div><div>Всего: {region.sick}</div> {region.description}</div>);
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
      <SvgLoader path="./Ryazan_Oblast.svg">
        {regions.map(r=> <SvgProxy selector={"#"+r.id} fill={`rgba(256, 0, 0, ${r.opacity})`} onElementSelected={(elem)=> hoverElem(elem, r)}></SvgProxy>)}
      </SvgLoader>
  <div className="tooltip" ref={setPopperElement}>{popperContent}</div>
    </div>
  );
}

export default App;
