import "ka-table/style.css";

import React, { useState } from 'react';

import { kaReducer, Table } from 'ka-table';
import defaultOptions from 'ka-table/defaultOptions';
import { DataType, SortingMode } from 'ka-table/enums';
import Button from './Button';

defaultOptions.columnSortDirection = 'descend';


const tablePropsInit = {
  columns: [
    { key: 'name', title: 'Регион', dataType: DataType.String, style: {width: 120} },
    { key: 'sick', title: 'Зараженные', dataType: DataType.Number, style: {width: 60}, sortDirection: 'descend' },
    { key: 'lastDaySick', title: 'За сутки', dataType: DataType.Number, format: (value)=> value === 0 ? '' : `(+${value})`, style: {width: 30} },
    { key: 'lastWeekSick', title: 'За неделю', dataType: DataType.Number, format: (value)=> !value ? 'нет данных' : `(+${value})`, style: {width: 40} },
    { key: 'description', title: 'Доп. Инфо', dataType: DataType.String, style: {width: 400}, cell: (props) => <Button {...props}/> },
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
