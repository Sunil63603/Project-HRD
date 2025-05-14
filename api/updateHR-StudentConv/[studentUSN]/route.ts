//step 1:import NextResponse to send response to front-end.
import { NextResponse } from "next/server";

//step 2:import function which is used to establish connection with database.
import { connectToDB } from "@/lib/db";

//step 3:import 'registeredStudModel' which was created for 'student-login' api route.
import registeredStudModel from "@/lib/models/registeredStudModel";
import { log } from "console";

//step 1:write a function which will delete message from database.
export async function PATCH(
  request: Request,
  { params }: { params: { studentUSN: string; index: number } }
) {
  try {
    //step 2:establish connection with database.
    await connectToDB();

    //step 3:extract USN from params and body(contains 'index' of message which needs to be deleted) from request.
    const { studentUSN } = await params; //Get USN from route params.

    const body = await request.json();

    const { index } = body; //Get index from request body.

    //step 4:find the student based on USN.
    const student = await registeredStudModel.findOne({ USN: studentUSN });

    if (
      index === undefined ||
      index < 0 ||
      index >= student.conversationsWithHR.length
    ) {
      return NextResponse.json({ message: "Invalid Index" }, { status: 400 });
    }

    //step 5:Remove message at given index.
    student.conversationsWithHR.splice(index, 1);

    //step 6:Save the updated student document.
    await student.save();

    //step 7:return success response.
    return NextResponse.json(
      { message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
