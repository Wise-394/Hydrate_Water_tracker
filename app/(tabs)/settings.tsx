import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, reset, getAllWaterLogs } from '@/utils/database';
import CustomModal from '@/app/components/Modal';
import SettingsItem from "../components/SettingsItem";
import { resetKeyValue } from "@/utils/keyValue";
import { useWaterLog } from '@/contexts/WaterLogContext';
import { useRouter } from 'expo-router';
export default function SettingsScreen() {
  const db = useSQLiteContext();
  const { refreshKey, triggerRefresh } = useWaterLog();  
  const [modalVisible, setModalVisible] = useState(false);
  type SettingsIcon = 'cup-water' | 'restore' | 'information-outline';
  const router = useRouter();
  useEffect(() => {
    const initialize = async () => {
      await initDB(db);
    };
    initialize();
  }, [db]);

  const handleReset = () => {
    Alert.alert(
      "Reset App",
      "Are you sure you want to reset all data?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Reset", 
          onPress: () => {
            reset(db); 
            resetKeyValue();  
            triggerRefresh();  
          },
          style: "destructive"
        }
      ]
    );
  };

  const dataSettings = [
    { id: '1', text: "Change daily cup intake", icon: 'cup-water' as SettingsIcon, onPress: () => setModalVisible(true) },
    { id: '2', text: "Reset Data", icon: 'restore' as SettingsIcon, onPress: handleReset },
    { id: '3', text: "About", icon: 'information-outline' as SettingsIcon, onPress: () => router.navigate('/about') },
  ];
  

  return (
    <>
      <View style={styles.header}>
        <Image source={require('@/assets/images/water.png')} style={styles.image} />
        <Text style={styles.title}>Hydrate App</Text>
        <Text style={styles.subtitle}>Stay hydrated, stay healthy</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={dataSettings}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <SettingsItem
              text={item.text}
              icon={item.icon}
              onPress={item.onPress}
              isLast={index === dataSettings.length - 1}
            />
          )}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={<Text style={styles.sectionTitle}>Settings</Text>}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <CustomModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  header: {
    paddingTop: hp('6%'),
    paddingBottom: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5498FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    backgroundColor: '#EAF6FF',
  },
  image: {
    width: wp("25%"),
    height: hp("13%"),
    resizeMode: "contain",
  },
  listContainer: {
    paddingBottom: hp('3%'),
  },
  title: {
    fontSize: hp('3.2%'),
    fontWeight: 'bold',
    color: 'white',
    marginTop: hp('1%'),
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: hp('2%'),
    color: 'white',
    fontFamily: 'Inter-Regular',
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: hp('2%'),
    paddingLeft: 5,
    fontFamily: 'Inter-SemiBold',
  },
});
