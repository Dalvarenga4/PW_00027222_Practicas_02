// app.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import * as controllers from "./controllers/controllers.js";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // Use a strong, secure key in production

app.use(bodyParser.json());
app.use(cors());

const users = [
  {
    id: 1,
    name: "Jerry",
    email: "jerry@example.com",
    password: "$2b$10$XOHI0.vg73ve9Oy73lqU5.W//tVQuqMIAKJn3n25ZA2DUF.YGm6vq" // bcrypt hash
  }
];

const generarteHash = async (password) => {
    const passwordOriginal = "1234";
    const saltRounds = 10;

    const hash = await bcrypt.hash(passwordOriginal, saltRounds);
    console.log("Contraseña original:", passwordOriginal);
    console.log("Hash generado:", hash);
};

// Middleware: Verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.get('/users', controllers.getUsers);
app.post('/users', verifyToken, controllers.createUser);
app.put("/users/:id", verifyToken, controllers.updateUser);
app.delete("/users/:id", verifyToken, controllers.deleteUser);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);