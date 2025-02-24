const router = require("express").Router();
const NodeCache = require("node-cache");
const ProductSchema = require("../model/ProductSchema")

const nodeCache = new NodeCache();
//Add Product
router.post("/addproduct", async (req, res) => {

    try {

        let products = await ProductSchema.find({});
        let id;

        if (products.length > 0) {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }

        const product = new ProductSchema({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price
        })

        const savedPost = await product.save();
        nodeCache.del('product_list')
        res.status(200).json({ success: 1, savedPost });

    } catch (error) {

        res.status(500).json(error);

    }

});

//Delete Product
router.delete("/removeproduct", async (req, res) => {

    try {

        await ProductSchema.findOneAndDelete({ id: req.body.id });
        nodeCache.del('product_list')
        res.status(200).json({ success: true, name: req.body.name, message: "Product is Removed" });

    } catch (error) {

        res.status(500).json(error);
    }

});

//Geting all Products
router.get("/allproduct", async (req, res) => {

    try {

        let AllPoducts;

        if (nodeCache.has('product_list')) {
            AllPoducts = JSON.parse(nodeCache.get('product_list'));
        }
        else {
            AllPoducts = await ProductSchema.find({});
            nodeCache.set('product_list', JSON.stringify(AllPoducts));
        }

        res.status(200).json(AllPoducts);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;