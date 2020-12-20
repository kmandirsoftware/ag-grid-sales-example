campaignGridOptions = {
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

function getCampaignRow(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3013/Campaigns'
  })
  .then(function (data) {
    campaignGridOptions.api.setRowData(data);
  })
}

function getCampaignColumnHeader(agGrid){
  agGrid.simpleHttpRequest({
    url: 'http://localhost:3013/CampaignsColumnNames'
  })
  .then(function (data) {
    var mycolumn = [];
    for (var index in data){
      mycolumn.push({headerName: data[index], field: data[index], sortable: true, filter: true, editable: true})
    }
    campaignGridOptions.api.setColumnDefs( mycolumn );
    campaignGridOptions.columnApi.applyColumnState({
      state: [
        {colId: 'product', rowGroup: true, enableRowGroup: true},
        {colId: 'reportingCategoryName', pivot: true, enablePivot: true},
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
    
  })
}

function setupCampainGrid(){
	var gridCampaignDiv = document.querySelector('#CampaignGrid');
    
    new agGrid.Grid(gridCampaignDiv, campaignGridOptions);
    getCampaignColumnHeader(agGrid);
    getCampaignRow(agGrid);
    campaignGridOptions.api.sizeColumnsToFit();
}