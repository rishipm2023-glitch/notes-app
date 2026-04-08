const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory data store for our notes
let notes = [];
let currentId = 1;

// 1. CREATE: Add a new note
app.post('/notes', (req, res) => {
    const { title, content } = req.body;
    
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNote = {
        id: currentId++,
        title,
        content
    };
    
    notes.push(newNote);
    res.status(201).json(newNote);
});

// 2. READ: Get all notes
app.get('/notes', (req, res) => {
    res.status(200).json(notes);
});

// 3. UPDATE: Edit an existing note by ID
app.put('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
    }

    notes[noteIndex] = { ...notes[noteIndex], title, content };
    res.status(200).json(notes[noteIndex]);
});

// 4. DELETE: Remove a note by ID
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) {
        return res.status(404).json({ error: 'Note not found' });
    }

    notes.splice(noteIndex, 1);
    res.status(204).send(); // 204 means No Content (successful deletion)
});

// Start the server
// Only start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Notes microservice running at http://localhost:${port}`);
    });
}

// Export the app so the test file can use it
module.exports = app;