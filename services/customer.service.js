const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt')
class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    })
    return rta;
  }
  
  async findOne(id) {
    const customer = await models.Customer.findByPk(id)
    if(!customer) {
      throw boom.notFound('customer not found')
    }
    return customer;
  }

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10)
    const newCustomer = await models.Customer.create({
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }, {include: ['user']})
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id)
    const rta  = await customer.update(changes)
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id)
    await customer.destroy()
    return { id };
  }
}

module.exports = CustomerService;
