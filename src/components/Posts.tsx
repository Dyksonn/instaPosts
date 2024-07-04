import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { Post } from "@/components/Post"

export function Posts({ posts }: { posts: IPosts[] }) {
  function postsByColumn(column: "right" | "left") {
    const rest = column === "left" ? 0 : 1

    return posts
      .filter((_, index) => index % 2 === rest)
      .map((post) => <Post key={post.id} post={post} />)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16
      }}
    >
      <View className="flex-1 flex-row">
        <View className="flex-1">{postsByColumn("left")}</View>
        <View className="flex-1">{postsByColumn("right")}</View>
      </View>
    </ScrollView>
  )
}
