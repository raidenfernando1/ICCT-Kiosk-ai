import { pipeline } from "@xenova/transformers";

export async function getEmbedding(text: string): Promise<number[] | null> {
  try {
    if (!text || typeof text !== "string") return null;

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
    const { data } = await extractor(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.isArray(data) ? data : Array.from(data as Float32Array);
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}
