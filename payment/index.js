const amqplib = require('amqplib');

(async function () {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;

  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('payment_confirm', { durable: true });

  await channel.consume('payment_confirm', function (message) {
    console.log('# PAYMENT -> confirm', message.content.toString());
  }, { noAck: true });

  return;
})();
