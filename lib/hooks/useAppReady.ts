import * as  SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function useAppReady({ delay = 0, prepare = async () => { } }: { delay?: number, prepare?: () => Promise<void> }) {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    prepare?.().then(() => setTimeout(async () => {
      await SplashScreen.hideAsync();
      setAppIsReady(true)
    }, delay)).catch(console.error);
  }, []);

  return appIsReady;
}