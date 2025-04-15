import { getAllWaterLogs, initDB } from "@/utils/database";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";


export default function LogsScreen() {
  const db = useSQLiteContext();
  useEffect(() => {
      const initialize = async () => {
        await initDB(db);
        const count = await getAllWaterLogs(db)
      };
      
      initialize(); 
    }, []);
  
  interface Props {
    text: string;
  }
  const data = [
    { text: "test" },
    { text: "test" },
    { text: "test" },
  ]
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>logs</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Text>{item.text}</Text>
        )}
      />

    </View>
  );
}
