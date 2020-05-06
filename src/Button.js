
import React, { useState } from 'react';

export default function Button({value}){
    const [clicked, click] = useState(false);
    return clicked ? <>{value}</> : value && <button onClick={() => click(true)}>Показать инфо по району</button>;
  }