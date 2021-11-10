const { models } = require('../libs/sequelize')

class OrderService {

  constructor(){
  }

  async find() {
    const orders = await models.Order.findAll()
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {include: [{association: 'customer', include: ['user']}, 'items']})
    return order
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [{
        association: 'customer',
        include: ['user']
      }],
    })
    return orders
  }

  async create(userId) {
    const customer = await models.Customer.findOne({where: userId})
    const newOrder = await models.Order.create({customerId: customer.id})
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
