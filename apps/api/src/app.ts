import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
	res.json({
		status: "ok",
		service: "api",
	});
});

export default app;
