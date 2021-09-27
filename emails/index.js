const amqplib = require('amqplib');

(async function () {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;

  const connection = await amqplib.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue('send_mail', { durable: true });

  await channel.consume('send_mail', function (message) {
    console.log('# EMAIL -> email sent', message.content.toString());
  }, { noAck: true });

  return;
})();
