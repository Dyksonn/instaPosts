import { Posts } from "@/components/Posts";
import service from "@/service";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export function Home() {
    const [posts, setPosts] = useState<IPosts[]>([]);

    async function getPosts() {
        try {
            const response = await service.get('/posts');

            setPosts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <View className="flex-1 p-5 bg-neutral-900">
            <View className="items-center mt-14">
                <Text className="color-neutral-400 text-3xl font-bold">Meus Post-Its</Text>
            </View>
            <Posts posts={posts.reverse()} />
        </View>
    );
}