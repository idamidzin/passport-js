const { User } = require('../models');
const generateToken = require('../helper/common');

const login = async function(req, res, next) {
    let findUser = await User.findOne({
        where : { email : req.body.email }
    });
    

    if (!findUser) {
        return res.status(400).send('User not found!');
    }

    let token = generateToken(25);

    const userLogin = User.update({ token : token}, {
        where : { email: req.body.email }
    });

    return res.status(200).send({token, email: req.body.email});
}

module.exports = {
    login
}