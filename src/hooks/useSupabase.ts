import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./useRag";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_LINK;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export async function insertData(
  category: string,
  question: string,
  content: string
) {
  try {
    const { data, error } = await supabase.rpc("insert_data", {
      category,
      question,
      content,
      question_vector: await getEmbedding(question),
    });

    if (error) {
      console.error("Error:", error);
      return `Error: ${error.message}`;
    }

    return data;
  } catch (err: any) {
    console.error("Insertion error:", err);
    return `Error: ${err.message}`;
  }
}

export async function requestData(question: string) {
  try {
    const questionEmbedding = await getEmbedding(question);

    const { data, error } = await supabase.rpc("find_similar", {
      input_vector: questionEmbedding,
    });

    if (error) {
      console.error("Error:", error.message);
      return `Error: ${error.message}`;
    }

    console.log(data);

    return data;
  } catch (err: any) {
    console.error("Find Similar Error:", err);
    return `Error: ${err.message}`;
  }
}
