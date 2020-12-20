
const campaignRoutes = (app, fs) => {

    // variables
    const dataPath = './data/campaign.json';
    const columns = './data/campaigncolumndefs.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/Campaigns', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
    app.get('/CampaignsColumnNames', (req, res) => {
        fs.readFile(columns, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/campaigns', (req, res) => {

            res.status(200).send();
    });


    // UPDATE
    app.put('/campaigns/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const campaignId = req.params["id"];
            data[campaignId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`campaign id:${campaignId} updated`);
            });
        },
            true);
    });


    // DELETE
    app.delete('/campaigns/:id', (req, res) => {

        readFile(data => {

            // add the new user
            const campaignId = req.params["id"];
            delete data[campaignId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`campaign id:${campaignId} removed`);
            });
        },
            true);
    });
};

module.exports = campaignRoutes;
