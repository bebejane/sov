import { create } from "zustand";
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage } from 'zustand/middleware'
import file from '../file.json'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Diary = {
  id: string,
  date: string,
  [key: string]: any
}[]

export type Assignments = {
  id: string,
  date: string,
  [key: string]: any
}[]

export type Steps = string[]

export type Sorks = {
  id: string,
  date: string,
  [key: string]: any
}[]

export interface StoreState {
  data: {
    diary?: Diary
    steps?: Steps
    assignments?: Assignments
    sorks?: Sorks
    [key: string]: any
  },
  theme: 'light' | 'dark',
  setTheme: (theme: 'light' | 'dark') => void,
  updateData: (data: any, section?: string) => void,
  reset: () => void
  resetKeys: (keys: string[], section?: string) => void
}

const getData = async (): Promise<StoreState['data']> => {
  const fileData = await AsyncStorage.getItem('file')
  if (fileData) {
    const data = JSON.parse(fileData as string)
    //console.log(data)
    //await AsyncStorage.removeItem('file')
    //return data
  }
  return {}
}

const useStore = create(persist<StoreState>((set, get) => ({
  theme: 'dark',
  data: async () => await getData(),
  setTheme: (theme: 'light' | 'dark') => {
    set((state) => ({ theme }))
  },
  updateData: (data, section) => {

    let d = { ...get().data }
    if (section)
      d[section] = Array.isArray(data) ? data : { ...d[section], ...data }
    else
      d = Array.isArray(data) ? data : { ...d, ...data }

    set((state) => ({ data: d }))
  },
  reset: () => set((state) => ({ data: {} })),
  resetKeys: (keys, section) => {
    if (!keys) return

    let d = get().data

    if (keys)
      keys.forEach((key) => section && d[section]?.[key] !== undefined ? delete d[section][key] : delete d[key])
    else
      d = {}

    set((state) => ({ data: d }))
  },
}), {
  name: 'sov',
  storage: createJSONStorage(() => AsyncStorage)
}));

export { shallow, useStore };
export default useStore
