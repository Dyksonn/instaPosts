import { useEffect } from "react"
import { StyleSheet, View, useWindowDimensions } from "react-native"
import { Skeleton } from "moti/skeleton"
import { useNavigation, CommonActions } from "@react-navigation/native"

import Animated, {
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated"

export function Splash() {
  const logoScale = useSharedValue(1)
  const logoPositionY = useSharedValue(0)
  const contentDisplay = useSharedValue(0)

  const router = useNavigation();

  const dimensions = useWindowDimensions()

  const skeletonColors = [
    '#232323',
    '#1c1c1c',
    '#232323',
  ]

  const logoAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoPositionY.value },
    ],
  }))

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    display: contentDisplay.value === 1 ? "flex" : "none",
  }))

  function logoAnimation() {
    logoScale.value = withSequence(
      withTiming(0.7),
      withTiming(1.3),
      withTiming(1, undefined, (finished) => {
        if (finished) {
          logoPositionY.value = withSequence(
            withTiming(50, undefined, () => (contentDisplay.value = 1)),
            withTiming(-dimensions.height, { duration: 400 })
          )

          runOnJS(onEndSplash)()
        }
      })
    )
  }

  function filters() {
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        key={index}
        width={60}
        height={26}
        radius={6}
        colors={skeletonColors}
      />
    ))
  }

  function boxes(column: "right" | "left") {
    const rest = column === "left" ? 0 : 1

    return Array.from({ length: 20 })
      .filter((_, index) => index % 2 === rest)
      .map((_, index) => {
        const height = index % 2 === (column === "left" ? 0 : 1) ? 200 : 300

        return (
          <Animated.View key={index} style={[styles.box, { height }]}>
            <Skeleton colors={skeletonColors} width="100%" height={height} />
          </Animated.View>
        )
      })
  }

  function onEndSplash() {
    setTimeout(() => {
      router.dispatch(
        CommonActions.reset({
            routes: [
                {
                    name: `Home-tab`,
                }
            ]
        })
      )
    }, 2000)
  }

  useEffect(() => {
    logoAnimation()
  }, [])

  return (
    <View className="flex-1 justify-center items-center bg-black pl-4 pr-4">
      <Animated.Image
        source={require("@/assets/logo.png")}
        style={[styles.logo, logoAnimatedStyles]}
      />

      <Animated.View
        style={[styles.content, contentAnimatedStyles]}
        entering={SlideInDown.duration(700)}
      >
        <View className="w-full flex-row gap-6 pb-4">{filters()}</View>

        <View className="flex-1 w-full flex-row gap-4">
          <View className="flex-1 gap-4">{boxes("left")}</View>
          <View className="flex-1 gap-4">{boxes("right")}</View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
  },
  box: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: '#232323',
  },
  content: {
    flex: 1,
    width: "100%",
  },
})
