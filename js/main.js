

function onFilterTextBoxChanged() {
    gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
}

    
var myTextFilterParams = {
  filterOptions: ['contains', 'notContains'],
  textFormatter: function (r) {
    if (r == null) return null;

    return r
      .toLowerCase()
      .replace(/\s/g, '')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/æ/g, 'ae')
      .replace(/ç/g, 'c')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/ñ/g, 'n')
      .replace(/[òóôõö]/g, 'o')
      .replace(/œ/g, 'oe')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/\W/g, '');
  },
  debounceMs: 200,
  suppressAndOrCondition: true,
};


var autoGroupColumnDef = {
  headerName: 'Programs',
  field: 'programs',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
}
    
// let the grid know which columns and what data to use
var gridOptions = {
    statusBar: {
        statusPanels: [
            { statusPanel: 'agTotalAndFilteredRowCountComponent', key: 'totalAndFilter', align: 'left' },
            { statusPanel: 'agSelectedRowCountComponent', align: 'left' },
            { statusPanel: 'agAggregationComponent', align: 'right' }
        ]
    },
  rowDrag: true,
  enableRangeSelection: true,
  autoGroupColumnDef: autoGroupColumnDef,
  //rowData: rowData
  rowSelection: 'multiple',
  groupSelectsChildren: true,

  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    enableCharts: true,
    enterMovesDownAfterEdit: true,
    enterMovesDown: true, 
    floatingFilter: true,   
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
      mycolumn.push({headerName: data[index], field: data[index], filter: 'agMultiColumnFilter'})
    }
    gridOptions.api.setColumnDefs( mycolumn );
    /*
    var filterInstance = gridApi.getFilterInstance('categoryShortName');
    filterInstance.setModel({
      filter: 'agTextColumnFilter',
      filterParams: myTextFilterParams
    })
    filterInstance.applyModel();
    */
    gridOptions.columnApi.applyColumnState({
      state: [
        {
          colId: 'programmeCategory', 
          rowGroup: true, 
          enableRowGroup: true,
        },
        {colId: 'endDate', pivot: true, enablePivot: true},
        {colId: 'commercialDuration', floatingFilter: false},
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
    //gridApi.onFilterChanged();
  })
}
// setup the grid after the page has finished loading

document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    
    new agGrid.Grid(gridDiv, gridOptions);
    getcolumnheader(agGrid);
    getrow(agGrid);
    gridOptions.api.sizeColumnsToFit();
});

function getSelectedRows() {
    var selectedNodes = gridOptions.api.getSelectedNodes()
    var selectedData = selectedNodes.map( function(node) { return node.data })
    var selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
    alert('Selected nodes: ' + selectedDataStringPresentation);
}

$(document).ready(function() {
     setupCampainGrid();

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
