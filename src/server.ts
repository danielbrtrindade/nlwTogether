import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

import { router } from "./routers";

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    };

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
});

app.listen(3000, () => console.log("server is running"));