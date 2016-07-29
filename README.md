# Nats.io Proof of Concept

## Assumptions

I assume you have [Docker for Mac](https://docs.docker.com/engine/installation/mac/#/docker-for-mac) setup

## Running it

    docker-compose up

## Interacting

Watch the logs as you run these

  curl -s http://localhost:3000/reports/products/1
  curl -s http://localhost:3000/products/1

Once running running you can mess around with scaling services to see queue
groups in action.

    docker-compose scale us1=1 us2=2 us3=4 us4=1

If you want to see things in action more interactively (particularly worker queues)

    brew install watch jq

    watch -n 1 'curl -s http://localhost:3000/reports/products/1 | jq ".report|sort"'

Try scaling some of the service to 0 and back up 1 to see the effects
