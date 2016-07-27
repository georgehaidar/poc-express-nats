const nats = require('nats').connect({'servers': ['nats://nats:4222']})
const uuid = require('node-uuid');

const worker = uuid.v4()

const DB = () => {
  const data = {
    '1': 4832
  }
  return {
    fetch(id, cb) {
      setTimeout(() => cb(null, data[id]), 0)
    }
  }
}

const db = DB()


const sid = nats.subscribe('reports.products', {'queue':'reports.products.views'}, function(req, reply) {
  const pid = JSON.parse(req).id
  db.fetch(pid, (err, views) => {
    nats.publish(reply, JSON.stringify({views, worker}))
  })
})
