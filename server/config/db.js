const mongoose = require('mongoose')
const chalk = require('chalk')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log(chalk.bgGreen('MongoDB Connected...'))
    } catch (err) {
        console.log(err.message)
        process.exit(1) // to exit process with failure
    }
}

module.exports = connectDB
