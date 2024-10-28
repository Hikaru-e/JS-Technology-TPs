import express from 'express';
import mongoose from 'mongoose';
import bookRoutes from './routes/book.routes';
import path from 'path';

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booktracker')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/api/books', bookRoutes);

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
