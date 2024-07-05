import {
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { usePosts } from "@/hooks/usePosts";
import { colors } from "@/styles/colors";

export function PostDetail({ visible, id, onClose, isPin }: IPostDetail) {
  const { posts, onDeletePost } = usePosts();

  const post = posts.find((post) => post.id === id);


  function handleDeletePost() {
    if (!post) return;

    onDeletePost(post.id);
    onClose();
  }

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
      className="flex-1"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => onClose()}>
        <View
          className="flex-1 justify-center items-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <View
            className="rounded-lg overflow-hidden"
            style={{
              width: 350,
              height: 500,
            }}
          >
            <ImageBackground
              className="flex-1 justify-center items-center"
              source={require("@/assets/quadro.png")}
            >
              <View
                className="justify-center items-center p-5 bg-yellow-400"
                style={{
                  maxWidth: 280,
                }}
              >
                <Entypo
                  name="pin"
                  size={50}
                  color={colors.red[700]}
                  style={{
                    position: "absolute",
                    top: -40,
                  }}
                />
                <Text className="font-bold color-neutral-600 text-xl text-center mb-7">{post?.title}</Text>
                <Text className="font-regular color-gray-700 text-justify text-sm">{post?.body}</Text>


                <View className="flex-row gap-3 mt-3 items-center">
                  <Text className="font-bold color-black text-base">Status:</Text>
                  <Text className={`font-regular ${isPin ? "color-green-400" : "color-red-300"} text-base`}>{isPin ? "FIXADO" : "DESFIXADO"}</Text>
                </View>
              </View>

              <View className="mt-5">
                <TouchableOpacity onPress={handleDeletePost} className="bg-red-200 p-5 rounded-lg flex-row gap-3">
                    <Text className="font-medium text-lg color-white">Jogar fora post-it</Text>
                    <Entypo name="trash" size={24} color={colors.white} />
                </TouchableOpacity>
                </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
