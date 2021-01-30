/**
 * This module implements a REST-inspired webservice for the Mercury Package/Person DB.
 * The database is hosted on ElephantSQL.
 *
 * @author: Andrew Feikema
 * @date: Nov. 2020
 * 
 * Further documentation is located here:
 * https://github.com/calvin-cs262-fall2020-teamA/Service
 */

/** Set up the database connection */

const pgp = require('pg-promise')();
/** 
 * Use case for pg-promise prepared statements described here:
 * https://vitaly-t.github.io/pg-promise/PreparedStatement.html
*/
const {PreparedStatement: PS} = pgp;
const db = pgp({
    host: process.env.SERVER,
    port: 5432,
    database: process.env.USER,
    user: process.env.USER,
    password: process.env.PASSWORD
});

/** Configure the server and its routes */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get("/", readHelloMessage);
router.get("/people", readAllPeople); /** temp function */
router.get("/people/desk/:desk", readDeskPeople);
router.get("/people/hall/:hall", readHallPeople);
router.get("/person/:id", readPerson);
router.put("/person/:id", updatePerson);
//router.post('/people', createPerson);
//router.delete('/people/:id', deletePerson);
router.get("/packages/:dorm/:state", readPackages);
router.get("/packages", readAllPackages); //temp function
router.get("/packages/:state", readStatePackages); //temp function
router.get("/package/:id", readPackage);
router.put("/package/:id", updatePackage);
router.post('/package', createPackage);
//router.delete('/packages/:id', deletePackage);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
})

app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));

/** Implement the CRUD operations */
function errorHandler(err, req, res) {
    if (app.get('env') === "development") {
        console.log(err);
    }
    res.sendStatus(err.status || 500);
}

function readHelloMessage(req, res) {
    res.send('Hello, Mercury Package service!');
}


/** temp function for testing purposes */
function readAllPeople(req, res, next) {
    db.many("SELECT * FROM Person ORDER BY emailPrefix DESC")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

/** Reading Person data by related desk */
async function readDeskPeople(req, res, next) {
    // association between codes for 8 desks and the code for their respective halls
    const deskhalls = {
        'SE': ['SZ', 'EL'],
        'NVW': ['NO', 'VW'],
        'KHVR': ['KL', 'HZ', 'VR'],
        'BHT': ['BL', 'HY', 'TM'],
        'BV': ['BS', 'VE'],
        'BB': ['BO', 'BN'],
        'RVD': ['RK', 'VD'],
        'KE': ['AL', 'BT', 'DL', 'GM', 'KP', 'RH', 'TA', 'PH', 'CH', 'TH', 'EP', 'ZT', 'LD']
    }
    
    let list = [];
    for (const hall of deskhalls[req.params.desk]) {
        let stmt = new PS({name: 'read-desk-' + hall, text: "SELECT * FROM Person WHERE ResidentHall = $1", values: [hall]})
        await db.many(stmt)
        .then(data => {
            list.push(...data)
        })
        .catch(err => {
            next(err);
        })
    };
    res.send(list);
}

/** Reading Person data by residence hall */
function readHallPeople(req, res, next) {
    let stmt = new PS({name: 'read-hall-people', text: "SELECT * FROM Person WHERE ResidentHall = $1", values: [req.params.hall]})
    db.many(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

/** Reading single Person data by unique emailPrefix id */
function readPerson(req, res, next) {
    let stmt = new PS({name: 'read-person', text: "SELECT * FROM Person WHERE emailPrefix = $1", values: [req.params.id]})
    db.oneOrNone(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

/** Update any fields of a person by emailPrefix ID */
function updatePerson(req, res, next) {
    let text = "UPDATE Person SET "
    let values = [req.params.id]
    let fields = [
        ["firstname", req.query.firstname], 
        ["lastname", req.query.lastname], 
        ["ResidentHall", req.query.ResidentHall], 
        ["ResidentRoom", req.query.ResidentRoom], 
        ["isDeskie", req.query.isDeskie]];

    let i = 2;
    for (param in fields) {
        console.log(fields[param])
        if (fields[param][1]) {
            text += `${fields[param][0]} = $${i}, `
            values.push(fields[param][1])
            i++;
        }
    }
    text = text.slice(0, text.length - 2) + " WHERE emailPrefix = $1 RETURNING *";
    console.log(text)
    console.log(values)
    let stmt = new PS({name: 'update-person', text: text, values: values})
    db.oneOrNone(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

/** temp function for testing purposes */
function readAllPackages(req, res, next) {
    let text = req.query.persondata ? 
        "SELECT * FROM Package, Person WHERE Recipient = emailPrefix ORDER BY enteredTime DESC" : 
        "SELECT * FROM Package ORDER BY enteredTime DESC"
    db.many(text)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

/** temp function for testing purposes */
function readStatePackages(req, res, next) {
    let text = req.query.persondata ? 
    "SELECT * FROM Package, Person WHERE Recipient = emailPrefix AND Status = $1 ORDER BY enteredTime DESC" : 
    "SELECT * FROM Package WHERE Status = $1 ORDER BY enteredTime DESC"
    let stmt = new PS({name: 'read-state-packages', text: text, values: [req.params.state]})
    db.many(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
}

/** Reading Package data by unique ID */
function readPackage(req, res, next) {
    let text = req.query.persondata ? 
    "SELECT * FROM Package, Person WHERE Recipient = emailPrefix AND ID = $1" : 
    "SELECT * FROM Package WHERE ID = $1"
    let stmt = new PS({name: 'read-package', text: "SELECT * FROM Package WHERE ID = $1", values: [req.params.id]})
    db.oneOrNone(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

/** Reading Package entry by Desk-specific DeskID and Building */
function readPackages(req, res, next) {
    if (req.query.deskid) {
        let text = req.query.persondata ? 
        "SELECT * FROM Package, Person WHERE Recipient = emailPrefix AND DeskID = $1 AND Desk = $2 AND Status = $3 ORDER BY EnteredTime DESC" : 
        "SELECT * FROM Package WHERE DeskID = $1 AND Desk = $2 AND Status = $3 ORDER BY EnteredTime DESC"
        let stmt = new PS({name: 'read-packages', text: text, values: [req.query.deskid, req.params.dorm, req.params.state]})
        db.oneOrNone(stmt)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                next(err);
            });
    } else {
        let text = req.query.persondata ? 
            "SELECT * FROM Package, Person WHERE Recipient = emailPrefix AND Desk = $1 AND Status = $2 " :
            "SELECT * FROM Package WHERE Desk = $1 AND Status = $2 "
        let values = [req.params.dorm, req.params.state]
        if (req.query.recipient) {
            text += "AND Recipient = $3 ";
            values.push(req.query.recipient);
        } 
        text += "ORDER BY EnteredTime DESC"
        db.many(new PS({name: 'read-packages', text: text, values: values}))
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        })
    }
}

/** Update Package entry by unique ID */
function updatePackage(req, res, next) {
    let text = "UPDATE Package SET "
    let values = [req.params.id]
    let fields = [
        ["DeskID", req.query.deskid], 
        ["Recipient", req.query.recipient], 
        ["Desk", req.query.desk], 
        ["Status", req.query.status],
        ["EnteredTime", req.query.enteredtime],
        ["EnteredDeskie", req.query.entereddeskie],
        ["ReceivedTime", req.query.receivedtime],
        ["ReceivedDeskie", req.query.receiveddeskie],
        ["Size", req.query.size],
        ["Color", req.query.color],
        ["Type", req.query.type]

    ];

    let i = 2;
    for (param in fields) {
        console.log(fields[param])
        if (fields[param][1]) {
            text += `${fields[param][0]} = $${i}, `
            values.push(fields[param][1])
            i++;
        }
    }
    text = text.slice(0, text.length - 2) + " WHERE ID = $1 RETURNING *";
    console.log(text)
    console.log(values)
    let stmt = new PS({name: 'update-package', text: text, values: values})
    db.oneOrNone(stmt)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            next(err);
        });
}

/** Generates random universally unique ID and Desk-wise unique DeskID for a new package*/
async function NewIDs(deskname) {
    let temp_desk_id, rn, temp_id, response;
    await db.many(new PS({ 
        name: 'desk-ids', 
        text: `SELECT DeskID FROM Package WHERE Status = 'Entered' and Desk = $1`, 
        values: [deskname]}))
    .then(resp => {
        let deskids = new Set(resp.map(resp => resp.deskid))
        //console.log(resp)
        //console.log(deskids)
        do {temp_desk_id = Math.floor(Math.random() * 1000) 
        //console.log("temp desk id: " + temp_desk_id)
        } while (deskids.has(temp_desk_id))
    })
    do {
        rn = Math.floor(Math.random() * 999000 + 1000);
        //console.log("rn: " + rn)
        temp_id = rn - rn % 1000 + temp_desk_id;
        await db.oneOrNone(`SELECT ID FROM Package WHERE ID = '${temp_id}'`).then(resp => {response = resp})
    } while (response)
    return [temp_id, temp_desk_id];
}

/** Package entry method */
async function createPackage(req, res, next) {
    const nodemailer = require("nodemailer");
    const fs = require('fs');
    const parser = require('node-html-parser');

    let ids = await NewIDs(req.body.desk)
    let firstname;
    //console.log("Generated IDs: " + ids)
    
    let values = [ids[0], ids[1], req.body.recipient, req.body.desk, req.body.status, new Date().toISOString(), req.body.entereddeskie, req.body.receivedtime? req.body.receivedtime: null, req.body.receiveddeskie? req.body.receiveddeskie: null, req.body.size? req.body.size:"", req.body.color? req.body.color:"", req.body.type? req.body.type:""]
    // Package entry statement
    let stmt = new PS({name: 'create-package', text: "INSERT INTO Package (ID, DeskID, Recipient, Desk, Status, EnteredTime, EnteredDeskie, ReceivedTime, ReceivedDeskie, Size, Color, Type) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *", values: values})
    // Finding first name statement
    let stmt2 = new PS({name: 'read-person-name', text: "SELECT firstName FROM Person WHERE emailPrefix = $1", values: [req.body.recipient]})
    await Promise.all([
        db.one(stmt)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                next(err);
                res.send(err);
                return;
            }),
    
        db.one(stmt2)
            .then(name => {
                firstname = name.firstname;
            })
            .catch(err => {
                next(err);
            })
    ])

    // establish SMTP connection
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
        user: "mercury.notifier.test@gmail.com", // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
        },
    });

    // parse email document
    const file = parser.parse(fs.readFileSync("./email.html", 'utf-8'))
    //substitute values
    file.querySelector("#val-desk-id").set_content(String(ids[1]));
    file.querySelector("#val-name").set_content(firstname);
    file.querySelector("#val-desk-code").set_content(req.body.desk);
    file.querySelector("#val-id").set_content(String(ids[0]));
    file.querySelector("#val-size").set_content(req.body.size);
    file.querySelector("#val-color").set_content(req.body.color);
    file.querySelector("#val-type").set_content(req.body.type);

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Mercury Package Notifier" <mercury.notifier.test@gmail.com>', // sender address
        to: req.body.recipient + "@students.calvin.edu", // list of receivers
        subject: "New Package", // Subject line
        html: file.toString() // html body
    });
    
}
