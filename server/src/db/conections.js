const db = mongoose.connect(
  process.env.MONGO_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  error => {
    if (error) {
      console.log(error)
    } else {
      console.log('Mongo connected')
    }
  }
)

module.exports = db
