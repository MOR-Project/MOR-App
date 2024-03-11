import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to Home Screen!</Text>
    </View>
  );
};

const AuthScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const handleAuthAction = () => {
    if (isLogin) {
      // Check if username and password match any registered user
      const user = registeredUsers.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        navigation.navigate('Home');
      } else {
        console.log('Invalid username or password.');
      }
    } else {
      // Here, you would typically add the user to your backend or store
      // For simplicity, let's just log the new user information
      console.log('Signing up with:', username, email, password);
      setRegisteredUsers([...registeredUsers, { username, email, password }]);
    }
    // You can navigate to another screen or perform other actions after login/signup
  };

  return (
    <ImageBackground
      source={require('./assets/app-bg.jpg')} // corrected import path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      )}
        <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
       <Button title={isLogin ? 'Login' : 'Sign Up'} onPress={handleAuthAction} />
      <Text style={styles.toggleButton} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'New user? Sign up here' : 'Already have an account? Log in here'}
      </Text>
      </View>
    </ImageBackground>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
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

export default App;
