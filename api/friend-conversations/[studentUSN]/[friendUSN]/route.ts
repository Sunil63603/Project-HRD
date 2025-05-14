//step 1:import NextResponse to send response from backend to front-end.
import { NextResponse, NextRequest } from "next/server";

//step 2:import function which establishes connection with database.
import { connectToDB } from "@/lib/db";

//step 3:import model for frndConversations.
import frndConvsModel from "@/lib/models/frndConvsModel";

//step 1:Create a function which can fetch conversations from DB.
export async function GET(
  request: Request,
  { params }: { params: { studentUSN: string; friendUSN: string } }
) {
  //USNs are passed as string[]
  try {
    //step 2:connect to DB
    await connectToDB();

    //step 3:extract USNs from search params.
    const { studentUSN, friendUSN } = await params;

    if (studentUSN == null || friendUSN == null) {
      return NextResponse.json({ error: "USN not found" }, { status: 400 });
    }

    //step 4:fetch conversation from DB whose participants are studentUSN and frndUSN.
    const conversation = await frndConvsModel.findOne({
      participants: { $all: [studentUSN, friendUSN] }, //check if participants are same as studentUSN and frndUSN.(order doesnt matter.)
    });

    if (!conversation) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }

    //step 5:if conversation is found, return messages of that conversation.
    return NextResponse.json(
      { messages: conversation.messages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//step 1:function which runs when student tries to send message to friend.
export async function POST(
  request: NextRequest,
  { params }: { params: { studentUSN: string; friendUSN: string } }
) {
  try {
    //step 2:establish connection with database.
    await connectToDB();

    //step 3:extract USNs from search params
    const { studentUSN, friendUSN } = await params;

    if (studentUSN === null || friendUSN === null) {
      return NextResponse.json({ message: "USNs not found" }, { status: 400 });
    }

    //step 4:extract message from body.
    const { newMessage } = await request.json();

    //step 5:check whether student and friend have 'conversation' document inside DB.
    const existingConversation = await frndConvsModel.findOne({
      participants: { $all: [studentUSN, friendUSN] },
    });

    //step 6:if theres already existing document, update it.
    if (existingConversation) {
      await frndConvsModel.updateOne(
        //update only one doc
        { _id: existingConversation._id }, //whose '_id' is same as existingConversations '_id'
        { $push: { messages: newMessage } } //push 'message' into 'messages' array.
      );
      return NextResponse.json(
        { message: "message added to existing conversation" },
        { status: 200 }
      );
    } else {
      //step 7:if theres no existing document, create it now.
      await frndConvsModel.create({
        participants: [studentUSN, friendUSN],
        messages: [newMessage],
      });
      return NextResponse.json(
        { message: "New conversation created." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error handling message:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

//step 1:function to delete message.
export async function PATCH(
  request: NextRequest,
  { params }: { params: { studentUSN: string; friendUSN: string } }
) {
  try {
    //step 2:establish connection with DB.
    await connectToDB();

    //step 3:extract USNs from params
    const { studentUSN, friendUSN } = await params;

    //step 4:extract 'index' from body.
    const { index } = await request.json();

    if (index === undefined || index < 0) {
      return NextResponse.json({ message: "Invalid Index" }, { status: 400 }); //400 indicates bad request.
    }

    //step 5:fetch conversation using participants.
    const conversation = await frndConvsModel.findOne({
      participants: { $all: [studentUSN, friendUSN] },
    });

    if (!conversation) {
      return NextResponse.json(
        { message: "Conversation not found" },
        { status: 404 }
      ); //not found
    }

    if (index >= conversation.messages.length) {
      return NextResponse.json(
        { message: "Index out of bounds" },
        { status: 400 }
      ); //bad request
    }

    //step 6:remove message from fetched conversation.
    conversation.messages.splice(index, 1);
    await conversation.save();

    return NextResponse.json({ message: "Message Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting message:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
