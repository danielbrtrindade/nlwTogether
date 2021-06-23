import { Request, Response, NextFunction } from "express"
import { RepositoryNotTreeError } from "typeorm";

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const admin = true;

    if (admin) {
        return next();
    }

    response.status(401).json({
        error: "Unauthorized",
    });
}