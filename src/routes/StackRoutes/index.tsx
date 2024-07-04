import { Splash } from "@/screens/Splash";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabRoutes } from "../TabRoutes";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Splash" component={Splash} />

            <Stack.Screen name="Home-tab" component={TabRoutes} />
        </Stack.Navigator>
    )
}