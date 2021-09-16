const { User } = require('../models');
const generateToken = require('../helper/common');

const login = async (req, res) => {
    let findUser = await User.findOne({
        where : { email : req.body.email }
    });

    if (!findUser) {
        return res.status(400).send({
            message: "User not found!"
        });
    }

    let token = generateToken(25);

    let userUpdate = await User.update({ token : token}, {
        where : { id: findUser.id }
    });

    if(userUpdate){
        return res.status(200).send({
            message: "Login Successfully!",
            user: {
                token,
                email: findUser.email,
                name: findUser.name
            }
        });
    }else{
        return res.status(400).send({
            message: "Update failed!"
        });
    }

}

module.exports = {
    login
}