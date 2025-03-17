import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./useRag";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_LINK;
const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export async function insertData(
  questions: string[],
  content: string,
  mainIndex: number = 0
) {
  try {
    const question_vectors = await Promise.all(
      questions.map(async (question) => ({
        question: question,
        vector: await getEmbedding(question),
      }))
    );

    const filteredEntries = question_vectors.filter(
      (event) => event.vector !== null
    );

    if (filteredEntries.length !== questions.length) {
      console.warn("Some embeddings failed to generate.");
    }

    const { data, error } = await supabase.rpc("insert_data", {
      entries: filteredEntries,
      content,
      main_index: mainIndex,
    });

    if (error) {
      console.error("Error inserting data:", error);
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

    return data;
  } catch (err: any) {
    console.error("Find Similar Error:", err);
    return `Error: ${err.message}`;
  }
}

export async function supabaseLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function fetchMainEntries() {
  try {
    const { data, error } = await supabase.rpc("get_main_entries");

    if (error) {
      console.error("Error fetching main entries:", error);
      return [];
    }

    return data;
  } catch (err: any) {
    console.error("Fetch error:", err);
    return [];
  }
}

export const fetchGroupData = async (groupId: string) => {
  const { data, error } = await supabase.rpc(
    "get_group_content_and_questions",
    {
      group_uuid: groupId,
    }
  );

  if (error) {
    console.error("Error fetching group data:", error);
    return { content: "", questions: [] };
  }

  return data || { content: "", questions: [] };
};

export async function deleteGroup(groupId: string) {
  const { data, error } = await supabase.rpc("delete_group", {
    group_uuid: groupId,
  });

  if (error) {
    console.error("Error deleting group:", error);
    return `Error: ${error.message}`;
  }

  return data;
}
