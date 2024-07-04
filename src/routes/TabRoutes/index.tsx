import { Home } from "@/screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"component={Home} />
        </Tab.Navigator>
    )
}