//step 1:Import 'Job.ts' model
import Job from "@/lib/models/Job";

//step 2:import 'NextResponse'.
import { NextResponse } from "next/server";

//step 3:import DB connection function
import { connectToDB } from "@/lib/db";

//step 4:Create a POST function , to upload job data to DB.
export async function POST(request: Request) {
  try {
    //step 5:connect to DB.
    await connectToDB();

    //step 6:get formData sent from client.
    const body = await request.json(); //parse the request body

    //step 7:wrap the data in 'Job' model.
    const newJob = new Job({
      companyName: body.companyName,
      jobDescription: body.jobDescription,
      eligibility: body.eligibility,
      applyLink: body.applyLink,
      additionalDetails: body.additionalDetails,
      timestamp: body.timestamp,
      //'__v:0' property is automatically added by mongoose to keep track of version of the document.
    });

    //step 8:save the data to DB.
    await newJob.save();

    return NextResponse.json(
      { message: "Job Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Error Creating job" },
      { status: 500 }
    );
  }
}
