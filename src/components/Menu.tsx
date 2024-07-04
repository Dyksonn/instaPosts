import { forwardRef } from "react"
import { Text, View } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { FontAwesome } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { MenuButton } from "@/components/MenuButton"

export const Menu = forwardRef<BottomSheet, MenuProps>(({ onClose }, ref) => {
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={[0.01, 230]}
      backgroundStyle={{ backgroundColor: colors.gray[800] }}
      handleComponent={() => null}
    >
      <View className="flex-1 p-6 items-center">
        <View className="flex-row">
          <FontAwesome
            name="close"
            size={24}
            color={colors.white}
            onPress={onClose}
          />
          <Text className="text-lg font-medium color-white flex-1 text-center mr-6">Comece a criar agora</Text>
        </View>
        <View className="flex-row gap-4 mt-8">
          <MenuButton title="Pin" icon="home" />
          <MenuButton title="Colagem" icon="paste" />
          <MenuButton title="Pasta" icon="folder" />
        </View>
      </View>
    </BottomSheet>
  )
})
