import { pipeline } from "@xenova/transformers";

export async function getEmbedding(text: string): Promise<number[] | null> {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Input text must be a non-empty string.");
    }

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const output = await extractor(text, { pooling: "mean", normalize: true });

    let vector: number[];

    if (
      "data" in output &&
      (output.data instanceof Float32Array || Array.isArray(output.data))
    ) {
      vector = Array.from(output.data);
    } else if (Array.isArray(output) && "data" in output[0]) {
      vector = Array.from(output[0].data);
    } else if ("tolist" in output && typeof output.tolist === "function") {
      vector = output.tolist();
    } else if (Array.isArray(output)) {
      vector = Array.isArray(output[0])
        ? Array.from(output[0])
        : Array.from(output);
    } else {
      throw new Error("Unknown output structure");
    }

    if (vector.some((v) => typeof v !== "number" || !isFinite(v))) {
      throw new Error("Invalid embedding format");
    }

    return vector;
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}
