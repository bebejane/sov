import { format } from 'date-fns'

export const formatDate = (str: string, short: boolean = false) => {
  return format(new Date(str), `LLL Do${!short ? ` HH:mm:ss` : ''}`)
}
