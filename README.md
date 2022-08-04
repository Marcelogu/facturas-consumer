# facturas-consumer

Proceso que se comunica con el ejemplo del repositorio facturas-kafka-webflux.

Requiere un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

    KAFKA_CLIENT_ID= Id del suscriptor al tópico facturas, por defecto es facturas-consumer
    KAFKA_BOOTSTRAP_SERVERS= La dirección del cluster de apache kafka, por defecto es localhost:9092
    MONGO_URI= Una url de conexión con alguna base de datos mongodb
    KAFKA_GROUP_ID= Id del grupo en apache kafka, el valor por defecto es default
    KAFKA_TOPIC= Nombre del topico al cual suscribir, en este caso es facturas

<br>Para el envío de mail se requiere contar además con un servidor de correo (recomiendo mailtrap para realizar pruebas) y agregar las siguientes variables al archivo .env

    MAIL_TO= Mail del emisor
    MAIL_FROM= Mail del destinatario
    HOST_MAIL= Nombre del host del servidor de correo
    PORT_MAIL= Numero del puerto, por defecto 2525
    USER_MAIL= Nombre de usuario del servidor de correo
    PASSWORD_MAIL= Password del usuario del servidor de correo (se recomienda usar un servicio para almacenar estos datos sensibles)

## Esquema de base de datos

Se requiere contar con un documento llamado empresas en algún cluster de mongodb, con el siguiente schema:

    rut : {
        type: String
    },
    nombre : {
        type: String
    },
    direccion: {
        type: String
    },
    telefono: {
        type: String
    }
