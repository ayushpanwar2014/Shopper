const router = require('express').Router();
const ProductSchema = require('../model/ProductSchema')

router.get('/newcollection', async (req, res) => {

    try {

        let Products = await ProductSchema.find({});
        let newcollection = Products.slice(1).slice(-8);

        res.status(200).json(newcollection);

    } catch (error) {
        res.status(400).json('Cannot Fetch New Collection')
    }

});

module.exports = router;