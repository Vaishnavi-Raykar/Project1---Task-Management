import connectMongoDB from "@/lib/mongodb";
import { TaskTopic } from "@/models/topic";
import { NextResponse } from "next/server";
import { User } from "@/models/topic";

export async function POST(request) {
  const { title, description , github,email } = await request.json();
  await connectMongoDB();
  await TaskTopic.create({ title, description, github,email });
  return NextResponse.json({ message: "Task Created" }, { status: 201 });
}


//   export async function GET(request) {
//     const userEmail = request.query.get('email');
//     console.log(userEmail);
//     if (!userEmail) {
//       return new Response('Email parameter is required', { status: 400 });
//     }
//   await connectMongoDB();
//   const topics = await TaskTopic.find({});
//   return NextResponse.json({ topics });
// }

export async function GET() {

  try {
    await connectMongoDB();
    const topics = await TaskTopic.find({});
    
    if (!topics) {
      return new Response('No topics found', { status: 404 });
    }
    
    return new Response(JSON.stringify({ topics }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await TaskTopic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" }, { status: 200 });
}
