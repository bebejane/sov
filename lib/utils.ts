import { format } from 'date-fns'
import { sv } from 'date-fns/locale'

export const formatDate = (str: string, short: boolean = false) => {
  return format(new Date(str), `LLL Do${!short ? ` HH:mm:ss` : ''}`, { locale: sv })
}
