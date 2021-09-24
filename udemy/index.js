const amqp = require('amqp-connection-manager');

const sale = {
  name: 'User',
  email: 'user@mail.com',
  age: 85,
  address: 'City, State',
  value: 250,
  products: [
    {
      id: 1,
      teacher: {
        name: 'Teacher 1',
        email: 'teacher1@mail.com',
      },
    },
    {
      id: 2,
      teacher: {
        name: 'Teacher 2',
        email: 'teacher2@mail.com',
      },
    },
  ],
};

(async function () {
  const RABBITMQ_URL = process.env.RABBITMQ_URL;
  const connection = await amqp.connect([RABBITMQ_URL]);

  const channel = await connection.createChannel({
    json: true,
    setup: function (channel) {
      channel.assertQueue('send_mail', { durable: true });
      channel.assertQueue('payment_confirm', { durable: true });
      return channel;
    },
  });

  /**
   * Send to mail queue
   */
  channel.sendToQueue('send_mail', { username: sale.name, email: sale.email });
  console.log('# UDEMY -> message sent!');

  for (const product of sale.products) {
    channel.sendToQueue('send_mail', {
      username: product.teacher.name,
      email: product.teacher.email,
    });
    console.log('# UDEMY -> message sent!');
  }

  /**
   * Send to payment confirm queue
   */
  channel.sendToQueue('payment_confirm', {
    name: sale.name,
    email: sale.email,
    address: sale.address,
    value: sale.value,
    products: sale.products,
  });
  console.log('# UDEMY - payment confirm!');

  return;
})();
