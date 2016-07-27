const nats = require('nats').connect({'servers': ['nats://nats:4222']})
const uuid = require('node-uuid');

const worker = uuid.v4()

const DB = () => {
  const data = {
    '1': Math.floor(Math.random() * 1000)
  }
  return {
    fetch(id, cb) {
      setTimeout(() => cb(null, data[id]), 0)
    }
  }
}

const db = DB()

const sid = nats.subscribe('reports.products', {'queue': 'reports.products.inventory'}, function(req, reply) {
  const pid = JSON.parse(req).id
  db.fetch(pid, (err, inventory) => {
    nats.publish(reply, JSON.stringify({inventory, worker}))
  })
})
