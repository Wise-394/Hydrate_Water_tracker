import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FontAwesome, Foundation } from '@expo/vector-icons';

const AboutScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Content Header Section */}
        <View style={styles.contentHeader}>
          <Image source={require("@/assets/images/water.png")} style={styles.image} />
          <Text style={[styles.contentHeaderText, styles.boldText]}>Welcome to the Hydrate App!</Text>
        </View>

        {/* About Content */}
        <View style={styles.contentAbout}>
          <Text style={styles.bodyText}>
            This app helps you track your water intake to ensure you stay hydrated throughout the day.
          </Text>
          <Text style={styles.bodyText}>
            The Hydrate App allows you to log your daily glass of water intake, set custom goals, and monitor your progress over time with charts. Staying hydrated is essential for your health, and this app is created to track it for you!
          </Text>
        </View>

        {/* Social Media Section */}
        <Text style={[styles.socialsText, styles.boldText]}>My socials:</Text>
        <View style={styles.socialsContainer}>
          <TouchableOpacity style={styles.socialItem}>
            <FontAwesome name="github" size={hp("4%")} color="#5498FF" />
            <Text style={styles.socialUsername}>github.com/Wise-394</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <Foundation name="web" size={hp("4%")} color="#5498FF" />
            <Text style={styles.socialUsername}>jrdumlao.pages.dev</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialItem}>
            <FontAwesome name="linkedin" size={hp("4%")} color="#5498FF" />
            <Text style={styles.socialUsername}>Jhenn Rod Dumlao</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
  },

  // Header styles
  header: {
    backgroundColor: "#5498FF",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    marginRight: wp("3%"),
  },
  backText: {
    fontSize: hp("2.5%"),
    color: "#fff",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: hp("3%"),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
  },

  // Content section styles
  content: {
    flexGrow: 1,
    paddingBottom: hp("1%"),
  },
  contentHeader: {
    alignItems: "center",
    backgroundColor: "#5498FF",
    paddingVertical: hp("1%"),
  },
  contentHeaderText: {
    color: "white",
    fontSize: hp("2.5%"),
    textAlign: "center",
    marginTop: hp("2%"),
  },
  image: {
    width: wp("40%"),
    height: hp("15%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp("4%"),
  },

  // Body text styles
  bodyText: {
    fontSize: hp("2.2%"),
    color: "#2c3e50",
    lineHeight: hp("2.8%"),
    fontFamily: "Inter-Regular",
    textAlign: "justify",
    marginBottom: hp("2.5%"),
  },

  // Social media section styles
  socialsText: {
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  socialsContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: hp("4%"),
  },
  socialItem: {
    alignItems: "center",
    marginVertical: hp("1%"),
  },
  socialUsername: {
    textAlign: "center",
    fontSize: hp("2.2%"),
    color: "#333",
    marginTop: hp("1%"),
    fontFamily: "Inter-Regular",
  },

  // Bold text for titles and headings
  boldText: {
    fontWeight: "bold",
    fontSize: hp("2.4%"),
  },

  // Content about section styles
  contentAbout: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
  },
});

export default AboutScreen;
