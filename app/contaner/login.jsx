import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import bglogin from '../../assets/bglogin.jpg';


// Get screen dimensions
const { width, height } = Dimensions.get('window');

// A simple SVG icon component for the checkbox.
// In a real app, you might use a library like react-native-svg for full SVG support.
const CheckboxIcon = ({ checked }) => (
  <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
    {checked && <View style={styles.checkboxCheckmark} />}
  </View>
);

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* React Native's core ImageBackground doesn't support SVG out of the box.
        To use your SVG image, you'll need to install `react-native-svg` and `react-native-svg-transformer`.
        
        1. Install the libraries:
           npm install react-native-svg
           npm install --save-dev react-native-svg-transformer
           
        2. Configure metro.config.js to use the transformer.
        
        3. Then you can import your SVG like a component:
           import MyBackgroundImage from './path/to/your/image.svg';
           
        And use it like this, adjusting width and height as needed:
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <MyBackgroundImage width="100%" height="100%" style={{ position: 'absolute' }} />
        </View>
      */}
      <ImageBackground
        source={bglogin}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.overlay}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Log In!</Text>

              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#A9A9A9"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
              />

              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.rememberMeContainer}
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <CheckboxIcon checked={rememberMe} />
                  <Text style={styles.optionsText}>Remember me</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.optionsText}>Forget Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.loginButton} 
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Features')}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={[styles.signUpText, styles.signUpLink]}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#333',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)', // A slight dark overlay to make text pop
  },
  formContainer: {
    backgroundColor: 'rgba(61, 52, 52, 0.63)', // Semi-transparent brownish color from the image
    paddingHorizontal: width * 0.08,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.05,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    width: '100%',
    // Note: blurRadius is not a valid style property for View. To add a blur effect,
    // wrap this container in a BlurView from 'expo-blur' in your component, e.g.:
    // ...</BlurView>
    
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: height * 0.04,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'Roboto-Bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBase: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFFFFF',
  },
  checkboxCheckmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5C4033', // Match the container color
  },
  optionsText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#5C4033',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    width: '80%',
    backgroundColor: 'rgba(130, 24, 24, 0.3)',
    marginVertical: 25,
  },
  signUpContainer: {
    flexDirection: 'row',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  signUpLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
