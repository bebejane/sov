import { create } from "zustand";
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage } from 'zustand/middleware'
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
    diary: Diary
    steps: Steps
    assignments: Assignments
    sorks: Sorks
    [key: string]: any
  },
  theme: 'light' | 'dark',
  setTheme: (theme: 'light' | 'dark') => void,
  updateData: (data: any, section?: string) => void,
  reset: () => void
  resetKeys: (keys: string[], section?: string) => void
}

const defaultState = {
  diary: [],
  steps: [],
  assignments: [],
  sorks: [],
}

const useStore = create(persist<StoreState>((set, get) => ({
  theme: 'dark',
  data: defaultState,
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
  reset: () => set((state) => ({ data: defaultState })),
  resetKeys: (keys, section) => {
    if (!keys) return

    let d = get().data

    if (keys)
      keys.forEach((key) => section && d[section]?.[key] !== undefined ? delete d[section][key] : delete d[key])
    else
      d = defaultState

    set((state) => ({ data: d }))
  },
}), {
  version: 1,
  name: 'sov',
  storage: createJSONStorage(() => AsyncStorage),
  migrate: async (state: any, version: number) => {
    if (version < 1) {
      console.log('migrating data...')
      try {
        const fileData = await AsyncStorage.getItem('file')
        if (fileData) {
          const data = JSON.parse(fileData as string)
          const diary = (data?.kanslodagbok ?? []).map((d: any) => ({
            'situation': d.dagbok?.situation,
            'grundkansla': d.dagbok?.feeling,
            'kanslotermometer': d.dagbok?.termometer,
            'kanslan-i-kroppen': d.dagbok?.bodyFeeling,
            'date': d.date
          }))
          state.data.diary = diary
          await AsyncStorage.setItem('_file', JSON.stringify(fileData))
          await AsyncStorage.removeItem('file')
        }
      } catch (e) {
        console.log(e)
      }
      return state;
    }
  }
}));

export { shallow, useStore };
export default useStore
