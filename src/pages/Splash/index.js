import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
} from 'react-native';
import { MyButton } from '../../components';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { getData } from '../../utils/localStorage';

export default function Splash({ navigation }) {
  const top = new Animated.Value(0.3);

  const animasi = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(top, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(top, {
          toValue: 0.3,
          duration: 1000,
        }),
      ]),
      {
        iterations: 1,
      },
    ).start();
  };



  useEffect(() => {
    setTimeout(() => {
      getData('user').then(res => {
        if (!res) {
          navigation.navigate('Login')
        } else {
          navigation.navigate('Home')
        }
      })
    }, 1500)
  }, []);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Image
          source={require('../../assets/logo.png')}
          style={
            {
              width: windowWidth - 100,
              height: 300,
              resizeMode: 'contain'
            }
          }
        />
        <Text style={{
          fontSize: windowWidth / 9,
          color: colors.primary,
          fontFamily: fonts.secondary[800]
        }}>INFO WKS</Text>


      </View>

      <ActivityIndicator size="large" color={colors.primary} />

      <View style={{
        padding: 10,
      }}>
        <Text style={{
          fontSize: windowWidth / 20,
          color: colors.primary,
          textAlign: 'center',
          fontFamily: fonts.secondary[600]
        }}>PT Wali Karunia Sejahtera</Text>
        <Text style={{
          fontSize: windowWidth / 35,
          color: colors.primary,
          textAlign: 'center',
          fontFamily: fonts.secondary[400]
        }}>Lembah Cinere Indah Jln Kelapa Sawit Blok E No 130 Cinere, Depok Indonesia 16514</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
