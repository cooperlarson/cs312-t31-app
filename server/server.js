import express from 'express';
import http from 'http';
import cors from 'cors';
import { getTable, runQuery } from './mysql-connector.js';

const app = express();
const webServer = http.createServer(app);

app.use(cors());
app.use(express.json());

webServer.listen(8443, () => console.log("server live at http://localhost:8443/"));

app.get('/', (req, res) => {
  res.send("server is live");
});

app.get('/test/', async (req, res) => {
  try {
    const data = await getTable("SELECT * FROM cs312_t31.test;");
    res.json(data);
  } catch (err) {
    console.error('Error in /test route:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/colors/', async (req, res) => {
  try {
    return res.send(await getTable("SELECT * FROM cs312_t31.colors;"));
  } catch (err) {
    console.error('GET /api/colors failed:', err);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/api/colors/', async (req, res) => {
  const { name, hex } = req.body;

  if (!name || !hex) return res.status(400).json({ error: 'Missing name or hex value.' });

  try {
    const result = await runQuery(
      'INSERT INTO cs312_t31.colors (name, hex) VALUES (?, ?);',
      [name, hex]
    );
    res.status(201).json({ success: true, insertedId: result.insertId });
  } catch (err) {
    console.error('POST /api/colors failed:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/colors/', async (req, res) => {
  const { name, hex } = req.body;
  // TODO: Validate name + hex inputs (basic string format check)
  // TODO: Execute SQL update using name as the identifier
  // TODO: Return 404 if no rows were updated
});


app.delete('/api/colors/', async (req, res) => {
  const { name } = req.body;
  // TODO: Validate name exists in body
  // TODO: Execute SQL delete by name
  // TODO: Return 404 if no matching color was deleted
});
