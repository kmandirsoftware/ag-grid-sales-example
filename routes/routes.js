const programdetailRoutes = require('./programdetails')
const campaignRoutes = require('./campaign')

const appRouter = (app, mysql, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.render('index.html');
	    console.log("main entry");
    });

    programdetailRoutes(app, mysql, fs);
    campaignRoutes(app, fs);
};

module.exports = appRouter;
