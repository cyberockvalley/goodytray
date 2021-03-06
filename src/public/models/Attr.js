const Sequelize = require("sequelize")
const { getDatabaseTranslatedColumnName } = require("../../../Constants")
const db = require("../database/db")

module.exports = db.sequelize.define(
    "attrs", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        attr_key: {
            type: Sequelize.STRING,
            field: getDatabaseTranslatedColumnName("attr_key")
        },

        attr_value: {
            type: Sequelize.STRING,
            field: getDatabaseTranslatedColumnName("attr_value")
        },

        cat_id: {
            type: Sequelize.INTEGER
        },

        sub_cat_id: {
            type: Sequelize.INTEGER
        },

        attr_type: {
            type: Sequelize.STRING
        },

        allow_null: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        timestamps: false
    }
)