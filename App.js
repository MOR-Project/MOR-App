import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator(); // Stack navigator for managing navigation

const HomeScreen = () => { // Home screen component
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
    </View>
  );
};

const AuthScreen = ({ navigation }) => { // Authentication screen component
  const [username, setUsername] = useState(''); // State for username input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [isLogin, setIsLogin] = useState(true); // State for toggling between login and sign up
  const [registeredUsers, setRegisteredUsers] = useState([]); // State for storing registered users

  const handleAuthAction = () => { // Function to handle login or sign up action
    if (isLogin) {
      // Check if username and password match any registered user
      const user = registeredUsers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        navigation.navigate('Home'); // Navigate to home screen if login is successful
      } else {
        console.log('Invalid username or password.'); // Log error if login fails
      }
    } else {
      // Here, you would typically add the user to your backend or store
      // For simplicity, let's just log the new user information
      console.log('Signing up with:', username, email, password);
      setRegisteredUsers([...registeredUsers, { username, email, password }]); // Add new user to registeredUsers state
    }
    // You can navigate to another screen or perform other actions after login/signup
  };

  return (
    <ImageBackground
      source={require('./assets/app-bg.jpg')} // Background image source
      style={styles.background} // Style for background image
      resizeMode="cover" // Resize mode for background image
    >
      <View style={styles.container}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text> {/* Display title based on login/signup mode */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)} // Update username state on input change
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)} // Update email state on input change
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)} // Update password state on input change
        />
        <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuthAction} /> {/* Button for login/signup action */}
        <Text style={styles.toggleButton} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'New user? Sign up here' : 'Already have an account? Log in here'}
        </Text> {/* Toggle between login and sign up */}
      </View>
    </ImageBackground>
  );
};

const App = () => { // Main App component
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={AuthScreen} /> {/* Login screen */}
        <Stack.Screen name="Home" component={HomeScreen} /> {/* Home screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({ // Styles for components
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'darkgreen',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  toggleButton: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App; // Export main App component
