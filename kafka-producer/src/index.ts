import express from 'express';
import { Kafka } from 'kafkajs';

const app = express();
const port = 8081;

app.get('/', (req, res) => res.send('Producer Ready'));

app.get('/publish', async (req, res) => {
  try {
    const kafka = new Kafka({
      //   logLevel: logLevel.DEBUG,
      brokers: ['localhost:9092'],
      clientId: 'kafka-producer'
    });
    const producer = kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'EXAMPLE_EVENT_TOPIC',
      messages: [{ value: 'Hello KafkaJS user!' }]
    });
    res.send('Published!');
  } catch (e) {
    console.log(e);
    res.send('FAIL!');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
