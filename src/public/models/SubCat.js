const Sequelize = require("sequelize")
const { getDatabaseTranslatedColumnName } = require("../../../Constants")
const db = require("../database/db")

module.exports = db.sequelize.define(
    "sub_cats", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        cat_id: {
            type: Sequelize.INTEGER
        },

        name: {
            type: Sequelize.STRING,
            field: getDatabaseTranslatedColumnName("name")
        },

        total_products: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        timestamps: false
    }
)