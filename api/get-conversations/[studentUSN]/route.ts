//step 1:import NextRequest and NextResponse.
import { NextRequest, NextResponse } from "next/server";

//step 2:import database connection function.
import { connectToDB } from "@/lib/db";

//step 3:import 'registeredStud' model which was created for student-login functionality.
import registeredStudModel from "@/lib/models/registeredStudModel";

//step 1:write function which gets 'conversationsWithHR' from 'registeredStuds' collection using USN.
export async function GET(
  req: NextRequest,
  context: { params: { studentUSN: string } }
) {
  try {
    //step 2:establish connection with database.
    await connectToDB();

    //step 3:extract USN from params.(dynamic route)
    const { studentUSN } = await context.params;

    if (!studentUSN) {
      //if no USN is provided,send 400(bad request).
      return NextResponse.json(
        { error: "Student USN is required" },
        { status: 400 }
      );
    }

    //Now,find the student by USN from MongoDB.
    const student = await registeredStudModel.findOne(
      { USN: studentUSN }, //condition:USN must match
      { conversationsWithHR: 1 } //projection:only return conversationsWithHR.
    );

    if (!student) {
      //if student not found,send 404(not found).
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    //if found,return conversations.
    return NextResponse.json(student.conversationsWithHR);
  } catch (error) {
    console.error("Error fetching conversations between student and HR", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    ); //if something wrong,send 500.
  }
}
