//step 1:import NextRequest and NextResponse.
import { NextRequest, NextResponse } from "next/server";

//step 2:import DBconnection function
import { connectToDB } from "@/lib/db";

//step 3:import 'registeredStud' model which was created for student-login api route.
import registeredStudModel from "@/lib/models/registeredStudModel";

//step 1:write POST function to update the conversation with student.
export async function POST(request: NextRequest) {
  try {
    //step 2:establish connection with DB.
    await connectToDB();

    //step 3:parse the request body to get the data.
    const { studentUSN, newConversationObject } = await request.json();

    if (!studentUSN || !newConversationObject) {
      return NextResponse.json(
        { message: "Missing USN and conversation Object" },
        { status: 400 }
      );
    }

    //step 4:update conversationsWithHR inside student document based on USN.
    await registeredStudModel.updateOne(
      { USN: studentUSN }, //find student.
      { $push: { conversationsWithHR: newConversationObject } } //push 'conv-object' into this property.
    );

    return NextResponse.json(
      { message: "Conversation updated successfully" },
      { status: 200 }
    ); //return success response.
  } catch (error) {
    console.error("Error updating conversation:", error); //log error.
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    ); //return error response.
  }
}
