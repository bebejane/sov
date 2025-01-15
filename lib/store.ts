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

export type Steps = string[]

export interface StoreState {
  data: {
    [key: string]: any
    diary?: Diary
    steps?: Steps
  },
  theme: 'light' | 'dark',
  setTheme: (theme: 'light' | 'dark') => void,
  updateData: (data: any, section?: string) => void,
  reset: () => void
  resetKeys: (keys?: string[]) => void
}

const getData = async () => {
  const fileData = await AsyncStorage.getItem('file')
  if (fileData) {
    const data = JSON.parse(fileData as string)
    await AsyncStorage.removeItem('file')
    return data
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
      d[section] = { ...d[section], ...data }
    else
      d = { ...d, ...data }

    set((state) => ({ data: d }))
  },
  reset: () => set((state) => ({ data: {} })),
  resetKeys: (keys) => {
    if (!keys) return

    let d = get().data
    if (keys)
      keys.forEach((key) => delete d[key])
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
