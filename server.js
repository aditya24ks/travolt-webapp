const { Pool } = require("pg");
const pool = new Pool({
  connectionString: "postgres://username:password@localhost:5432/travelbuddy"
});

// Add a new user
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  // For beginners, skip password hashing - add later!
  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password]
  );
  res.json(result.rows[0]);
});

// Get all trips
app.get('/api/trips', async (req, res) => {
  const result = await pool.query("SELECT * FROM trips");
  res.json(result.rows);
});

// In your main.js
fetch('http://localhost:3000/api/trips')
  .then(res => res.json())
  .then(trips => {
    // Add code here: show trips on homepage
    console.log(trips); // See the trips!
  });
