/**
 * Pure SEO validation helpers — no I/O, safe for unit tests and scripts.
 */

export function assertCanonicalPath(path: string): string {
  if (typeof path !== "string" || !path.trim()) {
    throw new Error("Canonical path must be a non-empty string");
  }

  const trimmed = path.trim();
  if (!trimmed.startsWith("/")) {
    throw new Error(`Canonical path must start with "/": ${path}`);
  }
  if (trimmed.includes("://") || trimmed.includes("?") || trimmed.includes("#")) {
    throw new Error(
      `Canonical path must be a site-relative pathname without query/hash: ${path}`,
    );
  }
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    throw new Error(`Canonical path must not end with "/": ${path}`);
  }

  return trimmed;
}

export type MetadataFieldInput = {
  title?: string | null;
  description?: string | null;
  path?: string | null;
};

export type MetadataValidationResult = {
  ok: boolean;
  errors: string[];
};

export function validateMetadataFields(
  input: MetadataFieldInput,
): MetadataValidationResult {
  const errors: string[] = [];
  const title = input.title?.trim() ?? "";
  const description = input.description?.trim() ?? "";
  const path = input.path?.trim() ?? "";

  if (!title) errors.push("title is required");
  else if (title.length > 70) errors.push("title should be 70 characters or fewer");

  if (!description) errors.push("description is required");
  else if (description.length < 50)
    errors.push("description should be at least 50 characters");
  else if (description.length > 160)
    errors.push("description should be 160 characters or fewer");

  if (!path) errors.push("path is required");
  else {
    try {
      assertCanonicalPath(path);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  return { ok: errors.length === 0, errors };
}

export type FaqPair = {
  question?: string | null;
  answer?: string | null;
};

export type FaqValidationResult = {
  ok: boolean;
  errors: string[];
};

export function validateFaqPair(faq: FaqPair): FaqValidationResult {
  const errors: string[] = [];
  const question = faq.question?.trim() ?? "";
  const answer = faq.answer?.trim() ?? "";

  if (!question) errors.push("question is required");
  if (!answer) errors.push("answer is required");
  if (question && question.length < 8)
    errors.push("question should be at least 8 characters");
  if (answer && answer.length < 20)
    errors.push("answer should be at least 20 characters");

  return { ok: errors.length === 0, errors };
}
