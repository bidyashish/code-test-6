const { Kafka } = require('../node_modules/kafkajs')

const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const insertResponse = await pgClient.query({
        text: 'INSERT INTO poi name, lat, lon) VALUES($1, $2, $3)',
        values: [message.value.name, message.value.lat, message.value.lon],
      });

      console.log("Received: ", {
        partition,
        offset: message.offset,
        value: insertResponse,
      });
    },
  });
};
run().catch(console.error);