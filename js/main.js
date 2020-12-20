var columnDefs = [
  {headerName: "Make", field: "make", sortable: true, filter: true, rowGroup: true },
  {headerName: "Model", field: "model", sortable: true, filter: true},
  {headerName: "Price", field: "price", sortable: true, filter: true}
];
    
// specify the data
/*
var rowData = [
  {make: "Toyota", model: "Celica", price: 35000},
  {make: "Ford", model: "Mondeo", price: 32000},
  {make: "Porsche", model: "Boxter", price: 72000}
];*/

var autoGroupColumnDef = {
  headerName: 'Model',
  field: 'model',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
}
    
// let the grid know which columns and what data to use
var gridOptions = {
//  columnDefs: columnDefs,
  autoGroupColumnDef: autoGroupColumnDef,
  //rowData: rowData
  rowSelection: 'multiple',
  groupSelectsChildren: true,

    onGridReady: function (params) {
    params.api.sizeColumnsToFit();

    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  },
  sideBar: 'columns',
};

function getrow(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3013/ProgramDetails'
  })
  .then(function (data) {
    gridOptions.api.setRowData(data);
    console.log(data);
  })
}

function getcolumnheader(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3013/ProgramDetailsColumnNames'
  })
  .then(function (data) {
    var mycolumn = [];
    for (var index in data){
      mycolumn.push({headerName: data[index], field: data[index], sortable: true, filter: true, editable: true})
    }
    gridOptions.api.setColumnDefs( mycolumn );
    gridOptions.columnApi.applyColumnState({
      state: [
        {colId: 'programmeCategory', rowGroup: true, enableRowGroup: true},
        {colId: 'endDate', pivot: true, enablePivot: true},
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
    
  })
}
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    
    new agGrid.Grid(gridDiv, gridOptions);
    getcolumnheader(agGrid);
    getrow(agGrid);
    gridOptions.api.sizeColumnsToFit();
    var columnDefs = gridOptions.api.getColumnDefs();
    columnDefs.forEach(function(colDef, index) {
      if(colDef.headerName === "categoryShortName"){

      }
    });
    console.log(columnDefs);
});

function getSelectedRows() {
    var selectedNodes = gridOptions.api.getSelectedNodes()
    var selectedData = selectedNodes.map( function(node) { return node.data })
    var selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    alert('Selected nodes: ' + selectedDataStringPresentation);
}

$(document).ready(function() {
    $('.nav-tabs > li > a').click(function(event){
    event.preventDefault();//stop browser to take action for clicked anchor

    //get displaying tab content jQuery selector
    var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

    //find actived navigation and remove 'active' css
    var actived_nav = $('.nav-tabs > li.active');
    actived_nav.removeClass('active');

    //add 'active' css into clicked navigation
    $(this).parents('li').addClass('active');

    //hide displaying tab content
    $(active_tab_selector).removeClass('active');
    $(active_tab_selector).addClass('hide');

    //show target tab content
    var target_tab_selector = $(this).attr('href');
    $(target_tab_selector).removeClass('hide');
    $(target_tab_selector).addClass('active');
       });
});