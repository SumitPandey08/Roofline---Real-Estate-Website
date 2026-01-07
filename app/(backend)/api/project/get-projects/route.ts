import connect from "@/app/(backend)/dbConfig/dbConfig";
import Project from "@/app/(backend)/models/project.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const projectType = request.nextUrl.searchParams.get("projectType");
        const listingType = request.nextUrl.searchParams.get("listingType");

        const query: Record<string, any> = {};
        if (projectType) {
            query.projectType = projectType;
        }
        if (listingType) {
            query.listingType = listingType;
        }

        const projects = await Project.find(query).populate('admin', 'name membership email phoneNo');

        return NextResponse.json({
            message: "Projects fetched successfully",
            data: projects,
        });
    } catch (error: unknown) {
        console.error("Error fetching projects:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
