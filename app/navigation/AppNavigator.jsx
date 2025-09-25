import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

// Import screens
import Dashboard from '../contaner/dashboard.jsx';
import Did from '../contaner/did.jsx';
import Features from '../contaner/features.jsx';
import Safety from '../contaner/safety.jsx';
import Settings from '../contaner/settings.jsx';
import Trips from '../contaner/tripsScreen.jsx';

import PersonalInfo from '../components/personalInfo.jsx';
import Login from '../contaner/login.jsx';
import Signup from '../contaner/signup.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for main app screens
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'ID') {
            iconName = 'card-account-details-outline';
          } else if (route.name === 'Safety') {
            iconName = 'shield';
          } else if (route.name === 'Trips') {
            iconName = 'map';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          // Use MaterialCommunityIcons for ID tab, Feather for others
          if (route.name === 'ID') {
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#1F2937',
          borderTopColor: '#374151',
          height: 75,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="ID" component={Did} />
      <Tab.Screen name="Safety" component={Safety} />
      <Tab.Screen name="Trips" component={Trips} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#111827' },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Features" component={Features} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
