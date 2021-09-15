const User = require('../../models').User;

const list = (req, res) => {
    return User.findAll({
            attributes: ['name', 'email']
        })
        .then((user) => res.status(200).send(user))
            .catch((error) => {
                res.status(400).send(error);
            });
}

const store = (req, res) => {
    return User.create({
        name: req.body.name,
        email: req.body.email
    }).then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
}

const getById = (req, res) => {
    return User.findByPk(req.params.id)
            .then((user) => res.status(201).send(user))
                .catch((error) => {
                    res.status(400).send(error)
                });
}

const update = (req, res) => {
    return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user.update({
                    name: req.body.name || user.name,
                    email: req.body.email || user.email
                })
                .then((user) => res.status(200).send(user))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) =>res.status(400).send(error));
}

const deletes = (req, res) => {
    return User.findByPk(req.params.id)
            .then((user) => {
                if (!user) {
                    return res.status(404).send({
                        message: 'User Not Found',
                    });
                }
                return user
                    .destroy()
                    .then((user) => res.status(200).send({
                        message: 'Berhasil Dihapus!'
                    }))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) =>res.status(400).send(error));
}

module.exports = {
    list,
    store,
    getById,
    update,
    deletes
}