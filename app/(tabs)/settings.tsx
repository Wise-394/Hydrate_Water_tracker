import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, reset } from '@/utils/database';
import CustomModal from '@/app/components/Modal';
import SettingsItem from "../components/SettingsItem";

export default function SettingsScreen() {
  const db = useSQLiteContext();
  const [modalVisible, setModalVisible] = useState(false);

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
          onPress: () => {reset(db)},
          style: "destructive"
        }
      ]
    );
  }

 

  const data = [
    { id: '1', text: "Change daily cup intake", onPress: ()=> setModalVisible(true) },
    { id: '2', text: "Reset Data", onPress: handleReset },
    { id: '3', text: "About", onPress: () => console.log("About pressed") },
  ];



  return (
      <><View style={styles.header}>
      <Image source={require('@/assets/images/water.png')} style={styles.image} />
      <Text style={styles.title}>Hydrate App</Text>
      <Text style={styles.subtitle}>Stay hydrated, stay healthy</Text>
    </View><View style={styles.content}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <SettingsItem
              text={item.text}
              onPress={item.onPress}
              isLast={index === data.length - 1} />
          )}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={<Text style={styles.sectionTitle}>Settings</Text>}
          showsVerticalScrollIndicator={false} />
      </View><CustomModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)} /></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: hp('5%'),
    paddingBottom: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp('5%'),
  },
  image: {
    width: wp("30%"),
    height: hp("15%"),
    resizeMode: "contain",
  },
  listContainer: {
    paddingBottom: hp('3%'),
  },
  title: {
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: hp('1%'),
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: hp('1.8%'),
    color: '#7f8c8d',
    marginBottom: hp('1%'),
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: hp('2%'),
    paddingLeft: 10,
    fontFamily: 'Inter-SemiBold',
  },
});