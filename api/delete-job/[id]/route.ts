//step 1:import NextResponse from 'next/server';
import { NextResponse } from "next/server";

//step 2:import function which helps to connect to database.
import { connectToDB } from "@/lib/db";

//step 3:import model which was created for 'create-job' api route.
import Job from "@/lib/models/Job";

//step 4:write function for DELETE request and export it.
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    //step 5:connect to database.
    await connectToDB(); //this function returns a promise , hence await

    //step 6:This is a dynamic route,Next.js will automatically give you the ID.
    const { id } = params; //directly get id from params.

    if (!id) {
      return NextResponse.json("Job ID is missing", { status: 400 });
    }

    //step 7:delete the job using ID.
    await Job.findByIdAndDelete(id);
    //'Job' is model imported from lib/models/Job.ts file.

    return NextResponse.json("Job Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json("Failed to delete job", { status: 500 });
  }
}
