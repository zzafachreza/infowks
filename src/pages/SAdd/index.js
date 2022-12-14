import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'

export default function SAdd({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        fid_acara: route.params.fid_acara,
        pin: '',
    });




    const sendServer = () => {
        console.log(kirim);
        setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + '1add.php', kirim).then(res => {
                console.log(res.data);
                if (res.data == 404) {
                    Alert.alert('Al Ihsan Kerinci', 'Anggota Sudah Hadir !')
                    setLoading(false);
                } else {
                    setLoading(false);
                    Alert.alert('Al Ihsan Kerinci', 'Data berhasil disimpan !')
                    console.log(kirim);
                    navigation.goBack();
                }
            })
        }, 1200)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <MyInput iconname="card" keyboardType="number-pad" label="NO ANGGOTA / PIN" onChangeText={x => {
                setKirim({
                    ...kirim,
                    pin: x
                })
            }} placeholder="masukan no anggota  / pin" />

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})