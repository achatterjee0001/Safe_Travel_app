import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// --- Reusable Components ---
import did from '../../assets/id.jpg';
import map from '../../assets/map.jpg';
// A component for list items in "Safety Features" and "Your Safety Score" sections
const InfoRow = ({ icon, color, title, subtitle, hasToggle, onToggle, toggleValue, hasArrow = true }) => (
  <View style={styles.infoRow}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      {icon}
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoTitle}>{title}</Text>
      {subtitle && <Text style={styles.infoSubtitle}>{subtitle}</Text>}
    </View>
    {hasToggle && <Switch value={toggleValue} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={toggleValue ? '#3B82F6' : '#f4f3f4'} />}
    {hasArrow && !hasToggle && <Feather name="chevron-right" size={22} color="#9CA3AF" />}
  </View>
);


// --- Main App Component ---
export default function App() {
  const [isLiveTracking, setIsLiveTracking] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Feather name="settings" size={24} color="white" />
        </View>

        {/* --- Digital ID Card --- */}
        <View style={styles.cardContainer}>
          <View style={styles.idCard}>
             <Image
                source={did}
                style={styles.idCardImage}
              />
            <View style={styles.idCardInfo}>
               <Text style={styles.idCardName}>Ujwal Singh</Text>
               <Text style={styles.idCardDetails}>ID: 123-456-789</Text>
               <Text style={styles.idCardDetails}>DOB: 12/16/2004</Text>
            </View>
          </View>
          <Text style={styles.cardTitle}>Digital ID</Text>
          <Text style={styles.cardSubtitle}>Secure ID View</Text>
          <Text style={styles.cardVerified}>Verified</Text>
        </View>

        {/* --- Safety Score --- */}
        <View style={styles.section}>
          <View style={styles.scoreHeader}>
            <Text style={styles.sectionTitle}>Your Safety Score</Text>
            <Text style={styles.scoreText}>90/100</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* --- Map --- */}
        <View style={styles.mapContainer}>
          <Image
            source={map}
            style={styles.mapImage}
          />
        </View>

        {/* --- Live Actions --- */}
        <View style={styles.section}>
          <InfoRow
            icon={<Ionicons name="location-outline" size={24} color="white" />}
            color="#34D399"
            title="Live Tracking..."
            hasToggle
            toggleValue={isLiveTracking}
            onToggle={() => setIsLiveTracking(!isLiveTracking)}
          />
          <InfoRow
            icon={<Feather name="bell" size={24} color="white" />}
            color="#F87171"
            title="Panic Button"
          />
          <InfoRow
            icon={<Feather name="globe" size={24} color="white" />}
            color="#60A5FA"
            title="Multilingual Support"
          />
          <InfoRow
            icon={<Feather name="eye" size={24} color="white" />}
            color="#A78BFA"
            title="AI Safety Monitoring"
            subtitle="Real-time safety insights based on AI analysis"
          />
        </View>

        {/* --- Safety Features --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Features</Text>
          <InfoRow
            icon={<Feather name="shield" size={24} color="white" />}
            color="#F87171"
            title="Emergency Reporting"
            subtitle="Report incidents or emergencies"
          />
          <InfoRow
            icon={<Feather name="users" size={24} color="white" />}
            color="#60A5FA"
            title="Location Sharing"
            subtitle="Share your location with trusted contacts"
          />
          <InfoRow
            icon={<MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="white" />}
            color="#34D399"
            title="Safety Tips"
            subtitle="Access safety guidelines and tips"
          />
           <InfoRow
            icon={<Feather name="check-circle" size={24} color="white" />}
            color="#34D399"
            title="View Safety Details"
          />
        </View>

        {/* --- Notifications --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <InfoRow
            icon={<Feather name="alert-triangle" size={24} color="white" />}
            color="#F87171"
            title="Unsafe Area Alert"
            subtitle="Avoid downtown area due to protests"
          />
          <InfoRow
            icon={<Feather name="cloud" size={24} color="white" />}
            color="#A78BFA"
            title="Weather Risk"
            subtitle="Heavy rain expected this evening"
          />
          <InfoRow
            icon={<Feather name="briefcase" size={24} color="white" />}
            color="#60A5FA"
            title="Travel Advisory"
            subtitle="Travel advisory issued for the north"
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
    padding: 16,
    paddingBottom: 80, // Space for bottom tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  idCard: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    width: '80%',
    aspectRatio: 1.586, // ID card aspect ratio
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  idCardImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB'
  },
  idCardInfo: {
    flex: 1,
  },
  idCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827'
  },
  idCardDetails: {
    fontSize: 12,
    color: '#4B5563'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  cardVerified: {
    fontSize: 14,
    color: '#34D399',
    alignSelf: 'flex-start',
    marginTop: 4,
    fontWeight: '600'
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#3B82F6',
    borderRadius: 4,
    width: '90%',
  },
  mapContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  mapImage: {
    width: '100%',
    height: 180,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infoSubtitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
});