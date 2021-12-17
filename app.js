require('dotenv').config()
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error-middleware')
const userRouter = require('./router/user.routes')
const pgsRouter = require('./router/gps.routes')
const express = require('express')
const app = express()
const port=process.env.PORT || 8000

app.use(cookieParser())
app.use(express.json())


app.use('/api', userRouter)
app.use('/api', pgsRouter)
app.use(errorMiddleware);

const start =  () => {
    try {

        app.listen(port, () => console.log(`Server listen on port ${port}`))

    } catch (e) {
        console.log(e)
    }
}
start()

