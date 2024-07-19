import express from "express";

// Import routes
import userRouter from "./routes/user.routes.js"
import errorMiddleware from "./middleware/errorHandler.js";

const app = express();

app.get("/api", async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: "Welcome to the backend API.",
        postmen: "https://shahboz2303.postman.co/workspace/Team-Workspace~f0535e31-161a-44e6-8cdb-780737dd25a0/collection/24957361-23bc674d-cd46-4349-9d76-49aa1e5acad5?action=share&creator=24957361",
      });
    } catch (error) {
      res.status(500).json({ success: false, error: (error).message });
    }
  });

// middleware
app.use(errorMiddleware);

app.use(express.json());

// routes
app.use("/api/user", userRouter);

export default app;
