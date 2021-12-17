const db = require('../db/PostgresQL')
const ApiError = require('../exceptions/api-error');

class GpsController {
    async createGpsByUser(req, res, next) {
        try {
            const {userId, lat, lon} = req.body
            const candidate = await db.query('SELECT * FROM person where id = $1', [userId])//поиск пользователя с таким id
            if (!candidate || !req.body.userId) {
                throw ApiError.BadRequest('отсутствует id или пользователь с таким id')//кидает Ошибку валидности или отсутвии id
            }
            if (!lat || !lon) {
                throw ApiError.BadRequest('отсутствует координаты')//кидает Ошибку об отсутствии координат
            }
            const location = `(${lat}, ${lon})`
            const newGps = await db.query(
                'INSERT INTO gps (stamp ,location,user_id) ' +
                'values ( $1::timestamp at time zone \'UTC\' , $2, $3) ' +
                'RETURNING *',
                [new Date(), location, userId])
            res.json(newGps.rows[0])
        } catch (e) {
            next(e)
        }

    }

    async getGpsByUser(req, res, next) {
        try {
            const id = req.body.id
            if (!id) {
                throw ApiError.BadRequest('отсутствует id')//кидает Ошибку валидности или отсутвии id
            }
            const candidate = await db.query('SELECT * FROM person where id = $1', [id])//поиск пользователя с таким id
            if (!candidate.rows[0] ) {
                throw ApiError.BadRequest('пользователь с таким id')//кидает Ошибку валидности или отсутвии id
            }
            const {dateIn,dateOut}=req.body
            const allGps = await db.query(
                'SELECT *' +
                'FROM gps ' +
                'where user_id = $1' +
                `${dateIn?`and stamp::timestamp >='${dateIn}'::timestamp at time zone \'UTC\'`:''}`+
                `${dateOut?`and stamp::timestamp <='${dateOut}'::timestamp at time zone \'UTC\'`:''}`+
                'order by id ',
                [id])
            res.json(allGps.rows)
        } catch (e) {
            next(e)
        }

    }


}

module.exports = new GpsController()