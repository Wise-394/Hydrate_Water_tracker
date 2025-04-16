import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { checkKey, getDailyCupIntake, setDailyCupIntake } from '@/utils/keyValue';

// Constants
const MIN_INTAKE = 1;
const DEFAULT_INTAKE = 8;
const ANIMATION_DURATION = 300;

interface Props {
  modalVisible: boolean;
  onClose?: () => void;
}

const CustomModal: React.FC<Props> = ({ modalVisible, onClose }) => {
  // Refs and State
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [dailyIntake, setDailyIntake] = useState(DEFAULT_INTAKE);

  // Handlers
  const handleDecrease = useCallback(() => {
    setDailyIntake(prev => Math.max(MIN_INTAKE, prev - 1));
  }, []);

  const handleIncrease = useCallback(() => {
    setDailyIntake(prev => prev + 1);
  }, []);

  const handleSave = useCallback(() => {
    setDailyCupIntake(dailyIntake);
    onClose?.();
  }, [dailyIntake, onClose]);

  // Effects
  useFocusEffect(
    useCallback(() => {
      if (modalVisible) {
        // Animation when modal opens
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }).start();
        
        // Load saved intake
        if (checkKey()) {
          const savedIntake = getDailyCupIntake();
          setDailyIntake(savedIntake ?? DEFAULT_INTAKE);
        }
      } else {
        // Reset animation when modal closes
        scaleValue.setValue(0);
      }
    }, [modalVisible, scaleValue])
  );

  // Render Components
  const renderHeader = () => (
    <>
      <Text style={styles.title}>Daily Cup Intake</Text>
      <Text style={styles.subtitle}>
        Enter your desired daily cup intake
      </Text>
    </>
  );

  const renderCounter = () => (
    <View style={styles.counterContainer}>
      <TouchableOpacity
        onPress={handleDecrease}
        disabled={dailyIntake <= MIN_INTAKE}
        style={[
          styles.counterButton,
          dailyIntake <= MIN_INTAKE && styles.disabledButton
        ]}
      >
        <Text style={styles.counterText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.counterValue}>
        {dailyIntake}
      </Text>

      <TouchableOpacity
        onPress={handleIncrease}
        style={styles.counterButton}
      >
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSaveButton = () => (
    <Pressable
      style={styles.actionButton}
      onPress={handleSave}
    >
      <Text style={styles.actionButtonText}>Save</Text>
    </Pressable>
  );

  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleValue }] }]}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <MaterialIcons name="close" size={wp('6%')} color="#666" />
          </Pressable>

          <View style={styles.content}>
            {renderHeader()}
            <View style={styles.divider} />
            {renderCounter()}
            {renderSaveButton()}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: wp('85%'),
    borderRadius: wp('5%'),
    padding: wp('6%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.3%') },
    shadowOpacity: 0.25,
    shadowRadius: wp('1%'),
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: hp('1.5%'),
    right: wp('4%'),
    padding: wp('1%'),
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color: '#666',
    textAlign: 'center',
  },
  divider: {
    height: hp('0.1%'),
    width: wp('70%'),
    marginVertical: hp('2%'),
    backgroundColor: '#EEE',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  counterButton: {
    padding: wp('2%'),
    backgroundColor: '#eee',
    borderRadius: wp('2%'),
    minWidth: wp('10%'),
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  counterText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    minWidth: wp('10%'),
    marginHorizontal: wp('5%'),
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#4A90E2',
    width: wp('70%'),
    marginTop: hp('3%'),
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: '600',
  },
});

export default CustomModal;