const Sequelize = require("sequelize")
const { getDatabaseTranslatedColumnName } = require("../../../Constants")
const db = require("../database/db")


module.exports = db.sequelize.define(
    "cats", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING,
            field: getDatabaseTranslatedColumnName("name")
        },

        sub_cats: {
            type: Sequelize.JSON
        },

        total_products: {
            type: Sequelize.INTEGER
        }

    }, 
    {
        timestamps: false
    }
)