const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./models")
const PORT = 8000

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/user", require("./routes/UserRoutes"))
app.use("/api/posts", require("./routes/PostRoutes"))

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || PORT, () => {
        console.log('Server running')
    })
})