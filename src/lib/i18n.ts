export type Lang = "en" | "ko";

/** A localized string: English + Korean variants. */
export type L = { en: string; ko: string };

/** A localized list of strings. */
export type LList = { en: string[]; ko: string[] };
