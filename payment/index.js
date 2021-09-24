const amqplib = require('amqplib');

(async function () {
  const RABBITMQ_URL =
    'amqps://ujpeqlft:gd86k-IuLubaa65YsyQ8w3TG9pKp5Wtd@shrimp.rmq.cloudamqp.com/ujpeqlft';

  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('payment_confirm', { durable: true });

  await channel.consume('payment_confirm', function (message) {
    console.log('# PAYMENT -> confirm', message.content.toString());
  }, { noAck: true });

  return;
})();
