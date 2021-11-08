const express = require('express')
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')
const routerApi = require('./routes')
const app = express()
const port = process.env.PORT || 3001
// const whiteList = ['http://localhost:8080']
// const options = {
//   origin: (origin, callback) => {
//     if(whiteList.includes(origin) || !origin) {
//       callback(null, true)
//     }else {
//       callback(new Error('Access denied'))
//     }
//   }
// }

app.use(express.json())
// app.use(cors(options))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hello, I am the new route ')
})

routerApi(app)

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params
  res.json({
    categoryId,
    productId
  })
})

app.get('/people/:id/products', (req, res) => {
  const { id } = req.params
  res.json({
    id
  })
})

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
