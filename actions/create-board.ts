"use server";

import { z } from 'zod';

import { db } from "@/lib/db";

const CreateBoardValidation = z.object({
  title: z.string(),
});

export async function createBoard(formData: FormData) {

  const { title } = CreateBoardValidation.parse({
    title: formData.get("title")
  })

  await db.board.create({
    data: {
      title,
    }
  })
}