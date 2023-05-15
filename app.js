const express = require('express');
const multer = require('multer');
const parseCSV = require('./csvParser');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.single('csvFile'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const parsedData = await parseCSV(filePath);
    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse CSV file' });
  }
});

app.listen(5500, () => {
  console.log('Server is listening on port 5500');
});
