import connectMongoDB from "@/lib/mongodb";
import { TaskTopic } from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: title, newDescription: description , newGithub : github } = await request.json();
  await connectMongoDB();
  await TaskTopic.findByIdAndUpdate(id, { title, description , github });
  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await TaskTopic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
