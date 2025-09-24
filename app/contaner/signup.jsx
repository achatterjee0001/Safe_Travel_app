import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import bgsignup from '../../assets/Signup.jpg';
const SignupScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={bgsignup}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Sign Up!</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              keyboardType="default"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
            />

            <View style={styles.policyContainer}>
              <Switch
                trackColor={{ false: '#767577', true: '#f4f3f4' }}
                thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={styles.policyText}>I accept the policy and terms</Text>
            </View>

            <TouchableOpacity 
              style={styles.signupButton}
              onPress={() => navigation.navigate('Features')}
            >
              <Text style={styles.signupButtonText}>Signup</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

// Use window dimensions to make styles more responsive
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Aligns children (the form) to the bottom
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // A slight dark overlay for better text contrast
    justifyContent: 'flex-end',
  },
  formContainer: {
    backgroundColor: 'rgba(50, 50, 50, 0.75)', // Semi-transparent dark background
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    // Using backdrop filter for the blur effect seen in the image (iOS only)
    // On Android, this will just be a semi-transparent view.
    // To achieve a true cross-platform blur, a library like @react-native-community/blur is needed.
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 10,
  },
  policyText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 10,
  },
  signupButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  signupButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#DDDDDD',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignupScreen;
