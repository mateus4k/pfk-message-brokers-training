const amqplib = require('amqplib');

(async function () {
  const RABBITMQ_URL =
    'amqps://ujpeqlft:gd86k-IuLubaa65YsyQ8w3TG9pKp5Wtd@shrimp.rmq.cloudamqp.com/ujpeqlft';

  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('send_mail', { durable: true });

  await channel.consume('send_mail', function (message) {
    console.log('# EMAIL -> email sent', message.content.toString());
  }, { noAck: true });

  return;
})();
