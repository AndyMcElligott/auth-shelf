const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "item";'
    console.log('in shelf router.get')
    pool.query(queryText)
        .then(result => {
            console.log(result.rows)
            res.send(result.rows)
        }).catch(error => {
            console.log('error in favorite GET', error)
            res.sendStatus(500);
        })
});


/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    const newItem = req.body;
    const queryText = `INSERT INTO "item" ("description", "image_url")
    VALUES ($1, $2);`;
    const queryValues = [
        newItem.description,
        newItem.imageUrl
    ];
    pool.query(queryText, queryValues)
    .then(()=> {
        res.sendStatus(201);
    }).catch((err) => {
        console.log('Error in router.post on shelf router', err);
        res.sendStatus(500);
    })
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id/:user_id', (req, res) => {
    console.log(req.user.id)
    const id = req.params.id
    const user_id = req.params.user_id
    const loggedin_user = req.user.id
    console.log('in delete route', id)
    if (loggedin_user == user_id) {
        const queryText = 'DELETE FROM "item" WHERE "id" = $1'
        pool.query(queryText, [id])
        .then(() => {res.sendStatus(200)})
        .catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
    } else {
        res.sendStatus(403)
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {

});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {

});

module.exports = router;