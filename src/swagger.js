import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes.js'];

// generate swagger.json
swagger(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger generated');
});