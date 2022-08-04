import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { red, green } from '@mui/material/colors';

import React from 'react';
import i18next from 'i18next';
 
 export const paperColor = (inbound) =>{
    let back = ""
    let front = ""
    switch (inbound) {
      case "unknown":
        back = "rosybrown";
        front = "white"
        break;
      case "lead":
        back = "khaki";
        front = "dimgray"
      break;
      case "customer":
        back = "dodgerblue";
        front = "white"
      break;
      case "passive":
        back = "darkred";
        front = "white"
      break;
    
      default:
        back = "yellow"
        front = "white"
        break;
    }
    return {
      "back" : back,
      "front": front
    }
  }

export const StatusColor = (status) =>{
  
    let frontColor = ""
    switch (status) {
      case "paid":
        frontColor = green[500]
        break;
      case "pending":
        frontColor = red[500]
      break;
      default:
        frontColor = green[500]
        break;
    }
    return  frontColor
}

export const GenderIcon = (props) =>{
  if (props.name === "male"){
     return <React.Fragment><MaleIcon /></React.Fragment>
  }
  if (props.name === "female"){
    return <React.Fragment><FemaleIcon /></React.Fragment>
 }
 return <React.Fragment><TransgenderIcon /></React.Fragment>
}

export const LocalTextForDataGrid = () =>{ 
return (
{ 
  toolbarDensity: i18next.t("Density")?i18next.t("Density"):"",
  toolbarDensityLabel: i18next.t("Density")?i18next.t("Density"):"",
  toolbarDensityCompact: i18next.t("Compact"),
  toolbarDensityStandard: i18next.t("Standart"),
  toolbarDensityComfortable: i18next.t("Comfortable"),
  noRowsLabel: i18next.t("noRows")?i18next.t("noRows"):"",
  noResultsOverlayLabel: i18next.t("noResultsFound")?i18next.t("noResultsFound"):"",
  errorOverlayDefaultLabel: i18next.t("anerrorocurred")?i18next.t("anerrorocurred"):"",
  toolbarFilters: i18next.t('Filters'),
  toolbarFiltersLabel: i18next.t('Showfilters'),
  toolbarFiltersTooltipHide: i18next.t('Hidefilters'),
  toolbarFiltersTooltipShow: i18next.t('Showfilters'),
  toolbarQuickFilterPlaceholder: i18next.t('search'),
  toolbarQuickFilterLabel: i18next.t('search'),
  toolbarQuickFilterDeleteIconLabel: i18next.t('Clear'),
  toolbarExport: i18next.t('Export'),
  toolbarExportLabel: i18next.t('Export'),
  toolbarExportCSV: i18next.t('DownloadasCSV'),
  toolbarExportPrint: i18next.t('print'),
  columnsPanelTextFieldLabel: i18next.t('findcolumn'),
  columnsPanelTextFieldPlaceholder: i18next.t('Columntitle'),
  columnsPanelDragIconLabel: i18next.t('reordercolumn'),
  columnsPanelShowAllButton: i18next.t('showall'),
  columnsPanelHideAllButton: i18next.t('hideall'),
  filterPanelAddFilter: i18next.t('Addfilter'),
  filterPanelDeleteIconLabel: i18next.t('Delete'),
  filterPanelLinkOperator: i18next.t('logicoperator'),
  filterPanelOperators: i18next.t('Operator'), // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: i18next.t('And'),
  filterPanelOperatorOr: i18next.t('Or'),
  filterPanelColumns: i18next.t('Columns'),
  filterPanelInputLabel: i18next.t('Value'),
  filterPanelInputPlaceholder: i18next.t('Filtervalue'),
  filterOperatorContains: i18next.t('contains'),
  filterOperatorEquals: i18next.t('equals'),
  filterOperatorStartsWith: i18next.t('startswith'),
  filterOperatorEndsWith: i18next.t('endswith'),
  filterOperatorIs: i18next.t('is'),
  filterOperatorNot: i18next.t('isnot'),
  filterOperatorIsEmpty: i18next.t('isempty'),
  filterOperatorIsNotEmpty: i18next.t('isnotempty'),
  filterOperatorIsAnyOf: i18next.t('isanyof'),
  filterValueAny: i18next.t('any'),
  filterValueTrue: i18next.t('true'),
  filterValueFalse: i18next.t('false'),
  columnMenuLabel: i18next.t('Menu')?i18next.t('Menu'):"",
  columnMenuShowColumns: i18next.t('showcolumns'),
  columnMenuFilter: i18next.t('Filter'),
  columnMenuHideColumn: i18next.t('Hide'),
  columnMenuUnsort: i18next.t('Unsort'),
  columnMenuSortAsc: i18next.t('SortbyASC'),
  columnMenuSortDesc: i18next.t('SortbyDESC'),
  columnHeaderFiltersLabel: i18next.t('Showfilters'),
  columnHeaderSortIconLabel: i18next.t('Sort')?i18next.t('Sort'):"",
  booleanCellTrueLabel: i18next.t('yes'),
  booleanCellFalseLabel: i18next.t('no'),

  footerRowSelected: (count) =>
      count !== 1
      ? `${count.toLocaleString() + " " + i18next.t("rowsselected")}`
      : `${count.toLocaleString() + " " + i18next.t("rowselected")}`,
      footerTotalRows: "total"
  }
  )
}