import { Text, View, TouchableWithoutFeedback } from "react-native"
import { Entypo } from "@expo/vector-icons"

import { colors } from "@/styles/colors"

type Props = {
  post: IPosts
}

export function Post({ post }: Props) {
  return (
    <TouchableWithoutFeedback onPress={() => alert("gello")}>
        <View className="flex-1 p-5 m-3 bg-orange-400">
            <Entypo name="pin" size={20} color={colors.red[700]} style={{
                position: "absolute",
                top: -8,
                right: -6,
            }} />
            <Text className="text-sm color-white">{post.title}</Text>
        </View>
    </TouchableWithoutFeedback>
  )
}
