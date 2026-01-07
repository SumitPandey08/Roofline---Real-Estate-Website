import { NextResponse , NextRequest } from "next/server";
import Project from "@/app/(backend)/models/project.model";
import connect from "@/app/(backend)/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const id = request.nextUrl.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Admin ID is required' }, { status: 400 });
        }

        // 1. FIX: Use ":" instead of "===" inside the object
        const adminProjects = await Project.find({ admin: id });

        return NextResponse.json({
            message: "Projects found",
            success: true,
            // 2. FIX: Ensure data matches the variable defined above
            data: adminProjects, 
        });
    } catch (error: unknown) {
        console.error('Error fetching projects:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}