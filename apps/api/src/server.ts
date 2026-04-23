import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
	path: `.env.${process.env.NODE_ENV || "development"}`,
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(PORT, () => {
	console.log(`API server running on http://localhost:${PORT}`);
});
