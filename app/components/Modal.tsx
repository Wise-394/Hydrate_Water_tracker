import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
  modalVisible: boolean;
  onClose?: () => void;
}

const CustomModal = ({ modalVisible, onClose }: Props) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (modalVisible) {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();
    } else {
      scaleValue.setValue(0);
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View 
          style={[
            styles.container,
            { 
              transform: [{ scale: scaleValue }],
              width: wp('85%'),
              borderRadius: wp('5%'),
              padding: wp('6%'),
            }
          ]}
        >
          <Pressable 
            style={[styles.closeButton, { top: hp('1.5%'), right: wp('4%') }]} 
            onPress={onClose}
          >
            <MaterialIcons name="close" size={wp('6%')} color="#666" />
          </Pressable>

          <View style={styles.content}>
            <Text style={[styles.title, { fontSize: hp('2.8%') }]}>Daily Cup Intake</Text>
            <Text style={[styles.subtitle, { fontSize: hp('2%'), marginTop: hp('1%') }]}>
              Enter your desired daily cup intake
            </Text>
            
            <View style={[styles.divider, { marginVertical: hp('2%') }]} />
            
            
            
            <Pressable 
              style={[
                styles.actionButton, 
                { 
                  marginTop: hp('3%'),
                  paddingVertical: hp('1.8%'),
                  borderRadius: wp('3%'),
                }
              ]}
              onPress={() => console.log('Action pressed')}
            >
              <Text style={[styles.actionButtonText, { fontSize: hp('2%') }]}>
                Continue
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.3%') },
    shadowOpacity: 0.25,
    shadowRadius: wp('1%'),
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    padding: wp('1%'),
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    height: hp('0.1%'),
    width: wp('70%'),
    backgroundColor: '#EEE',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    width: wp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default CustomModal;