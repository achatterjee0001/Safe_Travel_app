// TripsScreen.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const trips = [
  { iconName: "map-marker-outline", title: "Start Point", data: "123 Main St, AnyTown" },
  { iconName: "flag-outline", title: "Destination", data: "456 Elm St, AnyTown" },
  { iconName: "map-marker-outline", title: "Checkpoints", data: "3" },
  { iconName: "bell-outline", title: "Alerts Triggered", data: "0" },
];

// const documents = [
//     { name: "ID Proof", type: "PDF", date: "2023-10-01" },
// ]

const Tab = createBottomTabNavigator();

const trip = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="arrow-left" size={24} color="#fff" />
        <Text style={styles.header}>Trip to Mountain View</Text>
      </View>

      {/* content */}
      <ScrollView>
        <Text style={styles.sectionTitle}>Journey Summary</Text>
        {trips.map((trip, index)=> {
            return (
                <View key={index} style={styles.tripItem}>
                    <View style={styles.iconContainer}>
                        <Icon name={trip.iconName} size={22} color="#fff" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.tripTitle}>{trip.title}</Text>
                        <Text style={styles.tripData}>{trip.data}</Text>
                    </View>
                </View>
            )
        })}
        <Text style={styles.sectionTitle}>Documentation</Text>
        <View style={styles.tripItem}>
            <View style={styles.iconContainer}>
                <Icon name="download-outline" size={22} color="#fff" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.tripTitle}>Download Proof of Journey</Text>
            </View>
            <TouchableOpacity>
                <Icon name="chevron-right" size={22} color="#9BA1A6" />
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default trip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121A21", // dark background
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
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
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  tripData: {
    fontSize: 13,
    color: "#9BA1A6",
    marginTop: 2,
  },
});
