
import React from 'react';
import { hideDetailsRow, showDetailsRow } from 'ka-table/actionCreators';

const DetailsButton = ({
  dispatch,
  rowKeyValue,
  rowData,
  isDetailsRowShown,
}) => {
  if(rowData.description)
    return (
      <button onClick={() => {
        dispatch(isDetailsRowShown ? hideDetailsRow(rowKeyValue) : showDetailsRow(rowKeyValue));
      }}>
        {isDetailsRowShown ? 'Скрыть' : 'Показать'} инфо
      </button>
    );
  return <> </>;
};

export default DetailsButton;