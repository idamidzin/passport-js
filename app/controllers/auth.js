const { User } = require('../models');
const generateToken = require('../helper/common');

const Octopus = require('@usetada/octopus');
const octopus = Octopus();
const NSQ = octopus.NSQ({
  NSQ: [
    {
      host: 'localhost',
      port: 4150,
    },
  ],
});

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

    NSQ.Publish('MSG_ACTION', {
        msg: `${req.body.email} mencoba login!`,
        token
    });

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