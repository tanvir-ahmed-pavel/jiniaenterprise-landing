export type AiReferrerSource =
  | "chatgpt"
  | "perplexity"
  | "copilot"
  | "gemini"
  | "bing"
  | null;

const AI_PATTERNS: Array<{ source: Exclude<AiReferrerSource, null>; match: RegExp }> = [
  { source: "chatgpt", match: /chat\.openai\.com|chatgpt\.com|openai\.com/i },
  { source: "perplexity", match: /perplexity\.ai/i },
  { source: "copilot", match: /copilot\.microsoft\.com|bing\.com\/chat/i },
  { source: "gemini", match: /gemini\.google\.com|bard\.google\.com/i },
  { source: "bing", match: /bing\.com|msn\.com/i },
];

const UTM_ALIASES: Record<string, Exclude<AiReferrerSource, null>> = {
  chatgpt: "chatgpt",
  openai: "chatgpt",
  perplexity: "perplexity",
  copilot: "copilot",
  gemini: "gemini",
  bard: "gemini",
  bing: "bing",
};

/**
 * Detect AI assistant / answer-engine referral from document.referrer or utm_source.
 */
export function detectAiReferrer(
  referrer?: string | null,
  utmSource?: string | null,
): AiReferrerSource {
  const utm = utmSource?.trim().toLowerCase();
  if (utm && UTM_ALIASES[utm]) {
    return UTM_ALIASES[utm];
  }

  const ref = referrer?.trim() ?? "";
  if (!ref) return null;

  for (const { source, match } of AI_PATTERNS) {
    if (match.test(ref)) return source;
  }

  return null;
}
