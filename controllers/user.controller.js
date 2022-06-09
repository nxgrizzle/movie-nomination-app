const db = require("../models");
const uuid = require("uuid");
const User = db.user;

exports.createUser = (req, res) => {
  const id = uuid.v1();
  User.create({
    access_token: id,
    slug: id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getUser = (req, res) => {
  User.findOne({
    where: {
      access_token: req.params.id,
    },
    include: [
      {
        all: true,
        nested: true,
      },
    ],
  })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send(err);
    });
};
