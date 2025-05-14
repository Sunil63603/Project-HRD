//step 1:import NextResponse to send response to client from server.
import { NextResponse } from "next/server";

//step 2:import function which helps to connect to database.
import { connectToDB } from "@/lib/db";

//step 3:import model which was created for 'groupMesssagesRoute'
import Msg from "@/lib/models/grpMsgsModel";

//step 4:write function for DELETE request and export it.
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    //step 5:connect to database.
    await connectToDB(); //this function returns a promise,hence await.

    //step 6:This is a dynamic route,Next.js will automatically give you the ID.
    const { id } = params; //directly get id from params.

    if (!id) {
      return NextResponse.json("Message ID is missing", { status: 400 });
    }

    //step 7:delete the job using ID.
    await Msg.findByIdAndDelete(id);
    //'Msg' is model imported from lib/models/grpMsgsModel.ts file.

    //step 8:send response to client.
    return NextResponse.json("Message deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json("Failed to delete message", { status: 500 });
  }
}
