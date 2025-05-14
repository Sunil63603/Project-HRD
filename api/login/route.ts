import { NextRequest } from "next/server"; //NextRequest is the type of request that we get from components.
import { NextResponse } from "next/server"; //NextResponse's json method is used when we want to send a json response to the client.
import { connectToDB } from "@/lib/db"; //my mongo connection.
import RegisteredStud from "@/lib/models/registeredStudModel"; //models are used while interacting with database.
import RegisteredHR from "@/lib/models/registeredHRModel"; //this is used while interacting with 'registeredHR' collection.

//async because connectToDB returns a promise.
export async function POST(req: NextRequest) {
  //'req' is the object that we get from the client-side
  await connectToDB(); //DB connection.
  const { email, password, role } = await req.json(); //destructuring the data that we get from the client-side.

  let account;

  if (role === "registeredStuds") {
    account = await RegisteredStud.findOne({ email, password });
  } else if (role === "registeredHRs") {
    account = await RegisteredHR.findOne({ email, password });
    console.log(account);
  }

  if (!account) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({ account });
}
