"use server";

import { z } from 'zod';

import { db } from "@/lib/db";

export type State = {
  errors?: {
    title?: string[];
  },
  message?: string | null;
}

const CreateBoardValidation = z.object({
  title: z.string().min(3, {
    message: "Minimum length of 3 letters is required"
  }),
});

export async function createBoard(prevState: State, formData: FormData) {

  const validatedFields = CreateBoardValidation.safeParse({
    title: formData.get("title")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields."
    }
  }

  const { title } = validatedFields.data;

  try {
    await db.board.create({
      data: {
        title,
      }
    })
  } catch (error) {
    return {
      message: "Database Error"
    }
  }

  
}