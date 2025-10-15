import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { AuthenticationError } from "src/api/v1/middleware/authenticate.ts";

/**
 * Middleware to authenticiate Firebase ID Token.
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader: string | undefined = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AuthenticationError(
                "Forbidden: No role found",
                "ROLE_NOT_FOUND"
            );
        }

        const token: string = authHeader.split(" ")[1];
        if (!token) {
            throw new AuthenticationError(
                "Unauthorized: No token provided",
                "TOKEN_NOT_FOUND"
            );
        }

        // Verify the ID token //
        const decodedToken = await auth.verifyIdToken(token);

        res.locals.uid = decodedToken.uid;
        res.locals.role = decodedToken.role 
        next();
    } catch (error) {
        // Pass the error //
        if (error instanceof AuthenticationError) {
            return next(error);
        } else if (error instanceof Error) {
            next(
                new AuthenticationError(
                    `Unauthorized: ${getErrorMessage(error)}`,
                     getErrorCode(error)
                )
            );
        } else {
        
        next(new AuthenticationError(
             "Unauthorized: Invalid token",
             "TOKEN_INVALID"
        ));
    }
};

function getErrorCode(error: Error): any {
        throw new Error("Function not implemented.");
    }
    function getErrorMessage(error: Error) {
        throw new Error("Function not implemented.");
    }
}
