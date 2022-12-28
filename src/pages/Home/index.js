import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
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
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";
const ENTRIES1 = ['https://wks.co.id/wp-content/uploads/2020/09/20843.png', 'https://wks.co.id/wp-content/uploads/2021/02/Home-Cover-2-1.jpg', 'https://wks.co.id/wp-content/uploads/2020/09/Roof-Appilcation.jpg'];

export default function Home({ navigation }) {



  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {

    __getTransaction();

  }, []);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    })
  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const MyMenu = ({ img, judul, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} >
        <View style={{
          width: windowWidth / 3.5,
          borderWidth: 0,
          borderColor: colors.primary,
          backgroundColor: colors.primary,
          height: windowHeight / 6,
          justifyContent: 'center',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={img} style={{
            width: windowHeight / 4,
            height: windowHeight / 8,
            resizeMode: 'contain'
          }} />
        </View>
        <Text style={{
          marginTop: 5,
          fontFamily: fonts.secondary[600],
          color: colors.black,
          textAlign: 'center'

        }}>{judul}</Text>
      </TouchableOpacity>
    )
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
        paddingVertical: 10,
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
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>PT Wali Karunia Sejahtera</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='person' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>
      <SliderBox
        images={ENTRIES1}
        sliderBoxHeight={240}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={colors.white}
        inactiveDotColor="#90A4AE"
      />

      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around'
        }}>
          <MyMenu onPress={() => navigation.navigate('SCek')} img={require('../../assets/A1.png')} judul="Cek Harga dan Stock" />
          <MyMenu img={require('../../assets/A2.png')} judul="Report Visit" />
          <MyMenu img={require('../../assets/A3.png')} judul="Report Service" />
        </View>

        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around'
        }}>
          <MyMenu img={require('../../assets/A4.png')} judul="Buat Penawaran" />
          <MyMenu onPress={() => navigation.navigate('TimList')} img={require('../../assets/A5.png')} judul="Brosur Download" />
          <MyMenu onPress={() => navigation.navigate('GetStarted')} img={require('../../assets/A6.png')} judul="Informasi Akun" />
        </View>
      </View>


    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});