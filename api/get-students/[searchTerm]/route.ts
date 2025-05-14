//step 1:import {NextResponse} to send response to client.
import { NextResponse } from "next/server";

//step 2:import function which connects to database.
import { connectToDB } from "@/lib/db";

//step 3:import student model which was created for student-login route.
import Student from "@/lib/models/registeredStudModel";

//step 1:write function which filters and gets students based on 'searchTerm' from mongoDB
export async function GET(
  request: Request,
  { params }: { params: { searchTerm: string } }
) {
  try {
    //step 2:establish connection to database.
    await connectToDB();

    //step 3:extract searchTerm from params.
    const { searchTerm } = params;

    if (!searchTerm) {
      return NextResponse.json(
        { error: "Search term missing" },
        { status: 400 }
      );
    }

    //step 4:
    const filteredStudents = await Student.find({
      USN: { $regex: searchTerm, $options: "i" },
    });
    //'$regex' means pattern matching(like includes() in JS).
    //$options:'i' means ignore case.

    //step 5:return filtered students to front-end.
    return NextResponse.json(filteredStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
