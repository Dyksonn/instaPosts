import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import * as SplashScreen from "expo-splash-screen"

import "./src/styles/global.css"
import { Routes } from '@/routes';

SplashScreen.preventAutoHideAsync()

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  });

  if (fontsLoaded) {
    SplashScreen.hideAsync()
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {fontsLoaded && <Routes />}
    </GestureHandlerRootView>
  )
}
