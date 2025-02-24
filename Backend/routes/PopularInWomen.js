const router = require('express').Router();
const ProductSchema = require('../model/ProductSchema');


router.get('/popularinwomen', async (req, res) => {

    try {

        let products = await ProductSchema.find({category: 'women'});

        let popular_in_Women = products.slice(0,4);

        res.status(200).json(popular_in_Women)

        
    } catch (error) {
        res.status(400).json('Cannot Fetch Popular In Women!')
    }
});

module.exports = router;