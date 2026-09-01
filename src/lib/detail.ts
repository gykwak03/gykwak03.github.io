import type { L } from "@/lib/i18n";

export type DetailMedia = {
  src: string;
  width: number;
  height: number;
  alt: L;
  caption: L;
  trimTop?: number;
};
