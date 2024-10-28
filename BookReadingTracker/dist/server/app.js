"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/booktracker')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Middleware to serve static files
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'dist')));
app.use('/api/books', book_routes_1.default);
// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'dist', 'index.html'));
});
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
