import { hyphenate } from "hyphen/sv";
import { format } from 'date-fns'

export const hyphenateSwedish = async function (str: string) {
  return hyphenate(str);
}

export const formatDate = (str: string, short: boolean = false) => {
  return format(new Date(str), `LLL Do${!short ? ` HH:mm:ss` : ''}`)
}
