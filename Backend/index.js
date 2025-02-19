const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Create a MySQL pool instead of a single connection
const db = mysql.createPool({
  connectionLimit: 10,
  port: 3306,
  host: "Hostname",
  user: "Username",
  password: "DatabasePassword",
  database: "databaseName",
});

// Handle database errors
db.on('error', (err) => {
  console.error('Database error:', err);
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Successfully connected to the database!");
    connection.release(); // Release the connection
  }
});

// Routes
app.get("/getData", (req, res) => {
  console.log("got request for dishs names")
  db.query("SELECT * FROM dishes_items", (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send({ message: "Error while fetching data" });
    }
    if (result.length > 0) {
      res.send({ getData: result }).status(200);
    } else {
      res.status(404).send({ message: "No data found" });
    }
  });
});

app.get("/dishes/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM dishes_details WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send({ message: "Error while fetching data" });
    }
    if (result.length > 0) {
      res.send({ getData: result }).status(200);
    } else {
      res.status(404).send({ message: "No data found" });
    }
  });
});

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  // Validate request body
  if (!username || !password || !email) {
    return res.status(400).send({ message: "Username, password, and email are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('SELECT * FROM user_details WHERE user_name = ?', [username], (err, result) => {
      if (err) {
        console.error("Error checking username:", err);
        return res.status(500).send({ message: "Database error: " + err.message });
      }

      if (result.length === 0) {
        db.query('INSERT INTO user_details (user_name, hashedPassword, e_mail) VALUES (?, ?, ?)', [username, hashedPassword, email], (err, result) => {
          if (err) {
            console.error("Error inserting user:", err);
            return res.status(400).send({ message: "Invalid Credentials: " + err.message });
          }
          res.status(200).send({ message: "Registration Successful" });
        });
      } else {
        res.status(400).send({ message: "Username/email already exists, please try new credentials" });
      }
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal Server Error: " + error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM user_details WHERE user_name = ?", [username], async (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length > 0) {
      const isPassMatch = await bcrypt.compare(password, result[0].hashedPassword);
      
      if (isPassMatch) {
        const payload = { username: username };
        const jwtToken = jwt.sign(payload, process.env.JWT_SECRET || "MY_SECRET_TOKEN", { expiresIn: "1h" });
        return res.json({ jwtToken: jwtToken });
      } else {
        return res.status(401).json({ message: "Wrong username/password combination!" });
      }
    } else {
      return res.status(401).json({ message: "Wrong username/password combination!" });
    }
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send({ message: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
