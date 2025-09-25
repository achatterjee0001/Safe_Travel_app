// SettingsScreen.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const settingsData = [
  {
    title: "Account",
    items: [
      { label: "Personal Information", subtitle: "View and edit your personal information", icon: "account-circle-outline", color: "#00CFFF" },
      { label: "Security", subtitle: "Manage your account security", icon: "shield-check-outline", color: "#00C853" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { label: "Notifications", subtitle: "Customize your notification settings", icon: "bell-outline", color: "#FFD600" },
      { label: "Privacy", subtitle: "Manage your privacy settings", icon: "lock-outline", color: "#1565C0" },
      { label: "Emergency Contacts", subtitle: "Manage your emergency contacts", icon: "phone-outline", color: "#00C853" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Help Center", subtitle: "Get help and support", icon: "help-circle-outline", color: "#3F51B5" },
      { label: "About", subtitle: "Learn more about the app", icon: "information-outline", color: "#7B1FA2" },
    ],
  },
];

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Settings</Text>

        {settingsData.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.item}>
                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                  <Icon name={item.icon} size={24} color="#fff" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121A21", // dark theme background
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    margin: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#9BA1A6",
    fontWeight: "600",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#1A2633",
    marginBottom: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 13,
    color: "#9BA1A6",
    marginTop: 2,
  },
});
