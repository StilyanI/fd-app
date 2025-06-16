import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import styles from "@/components/styles.jsx";
import { auth } from "@/backend/firebaseConfig.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { router } from "expo-router";

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const setReadableError = (error) => {
    switch(error.code){
      case AuthErrorCodes.INVALID_PASSWORD:
        setError("Wrong password")
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        setError("Invalid email")
        break;
      case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
        setError("Email or password is wrong")
        break;
      case AuthErrorCodes.EMAIL_EXISTS:
        setError("Account with email already exists")
        break;
      case AuthErrorCodes.WEAK_PASSWORD:
        setError("Password must have at least 6 charachters")
        break;
      default:
        setError(error.code)
        break;
    }
  }

  const handleAuth = async () => {
    if(!email || !password){
      setError("Either email or password field is empty");
      return;
    }

    if(isRegistering){
      if(!confirmPassword){
        setError("Confirm password is empty");
        return;
      }

      if(password !== confirmPassword){
        setError("Passwords don't match");
        return;
      }

      try{
        await createUserWithEmailAndPassword(auth, email, password)
      }catch (err){
        setReadableError(err)
        return;
      }

    }else{
      try{
        await signInWithEmailAndPassword(auth, email, password)
      }catch (err){
        setReadableError(err)
        return;
      }
    }

    router.replace('/home')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isRegistering ? 'Sign Up' : 'Login'}</Text>

      <TextInput
        onChange={() => setError(null)}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        onChange={() => setError(null)}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isRegistering && (
        <TextInput
          onChange={() => setError(null)}
          style={styles.input}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isRegistering ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
          setIsRegistering(!isRegistering);
          setError(null);
        }}>
        <Text style={styles.switchText}>
          {isRegistering
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}