import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
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
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
export default function SCek({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [anggota, setAnggota] = useState([]);
    const ref = useRef();
    const [open, setOpen] = useState(false);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getDataAnggota();
        }

    }, [isFocused]);



    const getDataAnggota = () => {
        axios.post(apiURL + '1data_hadir.php', {
            fid_acara: route.params.id_acara
        }).then(res => {
            setOpen(true);
            console.log('daftar anggota', res.data);
            setAnggota(res.data);
        })
    }



    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <View style={{
                padding: 10,
                backgroundColor: colors.primary,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.white,
                    textAlign: 'center'
                }}>{item.acara}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 35,
                    color: colors.white,
                    textAlign: 'center'
                }}>{item.tanggal}</Text>

                <MyInput placeholder="cari nama anggota" onChangeText={x => {
                    console.log(x);
                    const filtered = anggota.filter(i => i.nama.toLowerCase().indexOf(x.toLowerCase()) > -1);
                    console.log('filtered', filtered.length);
                    setAnggota(filtered);
                    if (x.length == 0) {
                        getDataAnggota()
                    } else {
                        setAnggota(filtered);
                    }
                }} />
            </View>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open && <ScrollView style={{
                flex: 1,
            }}>
                {anggota.map(i => {
                    return (
                        <View style={{
                            margin: 5,
                            borderBottomWidth: 1,
                            borderBottomColor: colors.zavalabs,
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                flex: 0.5,
                                fontFamily: fonts.secondary[400],
                                fontSize: windowWidth / 30,
                                color: colors.primary,
                            }}>{i.pin} </Text>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{

                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 28,
                                    color: colors.black,
                                }}>{i.nama} </Text>
                                <Text style={{

                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 28,
                                    color: colors.black,
                                }}>{i.telepon} </Text>
                            </View>
                            {i.status == 'Hadir' && <View>
                                <Text style={{
                                    flex: 0.3,
                                    textAlign: 'center',
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 30,
                                    color: colors.black,
                                    paddingHorizontal: 10,


                                    backgroundColor: colors.success
                                }}>{i.status} </Text>
                            </View>}
                            {i.status != 'Hadir' && <Text style={{
                                flex: 0.3,
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: windowWidth / 30,

                                backgroundColor: colors.white
                            }}></Text>}

                        </View>
                    )
                })}
            </ScrollView>}


            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderTopWidth: 2,
                borderTopColor: colors.primary,
                paddingVertical: 20,
            }}>

                <TouchableOpacity onPress={() => navigation.navigate('SAdd', {
                    fid_acara: route.params.id_acara
                })} style={{
                    padding: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    borderRadius: 20,
                    backgroundColor: colors.primary,
                }}>
                    <Icon type='ionicon' name='create-outline' color={colors.white} size={windowWidth / 8} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                        textAlign: 'center'
                    }}>INPUT HADIR</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => {


                    ZavalabsScanner.showBarcodeReader(result => {

                        if (result == null) {

                        } else {
                            console.log('barcode : ', result);
                            // setLoading(true);
                            setTimeout(() => {
                                axios.post(apiURL + '1add.php', {
                                    fid_acara: route.params.id_acara,
                                    pin: result,
                                }).then(res => {

                                    if (res.data == 404) {
                                        Alert.alert('Al Ihsan Kerinci', 'Anggota Sudah Hadir !')

                                    } else {
                                        showMessage({
                                            type: 'success',
                                            message: res.data + ' Berhasil hadir'
                                        })
                                        getDataAnggota();
                                    }

                                })
                            }, 1200)
                        }


                    });

                }} style={{
                    padding: 10,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    borderRadius: 20,
                    backgroundColor: colors.primary,
                }}>
                    <Icon type='ionicon' name='qr-code-outline' color={colors.white} size={windowWidth / 8} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.white,
                        textAlign: 'center'
                    }}>SCAN HADIR</Text>
                </TouchableOpacity>


            </View>









        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})