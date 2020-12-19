const getSQL = require("wheresql");

const programdetailRoutes = (app, mysql, fs) => {

    const con = mysql.createConnection({
        host: 'ec2-13-59-108-198.us-east-2.compute.amazonaws.com',
        user: 'webuser',
        password: 'webwordpw',
        database: 'ldmrk'
    });


    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });

    app.get('/ProgramDetails', (req, res) => {
        if(req.query.hasOwnProperty('start')){
            console.log(req.query['start']);
            var selectallquery = "select * from programdetails limit 100 offset  "+req.query['start'] ;
        }else{
            var selectallquery = "select * from programdetails limit 10000";
        }
      con.query(selectallquery, function(err,result) {
        if(err) {
          console.log('Error');
          console.log(err);
        }
        else {
          console.log('Success');
          var data=[];
          var i=0;
          for (var index in result){
            delete result[index]['id'];
            data[i] = result[index];
            i++;
           }
            //console.log(header);
             var json = JSON.stringify(data);
           res.send(json); 
        }
      });            
    });

    app.get('/ProgramDetailsColumnNames', (req, res) => {
        var myquery="show columns from ldmrk.programdetails";
        con.query(myquery, function(err,result){
            if(err){
                console.log('Error');
                console.log(err);
            }else{
                console.log('Success');
                var data= new Array();
                for (var index in result){
                    if( result[index]['Field'] === "id"){ continue };
                    if( result[index]['Field'] === 'created_at'){ continue };
                    data.push(result[index]['Field']);
                }
                var json=JSON.stringify(data);
                res.send(json);
            }
        })
    });

const dbConfig = {};
app.post("/api/data/:table", (req, res, next) => {
    const {sql, values, error} = getSQL(req.body, dbConfig);
    if(error)
        return res.status(500).send(error);

    con.query(
        `SELECT * FROM ${req.params.table} WHERE ${sql}`,
        values,
        function (err, result) {
            if (err)
                next(err);
            else
                res.send(result);
        }
    );
});


};
module.exports = programdetailRoutes;