import styles from "@/components/styles.jsx";
import { TouchableOpacity, View, Text } from "react-native";

export default function Settings() {
  
  const handleLogout = async () => {

  } 

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
    </View>
  );
}