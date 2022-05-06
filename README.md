# Kafka Skaffold Example

to run:

```shell
skaffold dev
```

## Not working :(

Possible fix: [Kafka Listeners - Explained](https://rmoff.net/2018/08/02/kafka-listeners-explained/)

## Workaround for now

```shell
docker-compose up
pnpm dev
```

Then visit [http://localhost:8081/publish](http://localhost:8081/publish)

and watch the console output for `kafka-consumer1`
