//step 1:import NextResponse from 'next/server';
import { NextResponse } from "next/server";

//step 2:import same model which was created for 'create-job' api route.
import Job from "@/lib/models/Job";

//step 3:import function which connects to database.
import { connectToDB } from "@/lib/db"; //your db connection file.

//step 4:create and export GET function which will handle the GET request.
export async function GET() {
  //usually GET() will not receive parameters unlike POST.
  try {
    //step 5:connect to database.
    await connectToDB(); //this function returns a promise , hence await

    const jobs = await Job.find(); //fetch all jobs.

    return NextResponse.json(jobs); //send jobs as JSON.
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
