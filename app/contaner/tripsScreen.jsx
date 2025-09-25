// TripsScreen.jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import CommonNavBar from '../components/navbar';

const trips = [
  { title: "Trip to Mountain View", date: "2024-01-15" },
  { title: "City Exploration in San", date: "2023-12-20" },
  { title: "Coastal Drive to Monterey", date: "2023-11-05" },
  { title: "Hiking Adventure in Yosemite", date: "2023-10-12" },
];

const Tab = createBottomTabNavigator();

const TripsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="arrow-left" size={24} color="#fff" />
        <Text style={styles.header}>Trips</Text>
      </View>

      {/* Content */}
      <ScrollView>
        <Text style={styles.sectionTitle}>Past Trips</Text>

        {trips.map((trip, index) => (
          <View key={index} style={styles.tripItem}>
            <View style={styles.iconContainer}>
              <Icon name="map-marker-outline" size={22} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.tripTitle}>{trip.title}</Text>
              <Text style={styles.tripDate}>{trip.date}</Text>
            </View>
            <TouchableOpacity>
                <Icon name="download-outline" size={22} color="#9BA1A6" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Common Navigation Bar */}
      {/* <CommonNavBar navigation={navigation} activeTab="Trips" /> */}
    </SafeAreaView>
  );
};

export default TripsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121A21", // dark background
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9BA1A6",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  tripItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A2633",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    padding: 12,
  },
  iconContainer: {
    backgroundColor: "#1565C0",
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  tripTitle: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "500",
  },
  tripDate: {
    fontSize: 13,
    color: "#9BA1A6",
    marginTop: 2,
  },
});
