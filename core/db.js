const Sequelize = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        timestamps: true,
        paranoid : true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deleteDaT: 'deleted_at',
        underscored: true
    }
})

sequelize.sync()

module.exports = {
    sequelize
}