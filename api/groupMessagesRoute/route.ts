//step 1:import NextResponse from 'next/server' to send information/promise from backend to frontend.
import { NextResponse } from "next/server";

//step 2:import model from grpMessagesModel.
import GrpMsgs from "@/lib/models/grpMsgsModel";

//step 3:import function which connects to database.
import { connectToDB } from "@/lib/db";

//step 1:create and export GET function which will handle the GET response.
export async function GET() {
  //usually GET() will not receive parameters unlike POST.
  try {
    //step 2:connect to database.
    await connectToDB(); //this function returns a promise,hence await.

    //step 3:fetch all grpMessages from database.
    const gpMessages = await GrpMsgs.find(); //fetch all grpMessages.

    //step 4:send Messages to front-end
    return NextResponse.json(gpMessages); //send grpMessages as JSON.
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { message: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

//step 1:create and export POST function which will handle the POST response.
export async function POST(request: Request) {
  try {
    //step 2:connect to database.
    await connectToDB(); //this function returns a promise,hence await.

    //step 3:get 'message' sent from client.
    const body = await request.json(); //parse the request body.

    //step 4:wrap the data in 'GrpMsgs' model.
    const newMessage = new GrpMsgs(body); //'__v:0' property is automatically added by mongoose to keep track of version of document.

    //step 5:save the data to DB.
    await newMessage.save();

    return NextResponse.json(
      { message: "Message stored successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while storing message:", error);
    return NextResponse.json(
      { message: "Error while storing message" },
      { status: 500 }
    );
  }
}
