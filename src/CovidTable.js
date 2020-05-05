import "ka-table/style.css";

import React, { useState } from 'react';

import { kaReducer, Table } from 'ka-table';
import defaultOptions from 'ka-table/defaultOptions';
import { DataType, SortingMode } from 'ka-table/enums';

defaultOptions.columnSortDirection = 'descend';

const tablePropsInit = {
  columns: [
    { key: 'name', title: 'Регион', dataType: DataType.String, style: {width: 150} },
    { key: 'sick', title: 'Зараженные', dataType: DataType.Number, style: {width: 100}, sortDirection: 'descend' },
    { key: 'lastDaySick', title: 'За сутки', dataType: DataType.Number, format: (value)=> value === 0 ? '' : `(+${value})`, style: {width: 100} },
    { key: 'description', title: 'Доп. Инфо', dataType: DataType.String },
  ],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

function CovidTable({ regions }) {
    const [tableProps, changeTableProps] = useState({...tablePropsInit, data: regions });
  
    const dispatch = (action) => { 
      changeTableProps((prevState) => kaReducer(prevState, action));
    };
  
    return (
      <Table
        {...tableProps}
        dispatch={dispatch} 
      />
    );
  };

export default CovidTable;
