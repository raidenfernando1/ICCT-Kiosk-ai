import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";
import { getEmbedding } from "./Embedding";

export const supabase = createClient(
  "https://bazzqsorgnmduzncoccb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhenpxc29yZ25tZHV6bmNvY2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4OTIxMzAsImV4cCI6MjA1NTQ2ODEzMH0.pfEYmcUimVdaBKqJI3PaTC0XdXmVZ7ei4lcJfuCxviY",
  { auth: { persistSession: false } }
);

export const userAuth = writable(false);

export async function createUser(
  email: string,
  name: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("admin_accounts")
      .insert([{ email: email, name: name, password: password }]);

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function supabaseLogin(email: string, password: string) {
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return false;
  }

  userAuth.set(true);
  return true;
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

export async function supabaseLogout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("❌ Error logging out:", error);
    return false;
  }

  userAuth.set(false);
  return true;
}
