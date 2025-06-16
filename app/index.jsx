import { Text, TouchableOpacity, View , Image } from "react-native";
import { useRouter } from "expo-router";
import Logo from '@/assets/images/foodster-logo.png';
import styles from "@/components/styles.jsx";
import { auth } from "@/backend/firebaseConfig.js"
import { onAuthStateChanged } from "firebase/auth";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={ Logo } style={{width: 300, height: 250}}></Image>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity
      style={styles.button}
      onPress={() => {
        onAuthStateChanged(auth, (user) => {
          if (user) router.replace('/home');
          else router.replace('/auth')
        })
      }}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}