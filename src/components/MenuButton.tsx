import { Pressable, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

import { colors } from "@/styles/colors"

type MenuButtonProps = {
  title: string
  icon: keyof typeof FontAwesome.glyphMap
}

export function MenuButton({ title, icon }: MenuButtonProps) {
  return (
    <Pressable className="items-center">
      <FontAwesome
        name={icon}
        size={32}
        color={colors.white}
        className="bg-gray-700 rounded-2xl p-8"
      />
      <Text className="color-white font-medium text-sm mt-2.5">{title}</Text>
    </Pressable>
  )
}
