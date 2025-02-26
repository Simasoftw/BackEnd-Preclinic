const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Schema = schema({
    nombre: String,
    arrayRangos: Array
});

const rangoDesempeno = mongoose.model("rangoDesempeno", Schema);
module.exports = rangoDesempeno;
