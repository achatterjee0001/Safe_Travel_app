import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// To use vector icons, you need to install the package first.
// For Expo: expo install @expo/vector-icons
// For bare React Native: npm install react-native-vector-icons
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';


// --- Reusable Components ---

// A component for the list items in "Security Features"
const FeatureRow = ({ icon, iconBgColor, title, subtitle, isLink = false }) => (
  <View style={styles.featureRow}>
    <View style={[styles.featureIconContainer, { backgroundColor: iconBgColor }]}>
      {icon}
    </View>
    <View style={styles.featureTextContainer}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={[styles.featureSubtitle, isLink && styles.linkText]}>{subtitle}</Text>
    </View>
  </View>
);


// --- Main App Component ---
export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {/* --- Header --- */}
        <Text style={styles.headerTitle}>Blockchain ID</Text>

        {/* --- User Info Card --- */}
        <View style={styles.userInfoContainer}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                    style={styles.avatar}
                />
                <View style={styles.verifiedBadge}>
                    <Feather name="check" size={12} color="white" />
                </View>
            </View>
            <View>
                <Text style={styles.userName}>Mrs. Amrita Singh</Text>
                <Text style={styles.userStatus}>Verified</Text>
            </View>
        </View>

        {/* --- QR Code Section --- */}
        <View style={styles.qrSection}>
            <Image
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BlockchainID-4567-4567-5123-4567-4561&bgcolor=111827&color=60A5FA&qzone=1' }}
                style={styles.qrCode}
            />
            <Text style={styles.qrTitle}>Blockchain ID</Text>
            <Text style={styles.qrSubtitle}>4567-4567-5123-4567-4561</Text>
        </View>


        {/* --- Security Features --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Features</Text>
          <FeatureRow
            icon={<Feather name="download" size={24} color="white" />}
            iconBgColor="#3B82F6"
            title="Current Location"
            subtitle="123 Anystreet, Varanasi, Uttar Pradesh"
          />
          <FeatureRow
            icon={<MaterialCommunityIcons name="swap-horizontal" size={24} color="white" />}
            iconBgColor="#10B981"
            title="Path Details"
            subtitle="Super Market > Sarnath > Chock"
          />
          <FeatureRow
            icon={<Feather name="clock" size={24} color="white" />}
            iconBgColor="#EF4444"
            title="Location History"
            subtitle="View History"
            isLink={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    backgroundColor: '#111827',
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90, // Space for bottom tab bar
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  verifiedBadge: {
    backgroundColor: '#10B981',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: '#1F2937'
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  userStatus: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  qrSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  qrCode: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  qrSubtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  linkText: {
    color: '#3B82F6',
    fontWeight: '600'
  },
  // Removed tabBar, tabItem, tabName styles as bottom navigation is not used anymore
});
