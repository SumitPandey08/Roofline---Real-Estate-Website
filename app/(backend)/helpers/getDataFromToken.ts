import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (token) {
            if (!process.env.TOKEN_SECRET) {
                throw new Error('TOKEN_SECRET is not defined in environment variables');
            }
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedToken;
            return decodedToken.id;
        }
        return null;
    } catch {
        // In case of an error (e.g., invalid token), simply return null.
        // The client-side logic will handle the redirection.
        return null;
    }
}
