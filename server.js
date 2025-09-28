import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import contactRoutes from "./Routes/contact.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use the contact routes
app.use("/api/contact", contactRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
