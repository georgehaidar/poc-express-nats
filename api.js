const nats = require('nats').connect({'servers': ['nats://nats:4222']})
const express = require('express')

var app = express()

app.get('/products/:id', function (req, res) {
  res.json({
    id: req.params.id,
    attributes: {
      title: 'bloop'
    }
  })
  nats.publish('stats.products.fetch', JSON.stringify({id: req.params.id}))
})
app.get('/reports/products/:id', function (req, res) {
  const {id} = req.params
  const report = []
  const sid = nats.request('reports.products', JSON.stringify({id}), (response) => {
    report.push(JSON.parse(response))
  })
  setTimeout(() => {
    nats.unsubscribe(sid)
    res.json({report})
  }, 100)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

