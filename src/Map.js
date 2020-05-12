import React from 'react';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import { createPopper } from '@popperjs/core';


let popper = {};
let regionsGlobal = [];
function Map({ regions, maxCount }) {
  regionsGlobal = regions;
  const [popperElement, setPopperElement] = React.useState(null);
  const [popperContent, setPopperContent] = React.useState(null);
  const closePoper=()=> {
    popper.destroy && popper.destroy();
    setPopperContent(<></>);
  };
  const hoverElem = (elem, regionId) => {
    elem.addEventListener("mouseover", () => {
      const region = regionsGlobal.find(r=> r.id === regionId);
      setPopperContent(<div className="tooltip-content">
        <h4>{region.name}</h4><img alt='' src='close.svg'  onClick={()=> {closePoper()}}></img>
        <p>Всего: <b>{region.sick}</b></p>
        <p>{region.description}</p>
      </div>);
      popper = createPopper(elem, popperElement, {
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
    <div className="rzn-map" onMouseLeave = {()=> {closePoper()}}>
      <SvgLoader path="./Ryazan_Oblast.svg">
        {regions.map(r=> {
          let opacity = (r.sick / maxCount);
          if(r.sick !== 0 && r.opacity < 0.07){
            opacity = 0.07;
          }
          if(r.id === "ryazan"){
            opacity = 1;
          }
          return <SvgProxy key={r.id} selector={"#"+r.id} fill={`rgba(${r.id === "ryazan" ? '140' : '180'}, 0, 0, ${opacity})`} onElementSelected={(elem)=> hoverElem(elem, r.id)}></SvgProxy>
        })}
      </SvgLoader>
      <div className="tooltip" ref={setPopperElement}>{popperContent}</div>
    </div>
  );
}

export default Map;
