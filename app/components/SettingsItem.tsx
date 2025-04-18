import React from "react";
import { TouchableOpacity,StyleSheet, View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Props {
    text: string;
    onPress?: () => void;
    isLast?: boolean;
  }

  const  SettingsItem = ({ text, onPress, isLast }: Props) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, isLast && styles.lastItem]}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      lastItem: {
        marginBottom: 0,
      },
      itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      itemText: {
        flex: 1,
        fontSize: hp('2%'),
        color: '#333',
        marginLeft: 15,
        fontFamily: 'Inter-Medium',
      },
  })

  export default SettingsItem;