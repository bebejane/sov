import { hyphenate } from "hyphen/sv";
import { format } from 'date-fns'

export const hyphenateSwedish = async function (str: string) {
  return hyphenate(str);
}

export const formatDate = (str: string) => {
  return format(new Date(str), "yyyy-MM-dd HH:mm:ss")
}
