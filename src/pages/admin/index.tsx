import { useState } from "react";
import { getEmbedding } from "../../hooks/useRag";
import { insertData } from "../../hooks/useSupabase";

export const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      const vectorTitle = await getEmbedding(title);
      const vectorContent = await getEmbedding(content);

      if (!vectorTitle || !vectorContent) {
        throw new Error("Failed to generate embeddings.");
      }

      await insertData(vectorTitle, vectorContent);
      console.log("Data inserted successfully!");
    } catch (error) {
      console.error("Error generating or inserting embedding:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
        />
        <button type="submit">Generate Embedding</button>
      </form>
    </div>
  );
};
