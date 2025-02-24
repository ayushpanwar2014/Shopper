const router = require('express').Router();
const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


router.post('/register', async (req, res) => {

    try {
        //Checking for User if Exist in database
        let check = await UserSchema.findOne({ email: req.body.email });

        if (check) {
            return res.status(400).json({ success: false, error: "Email Already Exist!" });
        }

        //putting empty cart in database for individual user
        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = await new UserSchema({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            cartData: cart
        })

        await newUser.save();

        const data = {
            user: {
                id: newUser.id
            }
        }

        const token = jwt.sign(data, "Secret_Ecom")

        res.status(200).json({ success: true, token });

    } catch (error) {

        res.status(400).json({ success: false, error });
    }

});

router.post('/login', async (req, res) => {

    try {

        const user = await UserSchema.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ success: false, error: "Wrong Email!" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(400).json({ success: false, error: "Wrong Password!" });
        }

        const age = 1000 * 60 * 60 * 24 * 2;

        const token = jwt.sign(
            {
                id: user.id,
            },
            "Secret_Ecom",
            { expiresIn: age },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: age,
            sameSite: 'lax'
        }).status(200).json({ success: true, token });


    } catch (error) {
        res.status(400).json({ success: false, error });
    }
});

router.post('/logout', async (req, res) => {

    res.clearCookie('auth-token').status(200).json({ success: true, message: "LogOut SuccesFully!" });

});

module.exports = router;
