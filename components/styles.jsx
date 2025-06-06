import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center'
  },
  switchText: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 16
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16
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

export default styles;