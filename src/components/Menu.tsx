import { forwardRef, useState, useEffect } from "react"
import { Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from "react-native"
import BottomSheet from "@gorhom/bottom-sheet"
import { FontAwesome } from "@expo/vector-icons"

import { colors } from "@/styles/colors"
import { Input } from "@/components/Input"
import { useToast } from "@/components/Toast"

import { usePosts } from "@/hooks/usePosts"

export const Menu = forwardRef<BottomSheet, MenuProps>(({ onClose }, ref) => {
  const { onCreatePost } = usePosts();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(false);


  function handleCreatePost() {
    if (!title || !description) {
      toast("Preencha todos os campos", "destructive");
      return;
    }

    onCreatePost({ title, body: description });
    setTitle("");
    setDescription("");
    onClose();
    Keyboard.dismiss();
  }


  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  
  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={[0.01, keyboardStatus ? 680 : 400]}
      backgroundStyle={{ backgroundColor: colors.gray[800] }}
      handleComponent={() => null}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 p-6 ">
        <View className="flex-row">
          <FontAwesome
            name="close"
            size={24}
            color={colors.white}
            onPress={onClose}
          />
          <Text className="text-lg font-medium color-white flex-1 text-center mr-6">Criar agora seu Post-It</Text>
        </View>
        <View className="flex-col gap-4 mt-8">
          <Input 
            label="Titulo" 
            placeholder="Escreva o titulo do Post-It" 
            inputClasses="w-full"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={colors.black}
          />
          <Input 
            label="Descrição" 
            placeholder="Escreva a descrição do Post-It" 
            inputClasses="w-full h-28"
            multiline
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={colors.black} 
          />

          <TouchableOpacity onPress={handleCreatePost} className="bg-green-400 p-4 mt-2 items-center justify-center rounded-lg">
            <Text className="font-medium text-xl color-white">Criar Post-it</Text>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </BottomSheet>
  )
})
