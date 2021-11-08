const express = require('express')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema')
const ProductService = require('../services/product.service')

const router = express.Router()
const service = new ProductService()

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res) => {
  const products = await service.find(req.query)
  res.json([products])
})

router.get('/filter', async (req, res) => {
  res.send('soy un filter')
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await service.findOne(id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body
  const product = await service.create(body)
  res.status(201).json({
    message: 'Created',
    data: product
  })
})

router.patch('/:id', [
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body')
], async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const body = req.body
  res.json({
    message: 'Updated',
    data: body,
    id
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const rta = await service.delete(id)
  res.json(rta)
})

module.exports = router
