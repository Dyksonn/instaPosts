import { useRef, useState } from "react";
import { Text, View, TouchableWithoutFeedback, Animated } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { colors } from "@/styles/colors";
import { useToast } from "./Toast";
import { PostDetail } from "./PostDetail";

type Props = {
  post: IPosts;
};

export function Post({ post }: Props) {
  const { toast } = useToast();
  const [isPin, setIsPin] = useState(false);
  const [postItSelected, setPostItSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimationY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const startShakeAndVibrate = () => {
    const newValue = isPin ? 0 : 1;
    const shakeAndVibrateAnimation = Animated.sequence([
      Animated.parallel([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationY, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationY, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationY, {
          toValue: -5,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimationY, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: newValue,
          duration: 500, 
          useNativeDriver: true,
        })
      ])
    ]);

    shakeAndVibrateAnimation.start(() => {
      setIsPin(prevState => !prevState);

      if (!isPin) {
        toast('Post-It Fixado! 📌', 'success')
      } else {
        toast('Post-It Desafixado! 📌', 'destructive')
      }
    });
  };

  const handleViewPostIt = (id: number) => {
    setPostItSelected(id);
    setVisible(true);
  }

  return (
    <View>
      <TouchableWithoutFeedback
        onLongPress={startShakeAndVibrate}
        onPress={() => handleViewPostIt(post.id)}
      >
        <View className="m-3">
          <Animated.View
            className={`flex-1 p-5 bg-gray-400 border-2 ${isPin ? 'border-green-400' : ''}`}
            style={{
              transform: [
                { translateX: shakeAnimation },
                { translateY: shakeAnimationY },
              ],
            }}
          >
            <Animated.View
              style={{
                opacity,
                position: "absolute",
                top: -16,
                right: -8,
              }}
            >
              <Entypo name="pin" size={30} color={colors.red[700]} />
            </Animated.View>
            <Text className="color-white text-base font-regular">{post.title}</Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      <PostDetail 
        visible={visible}
        id={postItSelected}
        onClose={() => setVisible(false)}
        isPin={isPin}
      />
    </View>
  );
}
