const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    "cities", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: Sequelize.STRING
        },

        state_id: {
            type: Sequelize.INTEGER
        }
    }, 
    {
        timestamps: false
    }
)