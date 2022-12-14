import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Home({ navigation }) {

  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      __getTransaction();
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
      axios.post(apiURL + '1data_acara.php').then(x => {
        console.log(x.data);
        setData(x.data);
      })
    })
  }

  const __renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('SCek', item)} style={{
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.zavalabs
      }}>

        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: windowWidth / 30,
            color: colors.primary,
          }}>{item.acara}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 28,
            color: colors.black,
          }}>{item.tanggal}</Text>
        </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Icon type='ionicon' name='search' size={windowWidth / 25} color={colors.primary} />
        </View>
      </TouchableOpacity>
    )
  }


  const filterItems = (key, data) => {
    var query = key.toLowerCase();
    return data.filter(function (item) {
      return item.toLowerCase().indexOf(query) >= 0;
    })
  }



  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang,</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Al Ihsan Kerinci</Text>
          </View>

          <View>
            <Image source={require('../../assets/logo.png')} style={{
              width: 60,
              height: 60
            }} />
          </View>
        </View>


      </View>

      <Image source={require('../../assets/slide.png')} style={{
        width: windowWidth,
        height: 250,
      }} />
      <Text style={{
        fontFamily: fonts.secondary[600],
        textAlign: 'center',
        fontSize: windowWidth / 25,
        color: colors.black,
        marginVertical: 10,
        marginHorizontal: 10,
      }}>DAFTAR ACARA</Text>
      <FlatList data={data} renderItem={__renderItem} />









    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[600],
    fontSize: windowWidth / 35
  },
  item: {
    fontFamily: fonts.secondary[400],
    fontSize: windowWidth / 35
  }
})