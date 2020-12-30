const Sequelize = require("sequelize")
const db = require("../database/db")

var review = db.sequelize.define(
    "reviews", 
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        user_id: {
            type: Sequelize.INTEGER
        }, 

        product_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'product',
                key: 'id'
            },
            field: 'product_id'
        },

        experience_id: {
            type: Sequelize.INTEGER
        },

        weight: {
            type: Sequelize.INTEGER
        },

        body: {
            type: Sequelize.STRING
        },

        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, 
    {
        timestamps: false
    }
)


review.associate = models => {
    review.belogsTo(models.product);
    //review.hasMany(models.product, {foreignKey: 'product_id',sourceKey: 'id'});

}

module.exports = review