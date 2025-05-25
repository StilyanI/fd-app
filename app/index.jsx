import { StyleSheet, Text, TouchableOpacity, View , Image } from "react-native";
import { useRouter } from "expo-router";
import Logo from '@/assets/images/foodster-logo.png';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={ Logo } style={{width: 300, height: 250}}></Image>
      <Text style={styles.title}>Welcome!</Text>
      <TouchableOpacity
      style={styles.button}
      // onPress={() => router.push('/auth')}
      onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
    marginTop: -100
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#00bd52',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})