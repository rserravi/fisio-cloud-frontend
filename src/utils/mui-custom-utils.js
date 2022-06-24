import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { red, green } from '@mui/material/colors';

import React from 'react';
import { useTranslation } from 'react-i18next';
 
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
  const { t } = useTranslation();
return (
{ 
  toolbarDensity: t("Density"),
  toolbarDensityLabel: t("Density"),
  toolbarDensityCompact: t("Compact"),
  toolbarDensityStandard: t("Standart"),
  toolbarDensityComfortable: t("Comfortable"),
  noRowsLabel: t("noRows"),
  noResultsOverlayLabel: t("noResultsFound"),
  errorOverlayDefaultLabel: t("anerrorocurred"),
  toolbarFilters: t('Filters'),
  toolbarFiltersLabel: t('Showfilters'),
  toolbarFiltersTooltipHide: t('Hidefilters'),
  toolbarFiltersTooltipShow: t('Showfilters'),
  toolbarQuickFilterPlaceholder: t('search'),
  toolbarQuickFilterLabel: t('search'),
  toolbarQuickFilterDeleteIconLabel: t('Clear'),
  toolbarExport: t('Export'),
  toolbarExportLabel: t('Export'),
  toolbarExportCSV: t('DownloadasCSV'),
  toolbarExportPrint: t('print'),
  columnsPanelTextFieldLabel: t('findcolumn'),
  columnsPanelTextFieldPlaceholder: t('Columntitle'),
  columnsPanelDragIconLabel: t('reordercolumn'),
  columnsPanelShowAllButton: t('showall'),
  columnsPanelHideAllButton: t('hideall'),
  filterPanelAddFilter: t('Addfilter'),
  filterPanelDeleteIconLabel: t('Delete'),
  filterPanelLinkOperator: t('logicoperator'),
  filterPanelOperators: t('Operator'), // TODO v6: rename to filterPanelOperator
  filterPanelOperatorAnd: t('And'),
  filterPanelOperatorOr: t('Or'),
  filterPanelColumns: t('Columns'),
  filterPanelInputLabel: t('Value'),
  filterPanelInputPlaceholder: t('Filtervalue'),
  filterOperatorContains: t('contains'),
  filterOperatorEquals: t('equals'),
  filterOperatorStartsWith: t('startswith'),
  filterOperatorEndsWith: t('endswith'),
  filterOperatorIs: t('is'),
  filterOperatorNot: t('isnot'),
  filterOperatorIsEmpty: t('isempty'),
  filterOperatorIsNotEmpty: t('isnotempty'),
  filterOperatorIsAnyOf: t('isanyof'),
  filterValueAny: t('any'),
  filterValueTrue: t('true'),
  filterValueFalse: t('false'),
  columnMenuLabel: t('Menu'),
  columnMenuShowColumns: t('showcolumns'),
  columnMenuFilter: t('Filter'),
  columnMenuHideColumn: t('Hide'),
  columnMenuUnsort: t('Unsort'),
  columnMenuSortAsc: t('SortbyASC'),
  columnMenuSortDesc: t('SortbyDESC'),
  columnHeaderFiltersLabel: t('Showfilters'),
  columnHeaderSortIconLabel: t('Sort'),
  booleanCellTrueLabel: t('yes'),
  booleanCellFalseLabel: t('no'),
  footerRowSelected: (count) =>
      count !== 1
      ? `${count.toLocaleString() + " " + t("rowsselected")}`
      : `${count.toLocaleString() + " " + t("rowselected")}`,
      footerTotalRows: "total"
  }
  )
}