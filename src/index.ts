import express from 'express';
import bookRoutes from './routes/books';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
const port = 3000;

app.use('/books', bookRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('Code Monkey API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});