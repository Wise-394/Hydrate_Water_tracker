import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const setDailyCupIntake = (num: number) => {
    storage.set('cupIntake', num)
}

export const getDailyCupIntake = () =>{
    return storage.getNumber('cupIntake')
}

export const checkKey = () =>{
    return storage.contains('cupIntake')
}

export const resetKeyValue = () => {
    setDailyCupIntake(8)
}