const User= require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const postRegister = async (req,res)=>{
    try {
        const { username, mail, password} = req.body;
        const userExists = await User.exists({mail})
        if (userExists) {
            return res.status(409).send('email already exist');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password : encryptedPassword,
            mail : mail.toLowerCase()
        });


        const token = jwt.sign({
            userId: user._id,
            mail
        },
        process.env.TOKEN_KEY,{
            expiresIn : '24h'
        });

        res.status(201).json({
            userDetail: {
                mail : user.mail,
                username : user.username,
                token: token,
                password : user.password
            },
        });
    } catch (error) {
        return res.status(500).send('error 500');
    }
};

module.exports = postRegister;