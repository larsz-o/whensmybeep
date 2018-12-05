const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    if (req.isAuthenticated){
        const query = `SELECT * FROM "medications" WHERE "user_id" = $1;`; 
        pool.query(query, [req.user.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log('error getting medications', error); 
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});
router.get('/countdown', (req, res) => {
if (req.isAuthenticated){
    const medToGet = req.query.id;
    const query = `SELECT * FROM "medications" WHERE "id" = $1;`;
    pool.query(query, [medToGet]).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting medication records', error);
        res.sendStatus(500); 
    });
} else {
    res.sendStatus(403);
    }
})
router.post('/', (req, res) => {
    if (req.isAuthenticated){
    const query = `INSERT INTO "medications" ("name", "room_id", "user_id", "expiration_time") VALUES ($1, $2, $3, $4);`;
    const newMed = req.body;
    pool.query(query, [newMed.name, newMed.room_id, req.user.id, newMed.expiration_time]).then((results) => {
            res.sendStatus(200); 
    }).catch((error) => {
            console.log('error posting medications', error);
            res.sendStatus(500); 
    });
} else {
    res.sendStatus(403);
}
});
router.put('/', (req, res) => {
    if (req.isAuthenticated){
    const query = `UPDATE "medications" SET "time_end" = $1, "expired" = $2, "expiration_time" = $3 WHERE "id" = $4;`; 
    pool.query(query, [req.body.time_end, req.body.expired, req.body.expiration_time, req.body.id]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error updating your timer', error);
        res.sendStatus(500); 
    });
} else {
    res.sendStatus(403);
}
});
router.delete('/', (req, res) => {
    if (req.isAuthenticated){
    const medToDelete = req.query.id;
    const query = `DELETE FROM "medications" WHERE "id" = $1;`;
    pool.query(query, [medToDelete]).then((results) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error deleting medication', error);
        res.sendStatus(500);
    });
} else {
    res.sendStatus(403);
}
})
module.exports = router; 