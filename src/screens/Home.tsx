import { Posts } from "@/components/Posts";
import { View, Text } from "react-native";

import { usePosts } from "@/hooks/usePosts";

export function Home() {
    const { posts } = usePosts();

    return (
        <View className="flex-1 p-5 bg-neutral-900">
            <View className="items-center mt-14">
                <Text className="color-neutral-400 text-3xl font-bold">Meus Post-Its</Text>
            </View>
            <Posts posts={posts.reverse()} />
        </View>
    );
}