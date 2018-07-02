const Sequelize = require('sequelize')
const express = require('express')

const sequelize = new Sequelize({
  username: 'rahman',
  password: '12345',
  database: 'testdb',
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate().then(async () => {
  console.log('[mysql] connected!')

  // Create user table
  const User = sequelize.define('user', {
    name: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    age: { type: Sequelize.INTEGER }
  })
  await User.sync()
  
  const app = express()

  app.get('/users', (req, res) => {
    User.findAll().then(data => res.send(data)).catch(err => console.log(err))
  })

  app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
    .then(data => res.send(data))
    .catch(err => console.log(err))
  })

  app.post('/users', (req, res) => {
    User.create({
      name: "Rahman Fadhil",
      email: "rhmnfadhil@gmail.com",
      age: 14
    })
    .then(data => res.send(data))
    .catch(err => console.log(err))
  })

  app.put('/users/:id', (req, res) => {
    User.update({ name: "Updated" }, { where: { id: req.params.id } })
    .then(data => res.send(data))
    .catch(err => console.log(err))
  })

  app.delete('/users/:id', (req, res) => {
    User.destroy({ where: { id: req.params.id } })
    .then(data => res.send({ data }))
    .catch(err => console.log(err))
  })

  app.listen(8000, () => console.log('[server] listening...'))
}).catch((err) => console.log('[mysql] ERROR: ' + err))