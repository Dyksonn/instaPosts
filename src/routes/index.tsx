import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./StackRoutes";
import { ToastProvider } from "@/components/Toast";

export function Routes() {
    return (
        <ToastProvider position="top">
            <NavigationContainer>
                <StackRoutes />
            </NavigationContainer>
        </ToastProvider>
    )
}