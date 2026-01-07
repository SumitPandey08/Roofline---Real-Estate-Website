import { NextRequest, NextResponse } from "next/server";
import Project from "@/app/(backend)/models/project.model";
import { getDataFromToken } from "../../../helpers/getDataFromToken";
import connect from "../../../dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const adminId = await getDataFromToken(request);
    if (!adminId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const propertyData = await request.json();

    // 1. Check if RERA Number already exists
    const existingProject = await Project.findOne({ reraNumber: propertyData.reraNumber });
    if (existingProject) {
      return NextResponse.json({ 
        success: false, 
        message: "A property with this RERA number already exists." 
      }, { status: 400 });
    }

    // 2. Create the new project
    const newProject = new Project({
      ...propertyData,
      admin: adminId,
    });

    // 3. Save to Database
    const savedProject = await newProject.save();

    return NextResponse.json({
      success: true,
      message: "Property added successfully!",
      data: savedProject,
    }, { status: 201 });

  } catch (error: any) {
    // Handle Mongoose Validation Errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      return NextResponse.json({ success: false, errors: messages }, { status: 400 });
    }

    console.error("Add Property Error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal Server Error" 
    }, { status: 500 });
  }
}