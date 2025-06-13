import { Text, TouchableOpacity, View , Image } from "react-native";
import { useRouter } from "expo-router";
import Logo from '@/assets/images/foodster-logo.png';
import styles from "@/components/styles.jsx";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={ Logo } style={{width: 300, height: 250}}></Image>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity
      style={styles.button}
      // onPress={() => router.push('/auth')}
      //for quick home testing
      onPress={() => router.replace('/home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}