const express = require("express");
const router = express.Router();


const User = require("../models/user.model");
const sendEmail = require("../utils/send-mail");


router.post("/", async function (req, res) {
    
    try {
        const user = await User.create(req.body);
        
        await sendEmail({
            to: user.email, // list of receivers
            subject: `Welcome to ABC system ${user.first_name, user.last_name}`, // Subject line
            text: `Hi ${user.first_name}, Please confirm your email address`, // plain text body
        });
  
         
         await sendEmail({
            to: "admin1@gmail.com, admin2@gmail.com, admin3@gmail.com, admin4@gmail.com, admin5@gmail.com", // list of receivers
            subject: `${user.first_name} ${user.last_name} has registered with us`, // Subject line
            text: `Please welcome ${user.first_name} ${user.last_name}`, // plain text body
        });

        return res.status(201).send(user);
    } catch(err) {
        return res.status(500).send(err.message);
    }
});

router.get("/", async function (req, res) {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;

        const user = await User.find().skip(offset).limit(size).lean().exec();
        const totalPages = Math.ceil((await User.find().countDocuments()) / size);

        return res.status(201).send({users: user, totalPages});
    } catch(err) {
        return res.status(500).send(err.message);
    }
});



module.exports = router;