import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.db.js";

dotenv.config({
  path: './.env'
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB failed to connect to the server.");
    console.error(error);
  });