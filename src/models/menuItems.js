const mongoose = require('mongoose')
const schema = mongoose.Schema;

const menu_itemsSchema = schema({
    IdEmpresa: String,
    key: String,
    label: String,
    isTitle: Boolean,
    icon: String,
    children: Array,
    
})

const menu_items = mongoose.model("menu_items", menu_itemsSchema)
module.exports = menu_items;