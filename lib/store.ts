import { create } from "zustand";
import { shallow } from 'zustand/shallow';
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type Settings = {
}

const defaultSettings: Settings = {
}

export interface StoreState {
  data: any,
  theme: 'light' | 'dark',
  settings: Settings
  setSettings: (settings: any) => void
  setTheme: (theme: 'light' | 'dark') => void,
  setData: (data: any) => void,
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
  settings: defaultSettings,
  setSettings: (settings) => {
    set((state) => ({ settings }))
  },
  setTheme: (theme: 'light' | 'dark') => {
    set((state) => ({ theme }))
  },
  setData: (data) => {
    const d = { ...get().data, ...data }
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
