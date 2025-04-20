import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DrinkButton from "../components/DrinkButton";
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, addWaterLog, getTodayWaterLogs } from '@/utils/database';
import { useFocusEffect } from "expo-router";
import { checkKey, getDailyCupIntake } from '@/utils/keyValue';
import { useWaterLog } from '@/contexts/WaterLogContext';
import DonutChart from "@/app/components/DonutChart";

// Default water intake goal if user hasn't set one
const DEFAULT_DAILY_INTAKE_GOAL = 8;

const Index = () => {
  type PieChartData = {
    value: number;
    color: string;
  };

  const db = useSQLiteContext();
  const [consumedGlasses, setConsumedGlasses] = useState(0);
  const [dailyIntakeGoal, setDailyIntakeGoal] = useState(DEFAULT_DAILY_INTAKE_GOAL);
  const [dailyIntakeChartData, setDailyIntakeChartData] = useState<PieChartData[]>([]);
  
  // Refresh data when screen comes into focus
  const { refreshKey, triggerRefresh } = useWaterLog();

  // Load initial data and check for user's custom goal
  const initializeAppData = async () => {
    try {
      await initDB(db);
      const waterLogs = await getTodayWaterLogs(db); 
      setConsumedGlasses(waterLogs); 
      
      if (checkKey()) {
        const goal = getDailyCupIntake();
        setDailyIntakeGoal(goal ?? DEFAULT_DAILY_INTAKE_GOAL); 
      }
    } catch (error) {
      console.error("Initialization error:", error);
    }
  };

  // Calculate the data for the donut chart
  const calculateDailyIntakeChart = () => {
    const count = consumedGlasses ?? 0;
    const goal = dailyIntakeGoal ?? 8;

    const chartData = [
      {
        value: Math.max(goal - count, 0),
        color: 'white',
      },
      {
        value: count,
        color: '#7FC9FF',
      },
    ];
    setDailyIntakeChartData(chartData); 
  };

  // Handle recording a new glass of water
  const handleDrinkWater = async () => {
    try {
      await addWaterLog(db, new Date());
      const updatedLogs = await getTodayWaterLogs(db);
      setConsumedGlasses(updatedLogs);
      triggerRefresh();
    } catch (error) {
      console.error("Water logging error:", error);
    }
  };


  useFocusEffect(React.useCallback(() => {
    initializeAppData();
  }, []));

  useEffect(() => {
    calculateDailyIntakeChart(); 
  }, [consumedGlasses, dailyIntakeGoal]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>
          {consumedGlasses} / {dailyIntakeGoal} glasses of water
        </Text>
      </View>

      {/* Main content with water image and button */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
        <DonutChart data={dailyIntakeChartData} />
        </View>
        <DrinkButton onPress={handleDrinkWater} />
      </View>

      {/* Footer with donut chart */}
      <View style={styles.footer}>
       {/* <Text>test</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5498FF',
  },
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: hp("5%"),
  },
  waterImage: {
    width: wp("50%"),
    height: hp("25%"),
    resizeMode: "contain",
  },
  footer: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5498FF',
    justifyContent: 'space-evenly'
  },
});

export default Index;
