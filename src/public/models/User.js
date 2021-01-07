const Sequelize = require("sequelize")
const db = require("../database/db")

var user = db.sequelize.define(
    "users", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        username: {
            type: Sequelize.STRING,
        },

        fullname: {
            type: Sequelize.STRING,
        },
        
        profile_photo: {
            type: Sequelize.STRING,
        },

        email: {
            type: Sequelize.STRING,
        },

        password: {
            type: Sequelize.STRING,
        },

        number: {
            type: Sequelize.STRING,
        },

        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        last_seen: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        validated: {
            type: Sequelize.INTEGER,
        },

        email_verification_key: {
            type: Sequelize.STRING,
        },

        password_reset_key: {
            type: Sequelize.STRING,
        },

        cookie: {
            type: Sequelize.STRING,
        },

        cookie_exp: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },

        rank: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    }, 
    {
        timestamps: false
    }
)
module.exports = user