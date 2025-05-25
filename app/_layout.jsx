import { Stack } from "expo-router";

export default function RootLayout() {
  return (<Stack
    screenOptions={{
        headerStyle: {
            backgroundColor: '#7af078'
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold'
        }
    }}
  >
    <Stack.Screen name='index' options={{title: ''}} />
    <Stack.Screen name='auth' options={{title: 'Login/Sign Up'}} />
    <Stack.Screen name='home' options={{title: 'Home'}} />
  </Stack>
  );
}
