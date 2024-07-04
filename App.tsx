import { useFonts, Nunito_400Regular, Nunito_500Medium, Nunito_700Bold } from '@expo-google-fonts/nunito';

import "./src/styles/global.css"
import { Routes } from '@/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}
