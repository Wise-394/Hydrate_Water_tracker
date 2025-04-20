import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DrinkButton from "../components/DrinkButton";
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, addWaterLog, getTodayWaterLogs } from '@/utils/database';
import { checkKey, getDailyCupIntake } from '@/utils/keyValue';
import { useWaterLog } from '@/contexts/WaterLogContext';
import DonutChart from "@/app/components/DonutChart";

const DEFAULT_DAILY_INTAKE_GOAL = 8;

const Index = () => {
  const db = useSQLiteContext();
  const [consumedGlasses, setConsumedGlasses] = useState(0);
  const [dailyIntakeGoal, setDailyIntakeGoal] = useState(DEFAULT_DAILY_INTAKE_GOAL);
  const { refreshKey, triggerRefresh } = useWaterLog(); // triggerRefresh is called when user drinks
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize DB and daily goal once
  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB(db);
        const goalExists = await checkKey();
        if (goalExists) {
          const goal = await getDailyCupIntake();
          setDailyIntakeGoal(goal ?? DEFAULT_DAILY_INTAKE_GOAL);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("DB Init error:", error);
      }
    };
    initialize();
  }, []);

  // Refresh logs only when drink is added or refreshKey changes
  useEffect(() => {
    const loadWaterLogs = async () => {
      try {
        const logs = await getTodayWaterLogs(db);
        setConsumedGlasses(logs);
      } catch (error) {
        console.error("Error fetching water logs:", error);
      }
    };

    if (isInitialized) {
      loadWaterLogs();
    }
  }, [refreshKey, isInitialized]);

  // Chart data based on goal and consumed
  const chartData = [
    {
      value: Math.max(dailyIntakeGoal - consumedGlasses, 0),
      color: 'white',
    },
    {
      value: consumedGlasses,
      color: '#7FC9FF',
    },
  ];

  // Handle drink
  const handleDrinkWater = async () => {
    try {
      await addWaterLog(db, new Date());
      triggerRefresh(); // this updates refreshKey and triggers log reload
    } catch (error) {
      console.error("Water logging error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>
          {consumedGlasses} / {dailyIntakeGoal} glasses of water
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <DonutChart data={chartData} />
        </View>
        <DrinkButton onPress={handleDrinkWater} />
      </View>

      <View style={styles.footer}>
        {/* Reserved for additional UI */}
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
  footer: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5498FF',
    justifyContent: 'space-evenly',
  },
});

export default Index;
