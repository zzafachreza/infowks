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
import ZavalabsScanner from 'react-native-zavalabs-scanner'
export default function Register({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        fid_acara: route.params.fid_acara,
        pin: '',
    });


    useEffect(() => {
        openScanner();
    }, [])

    const openScanner = () => {
        ZavalabsScanner.showBarcodeReader(result => {

            if (result == null) {

            } else {
                console.log('barcode : ', result);
                // setLoading(true);
                setTimeout(() => {
                    axios.post(apiURL + '1add.php', {
                        fid_acara: route.params.fid_acara,
                        pin: result,
                    }).then(res => {
                        console.log(res.data);
                        setLoading(false);
                        Alert.alert('Al Ihsan Kerinci', 'Data berhasil disimpan !')
                        console.log(kirim);
                        navigation.goBack();
                    })
                }, 1200)
            }


        });
    };




    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);
        setTimeout(() => {
            axios.post(apiURL + '1add.php', {
                fid_acara: route.params.fid_acara,
                pin: result,
            }).then(res => {
                console.log(res.data);
                setLoading(false);
                Alert.alert('Al Ihsan Kerinci', 'Data berhasil disimpan !')
                console.log(kirim);
                navigation.goBack();
            })
        }, 1200)
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})