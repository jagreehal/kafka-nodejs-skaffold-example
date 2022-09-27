import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
const port = 8082;

app.get('/', (req, res) => res.send('Consumer Ready'));

const kafka = new Kafka({
  //   logLevel: logLevel.DEBUG,
  brokers: ['kafka-headless:9092'],
  clientId: 'kafka-consumer-1',
});

const topic = 'EXAMPLE_EVENT_TOPIC';
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let event;
      try {
        event = JSON.parse(message.value!.toString());
        kafka.logger().info('Message processed', {
          topic,
          partition,
          offset: message.offset,
          timestamp: message.timestamp,
          event,
        });
      } catch (e) {
        console.error(`Error parsing message: ${message.value!.toString()}`, e);
      }
    },
  });
};

run().catch((e) =>
  kafka.logger().error(`[kafka-consumer-1] ${e.message}`, { stack: e.stack })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
