require('dotenv').config();
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'facturas-consumer',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092'],
})

const mongoose = require('mongoose');
const empresa = require("./models/empresa");
const mail = require('./util/send-mail');

const mySecret = process.env.MONGO_URI || '';

mongoose.connect(mySecret, { useNewUrlParser: false }, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Connected to the mongodb"); 
});

const main = async () => {
  const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID || 'default' });

  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'facturas', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {

      const datosFactura = JSON.parse(message.value.toString());      
      
      empresa.find({rut: datosFactura.rut}, (err, data) => {
        if(err) console.error(err);
        else if (data[0] !== undefined){

          let template = `Estimados, se ha ingresado una nueva factura N° ${datosFactura.factura} para la empresa: ${data[0].rut} - ${data[0].nombre === undefined ? 'Sin nombre': data[0].nombre}.\n` +
          ((data[0].nombre !== undefined && data[0].direccion !== undefined && data[0].telefono !== undefined) ? `Los datos de contacto de la empresa ${data[0].nombre} son:\nDireccion: ${data[0].direccion}\nTelefono: ${data[0].telefono}\nMuchas gracias.`: '');
        
          mail(process.env.MAIL_TO || '', 
              process.env.MAIL_FROM || '', 
                `Nueva factura n° ${datosFactura.factura}`, 
                template);
          
        }
      });
      
    },
  });

}

main();