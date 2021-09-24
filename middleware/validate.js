const { check } = require("express-validator");

exports.createClient = [
  check("ClientName")
    .exists()
    .withMessage("Client Name Required")
    .notEmpty()
    .withMessage("Client name can not be empty!"),
];
