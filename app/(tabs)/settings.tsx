import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, reset } from '@/utils/database';
import CustomModal from '@/app/components/Modal'

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
    reset(db);
  }

  interface Props {
    text: string;
    onPress?: () => void;
  }

  const data = [
    { text: "Change daily cup intake", onPress: ()=> setModalVisible(true) },
    { text: "Reset", onPress: handleReset },
    { text: "Exit", onPress: () => console.log("Exit pressed") },
  ];

  const SettingsItem = ({ text, onPress }: Props) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles.item}
    >
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/water.png')} style={styles.image} />
        <Text style={styles.title}>Hydrate App</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <SettingsItem
              text={item.text}
              onPress={item.onPress}
            />
          )}
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: '5%',
    flex: 1,
    width: '100%',
  },
  image: {
    marginTop: hp('5%'),
    width: wp("50%"),
    height: hp("25%"),
    resizeMode: "contain",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  }
});