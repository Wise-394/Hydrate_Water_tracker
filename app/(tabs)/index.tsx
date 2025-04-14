import React, { useState, useEffect } from "react";
import { Button, Text, View, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DrinkButton from "../components/DrinkButton";
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, addWaterLog, getAllWaterLogs} from '@/utils/database';

export default function Index() {
  const db = useSQLiteContext();
  const [drinkedCount, setDrinkedCount] = useState(0);

  useEffect(() => {
    const initialize = async () => {
      await initDB(db);
      const count = await getAllWaterLogs(db)
      setDrinkedCount(count.length);
    };
    
    initialize(); 
  }, []);

  const onPressDrinkWater = async () => {
    const count = await getAllWaterLogs(db)
    setDrinkedCount(count.length + 1);
    addWaterLog(db,new Date().toISOString())
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>{drinkedCount} / 8 glass of water</Text>
      </View>

      <View style={styles.centerSection}>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/water.png')} style={styles.image} />
        </View>
        <DrinkButton onPress={onPressDrinkWater}/>
      </View>
      <View style = {styles.footer}>
        <Text style = {styles.footerText}>Drinking Streak</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: "#008EE5",
  },

  // Header Section
  header: {
    flex: 0.5,
    alignItems: "center",
    paddingTop: hp("5%"),
  },
  title: {
    fontSize: hp("5%"),
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: hp("3%"),
    color: "#fff",
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    marginBottom: hp("5%"),
  },
  image: {
    width: wp("50%"),
    height: hp("25%"),
    resizeMode: "contain",
  },

  footer: {
    flex: 0.5,
    backgroundColor: 'white'
  },
  footerText: {
    padding: wp("1%"),
    fontSize: hp("3%"),
    fontWeight: 'bold'
  }
});
