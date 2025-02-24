const router = require('express').Router();
const jwt = require('jsonwebtoken')
const UserSchema = require('../model/UserSchema');


//creating middleware to fetch user
const fetchUser = async (req, res, next) => {

    const token = req.header('auth-token');
    
    if (!token) {
        res.status(401).json({ error: 'Please authenticate using a valid token' })
    }
    else {
        try {

            const data = jwt.verify(token, 'Secret_Ecom');
            req.user = data.id
            next();

        } catch (error) {
            res.status(401).json({ error: 'Please authenticate using a valid token' })
        }
    }
}

router.post('/addtocart', fetchUser, async (req, res) => {

    try {

        let userData = await UserSchema.findOne({ _id: req.user });

        userData.cartData[req.body.itemId] += 1;

        await UserSchema.findOneAndUpdate({ _id: req.user }, { cartData: userData.cartData });

        res.status(200).json("Added Cart Data");

    } catch (error) {
        res.status(400).json("Not Added Cart Data");
    }

})

router.post('/removetocart', fetchUser, async (req, res) => {

    try {

        let userData = await UserSchema.findOne({ _id: req.user });

        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
        }

        await UserSchema.findOneAndUpdate({ _id: req.user }, { cartData: userData.cartData });

        res.status(200).json("Removed Cart Data");

    } catch (error) {
        res.status(400).json("Not Removed Cart Data");
    }

})

router.post('/getcartdata', fetchUser,async (req, res) => {

    try {

        let UserData = await UserSchema.findOne({_id : req.user});

        res.status(200).json(UserData.cartData);
        
    } catch (error) {
        res.status(400).json("Not Get Cart Data");
    }
});


module.exports = router;