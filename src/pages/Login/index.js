import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { fonts, windowWidth, colors } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, storeData } from '../../utils/localStorage';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      alert('email dan Passwoord tidak boleh kosong !');
    } else if (kirim.email == null) {
      alert('email tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {


      setLoading(true);
      console.log(kirim);
      setTimeout(() => {
        axios
          .post(apiURL + 'login.php', kirim)
          .then(res => {
            console.log(res.data);
            setLoading(false);
            if (res.data.kode == 50) {

              alert(res.data.msg);

            } else {
              storeData('user', res.data);
              navigation.replace('Home');
            }
          });
      }, 1200);


    }




  }

  useEffect(() => {

    const backAction = () => {
      Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>


          <Image
            source={require('../../assets/logo.png')}
            style={
              {
                width: 200,
                height: 200
              }
            }
          />



        </View>


      </View>
      <MyGap jarak={10} />
      <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
        <MyInput label="Email" onChangeText={val => setKirim({
          ...kirim,
          email: val
        })}


          iconname="mail" placeholder="Masukan email Anda" />
        <MyGap jarak={20} />
        <MyInput
          onChangeText={val => setKirim({
            ...kirim,
            password: val
          })}
          secureTextEntry={true}
          label="Password"
          iconname="key"
          placeholder="Masukan password Anda"
        />
        <MyGap jarak={40} />
        {!loading &&

          <>
            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.primary}
              Icons="log-in-outline"
            />
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text style={{
              fontSize: windowWidth / 28,
              marginTop: 10,
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              color: colors.primary
            }}>Daftar Sekarang</Text></TouchableOpacity>
          </>
        }

      </View>
      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
