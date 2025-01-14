import { hyphenate } from "hyphen/sv";

export const hyphenateSwedish = async function (str: string) {
  return hyphenate(str);
}
