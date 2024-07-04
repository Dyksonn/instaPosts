import { useRef, Fragment } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { colors } from "@/styles/colors";
import { Avatar, AvatarImage } from "@/components/Avatar";

import { Home } from "@/screens/Home";
import { Profile } from "@/screens/Profile";
import { View } from "react-native";
import { Menu } from "@/components/Menu";
import { MenuFragment } from "@/screens/MenuFragment";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();
  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);
  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.white,
          tabBarInactiveTintColor: colors.gray[600],
          tabBarStyle: {
            backgroundColor: colors.black,
            borderColor: colors.black,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Foundation name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Menu"
          component={MenuFragment}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome5 name="plus" size={size} color={color} />
            ),
          }}
          listeners={() => ({
            tabPress: (event) => {
              event.preventDefault();
              handleBottomSheetOpen();
            },
          })}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <Avatar
                className={`${
                  focused ? "border-white" : "border-gray-500"
                }  border-2`}
              >
                <AvatarImage
                  source={{ uri: "https://github.com/dyksonn.png" }}
                />
              </Avatar>
            ),
          }}
        />
      </Tab.Navigator>

      <Menu ref={bottomSheetRef} onClose={handleBottomSheetClose} />
    </View>
  );
}
