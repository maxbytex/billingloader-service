import { MatchAttributesKV } from "./match-attributes.ts";

export interface MatchKV {
  token: string;
  version: string;
  total_slots: number;
  available_slots: number;
  attributes: MatchAttributesKV;
}
