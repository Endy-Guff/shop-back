import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'My API',
        description: 'API Documentation',
    },
    host: process.env.API_URL,
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routers/auth-router.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
