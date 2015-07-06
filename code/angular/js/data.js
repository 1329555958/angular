/**
 * Created by weichunhe on 2015/7/1.
 */
var tableData = {},pageSize = 3;
tableData.get = function(param){
    var results = [];
    angular.forEach(tableData.rows,function(row){
        if(param.category){
            if(row.category != param.category){
                return;
            }
        }
        if(param.status){
            if(param.status.indexOf(row.status) === -1){
                return;
            }
        }
        if(param.filter){
            if((row.name+row.code).indexOf(param.filter) === -1){
                return;
            }
        }
        results.push(row);
    });
    var rows =results.slice((param.currentPage-1)*pageSize,param.currentPage*pageSize);
    return {
        totalPage:Math.floor((results.length +pageSize - 1)/pageSize)
        ,currentPage:param.currentPage
        ,rows:rows
    }
}

tableData.rows = [{code:1,name:'proj1',category:'0',status:'1',price:5.362}
    ,{code:2,name:'proj1',category:'0',status:'1',price:2.861}
    ,{code:3,name:'proj1',category:'0',status:'1',price:4.125}
    ,{code:4,name:'proj1',category:'0',status:'1',price:5.236}
    ,{code:5,name:'proj1',category:'0',status:'1',price:4.2}
];