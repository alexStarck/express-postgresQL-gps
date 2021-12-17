const db = require('../db/PostgresQL')
const ApiError = require('../exceptions/api-error');

class UserController {
    async createUser(req, res, next) {
        try {
            const {name, surname} = req.body
            if(!name || !surname){
                throw ApiError.BadRequest('некоректный запрос')//кидает Ошибку об отсутствии id
            }
            const user = await db.query('SELECT * FROM person where name = $1 and surname = $2', [name,surname])
            if (user.rows[0]) {
                throw ApiError.BadRequest('Пользователь уже существует')//кидает Ошибку если такой пользователь уже в бд
            }
            const newPerson = await db.query('INSERT INTO person (name,surname) values ($1,$2) RETURNING *', [name, surname])
            res.json(newPerson.rows[0])
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await db.query('SELECT * FROM person')//ищем всех пользователей в бд
            res.json(users.rows)
        } catch (e) {
            next(e)
        }

    }

    async getUserById(req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                throw ApiError.BadRequest('отсутствует id')//кидает Ошибку об отсутствии id
            }
            const user = await db.query('SELECT * FROM person where id = $1', [id])
            if (!user.rows[0]) {
                throw ApiError.BadRequest('Пользователь не найден')//кидает Ошибку об отсутствии пользователя в бд
            }
            res.json(user.rows[0])
        } catch (e) {
            next(e)
        }

    }


}

module.exports = new UserController()