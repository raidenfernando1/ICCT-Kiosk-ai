import { pipeline } from "@xenova/transformers";

interface Tensor {
  data: Float32Array | number[];
  dims: number[];
  type: string;
  tolist?: () => number[];
}

export async function getEmbedding(text: string) {
  try {
    if (!text || typeof text !== "string") {
      throw new Error("Input text must be a non-empty string.");
    }

    const extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );

    const output = await extractor(text, { pooling: "mean", normalize: true });

    console.log("Raw output from embedding:", output);

    if (!output) {
      throw new Error("Failed to generate embeddings.");
    }

    let vector: number[];

    if (
      (output as Tensor).data instanceof Float32Array ||
      Array.isArray((output as Tensor).data)
    ) {
      vector = Array.from((output as Tensor).data);
    } else if (Array.isArray(output) && (output[0] as Tensor)?.data) {
      vector = Array.from((output[0] as Tensor).data);
    } else if ((output as Tensor).tolist) {
      vector = (output as Tensor).tolist!();
    } else if (Array.isArray(output)) {
      if (Array.isArray(output[0])) {
        vector = Array.from(output[0] as number[]);
      } else {
        vector = Array.from(output as unknown as number[]);
      }
    } else {
      console.error("Unexpected output structure:", output);
      throw new Error("Unknown output structure. Check console for details.");
    }

    if (
      !Array.isArray(vector) ||
      vector.some((v) => typeof v !== "number" && !isFinite(v))
    ) {
      console.error("Invalid vector format:", vector);
      throw new Error("Invalid embedding format received.");
    }

    return vector;
  } catch (error) {
    console.error("Embedding error:", error);
    return null;
  }
}
