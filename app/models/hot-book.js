const {Sequelize, Model, Op} = require('sequelize')
const { sequelize } = require('../../core/db')
const {Favor} = require('@models/favor')

class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: ['index']
        })
        const ids = []
        books.forEach(book => {
            ids.push(book.id )
        })
        const favors = await Favor.findAll({
            where: {
                artId: {
                    [Op.in]: ids
                }
            },
            group: ['artId'],
            attributes: ['artId', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        books.forEach(book => {
            HotBook._getEachBokStatus(book, favors)
        })
        return books
    }

    static _getEachBokStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (favor.id === book.artId) {
                count = favor.get('count')
            }
        })
        book.setDataValue('count', count)
        return book
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}