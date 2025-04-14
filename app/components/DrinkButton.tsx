import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


type Props = {
    onPress: () => void;
}
const DrinkButton = ({onPress}: Props) => {
  return (
    <Pressable style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      onPress={onPress}>
      <Text style={styles.title}> DRINK WATER</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: wp('40%'),
    height: hp('7%'),
    borderRadius: 30
  },
  pressedContainer: {
    backgroundColor: '#D3D3D3',
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default DrinkButton;
