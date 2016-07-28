const nats = require('nats').connect({'servers': ['nats://nats:4222']})

const sid = nats.subscribe('stats.>', {'queue':'stats'}, function(req, reply, subject) {
  console.log(`[${subject}] - ${req}`)
})
