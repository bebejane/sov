import { format } from 'date-fns'
import { capitalize } from 'lodash-es'
import { sv } from 'date-fns/locale'

export const formatDate = (str: string, short: boolean = false) => {
  if (!str) return ''
  let d = format(new Date(str), `LLL dd${!short ? ` - HH:mm` : ''}`, { locale: sv })
  d = capitalize(d).replace('.', '')
  return d
}
