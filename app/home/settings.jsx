import styles from "@/components/styles.jsx";
import { TouchableOpacity, View, Text } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/backend/firebaseConfig.js"
import { router } from "expo-router";

export default function Settings() {
  
  const handleLogout = async () => {
    signOut(auth).then(() => {
      router.replace('/');
    })
  } 

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
    </View>
  );
}