import { Feather } from '@expo/vector-icons';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import map from '../../assets/map.jpg'

// --- Reusable Components ---

// A component for security check items
const SecurityCheckItem = ({ icon, iconBgColor, title, subtitle }) => (
  <View style={styles.securityCheckItem}>
    <View style={[styles.securityCheckIcon, { backgroundColor: iconBgColor }]}>
      {icon}
    </View>
    <View style={styles.securityCheckTextContainer}>
      <Text style={styles.securityCheckTitle}>{title}</Text>
      <Text style={styles.securityCheckSubtitle}>{subtitle}</Text>
    </View>
  </View>
);


// --- Main Safety Screen Component ---
export default function SafetyScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        
        {/* --- Header --- */}
        <Text style={styles.headerTitle}>Safety</Text>

        {/* --- Current Location Section --- */}
        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          
          {/* Map Container */}
          <View style={styles.mapContainer}>
            <Image
              source={map}
              style={styles.mapImage}
            />
          </View>

          {/* Share Location Button */}
          <TouchableOpacity style={styles.shareLocationButton} activeOpacity={0.8}>
            <View style={styles.shareLocationContent}>
              <Feather name="map-pin" size={20} color="white" />
              <View style={styles.shareLocationText}>
                <Text style={styles.shareLocationTitle}>Share Current Location</Text>
                <Text style={styles.shareLocationCoords}>25.26560 N , 82.99098 E</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- Security Check Section --- */}
        <View style={styles.securitySection}>
          <Text style={styles.sectionTitle}>Security check</Text>
          
          <SecurityCheckItem
            icon={<Feather name="shield" size={24} color="white" />}
            iconBgColor="#EF4444"
            title="Local Emergency"
            subtitle="Police, Medical, Embassy"
          />
          
          <SecurityCheckItem
            icon={<Feather name="check-circle" size={24} color="white" />}
            iconBgColor="#10B981"
            title="Safety Check-in"
            subtitle="Notify Contacts I'm Safe"
          />
        </View>

        {/* --- Action Buttons --- */}
        <View style={styles.actionButtonsSection}>
          <TouchableOpacity style={styles.sosButton} activeOpacity={0.8}>
            <Text style={styles.sosButtonText}>SOS / Panic Button</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.securityFeaturesButton} activeOpacity={0.8}>
            <Feather name="map-pin" size={24} color="white" />
            <Text style={styles.securityFeaturesButtonText}>Share Your Live Location</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 90, // Space for bottom tab bar
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  locationSection: {
    marginBottom: 30,
  },
  mapContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  shareLocationButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
  },
  shareLocationContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareLocationText: {
    marginLeft: 12,
    flex: 1,
  },
  shareLocationTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  shareLocationCoords: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 2,
  },
  securitySection: {
    marginBottom: 30,
  },
  securityCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  securityCheckIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  securityCheckTextContainer: {
    flex: 1,
  },
  securityCheckTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  securityCheckSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
  },
  actionButtonsSection: {
    marginBottom: 20,
  },
  sosButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  securityFeaturesButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  securityFeaturesButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
