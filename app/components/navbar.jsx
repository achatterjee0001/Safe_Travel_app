import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CommonNavBar = ({ navigation, activeTab = 'Dashboard' }) => {
  const navItems = [
    { name: 'Dashboard', icon: 'grid', iconType: 'Feather', route: 'Dashboard' },
    { name: 'ID', icon: 'card-account-details-outline', iconType: 'MaterialCommunityIcons', route: 'ID' },
    { name: 'Safety', icon: 'shield', iconType: 'Feather', route: 'Safety' },
    { name: 'Trips', icon: 'compass', iconType: 'Feather', route: 'Trips' },
    { name: 'Settings', icon: 'settings', iconType: 'Feather', route: 'Settings' },
  ];

  const handleNavigation = (route) => {
    navigation.navigate('MainApp', { screen: route });
  };

  const renderIcon = (item) => {
    const iconProps = {
      size: 24,
      color: activeTab === item.name ? '#14B8A6' : '#9CA3AF',
    };

    if (item.iconType === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={item.icon} {...iconProps} />;
    }
    return <Feather name={item.icon} {...iconProps} />;
  };

  return (
    <View style={styles.bottomNavigation}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          onPress={() => handleNavigation(item.route)}
        >
          {renderIcon(item)}
          <Text style={[
            styles.navLabel,
            activeTab === item.name && styles.activeNavLabel
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  activeNavLabel: {
    color: '#14B8A6',
  },
});

export default CommonNavBar;
