import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_LINK;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export const insertData = async (
  questionEmbedding: number[] | null,
  contentEmbedding: number[] | null
) => {
  try {
    if (!questionEmbedding || !contentEmbedding) {
      throw new Error("Failed to generate embeddings.");
    }

    const { data, error } = await supabase
      .from("data_entry")
      .insert([
        {
          question: questionEmbedding,
          content: contentEmbedding,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Insertion error:", err);
    return null;
  }
};
