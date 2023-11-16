import express from 'express';
import bookRoutes from './routes/books';

const app = express();
const port = 3000;

app.use('/books', bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});