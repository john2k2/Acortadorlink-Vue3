import { nanoid } from "nanoid";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

const app = express();

// Supabase
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase URL or anon key.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para acortar URL
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = nanoid(7);

  // Inserta en la base de datos de Supabase
  const { data, error } = await supabase
    .from("urls")
    .insert([{ originalUrl: originalUrl, shortUrl: shortUrl }]);

  if (error) {
    console.log(error.message);
    res.status(500).json({ error: "Database insertion failed" });
    return;
  }

  res.json({ originalUrl, shortUrl });
});

// Ruta para redirigir URL
app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  // Obtiene de la base de datos de Supabase
  const { data, error } = await supabase
    .from("urls")
    .select("originalUrl")
    .eq("shortUrl", shortUrl)
    .single();

  if (error) {
    console.log(error.message);
    res.status(500).json({ error: "Database query failed" });
    return;
  }

  if (data) {
    res.redirect(data.originalUrl);
  } else {
    res.status(404).json({ error: "URL not found" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
