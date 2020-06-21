import "ka-table/style.css";

import React, { useState } from 'react';

import { kaReducer, Table } from 'ka-table';
import defaultOptions from 'ka-table/defaultOptions';
import { DataType, SortingMode } from 'ka-table/enums';
import DetailsButton from './Button';

defaultOptions.columnSortDirection = 'descend';

const DetailsRow = ({
  rowData,
}) => {
  return (
    <div>
      {rowData.description}
    </div>
  );
};

const tablePropsInit = {
  columns: [
    { key: 'description', style: {width: 120}, title: 'Доп. Инфо', dataType: DataType.String, cell: (props) => <DetailsButton {...props}/> },
    { key: 'name', title: 'Регион', dataType: DataType.String, style: {width: 150} },
    { key: 'sick', title: 'Зараженные', dataType: DataType.Number, style: {width: 90}, sortDirection: 'descend' },
    { key: 'lastDaySick', title: 'За сутки', dataType: DataType.Number, format: (value)=> value === 0 ? '' : `(+${value})`, style: {width: 80} },
    { key: 'lastWeekSick', title: 'За неделю', dataType: DataType.Number, format: (value)=> !value ? '' : `(+${value})` },
  ],
  detailsRow: DetailsRow,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

function CovidTable({ regions }) {

    const [tableProps, changeTableProps] = useState({...tablePropsInit });

    const dispatch = (action) => {
      changeTableProps((prevState) => kaReducer(prevState, action));
    };

    return (
      <Table
        data={regions}
        {...tableProps}
        dispatch={dispatch}
        childAttributes={{
          detailsRow: {
            style: {
              backgroundColor: '#eee'
            }
          }
        }}
      />
    );
  };

export default CovidTable;
