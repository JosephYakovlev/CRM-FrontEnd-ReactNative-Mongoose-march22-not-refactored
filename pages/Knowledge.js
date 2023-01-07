import { TicketHat } from '../components/tickets/TicketHat';
import { TicketSearch } from '../components/tickets/TicketSearch';
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert} from 'react-native'
import React from 'react';

export const Knowledge = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <TicketHat />
        <TicketSearch />
        <View style={styles.titleCont}>
          <View style={{flexDirection: 'row',alignItems:'center'}}>
        <Image source ={require('../../assets/categories/znan1.jpg')} style={{
                                      width: 44,
                                      height: 44,
                                      borderRadius: 5,
                }}/>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>
            База знаний
          </Text>

          
          </View>
        </View>
        <View style={styles.Kone}>
          <View style={styles.KKone}>
            <Image source ={require('../../assets/categories/rating1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Система
            </Text>
            <Text>
              рейтинга
            </Text>
          </View>

          <View style={styles.KKtwo}>
          <Image source ={require('../../assets/categories/koap1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Администр.
            </Text>
            <Text>
              ответств.
            </Text>
          </View>

          <View style={styles.KKeythree}>
          <Image source ={require('../../assets/categories/ukrf1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Уголовная
            </Text>
            <Text>
              ответств.
            </Text>
          </View>

          <View style={styles.KKeyfour}>
          <Image source ={require('../../assets/categories/trudk1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Трудовой
            </Text>
            <Text>
              Кодекс
            </Text>
          </View>
        </View>

        <View style={styles.Kone}>
          <View style={styles.KKone}>
          <Image source ={require('../../assets/categories/snil1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              СНиП
            </Text>
            
          </View>

          <View style={styles.KKtwo}>
          <Image source ={require('../../assets/categories/gost1.png')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              ГОСТ
            </Text>
            
          </View>

          <View style={styles.KKeythree}>
          <Image source ={require('../../assets/categories/pue1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              ПУЭ
            </Text>
            
          </View>

          <View style={styles.KKeyfour}>
          <Image source ={require('../../assets/categories/tehbez1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Техника
            </Text>
            <Text>
              Безопасности
            </Text>
          </View>
        </View>

        <View style={styles.Kone}>
          <View style={styles.KKone}>
          <Image source ={require('../../assets/categories/tehnolog1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Технологии
            </Text>
            
          </View>

          <View style={styles.KKtwo}>
          <Image source ={require('../../assets/categories/oborud1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Оборудование
            </Text>
            
          </View>

          <View style={styles.KKeythree}>
          <Image source ={require('../../assets/categories/instr1.jpg')} style={{
                                      width: 64,
                                      height: 64,
                                      borderRadius: 5,
                                      borderColor: '#006b76'
                }}/>
            <Text>
              Инструмент
            </Text>
            
          </View>

          <View style={styles.KKeyfour}>
         
          </View>
        </View>

        <View style={styles.yourPhoto}>
            <View style={styles.yourPhotoBack}>
                <Image source ={require('../../assets/categories/other.png')} style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 5,
                }}/>
            </View>
            
            <View style={styles.yourPhotoCall}>
                <Image source ={require('../../assets/categories/tele.png')} style={{
                                      width: 50,
                                      height: 50,
                                      borderRadius: 5,
                }}/>
            </View>
            
            <View style={styles.yourPhotoBot}>
                <Image source ={require('../../assets/rab1.jpg')} style={{
                                      width: 116,
                                      height: 116,
                                      borderRadius: 5,
                                      borderWidth: 3,
                                      borderColor: '#006b76'
                }}/>
            </View>

            <Text style={{color:'white', left: '35%',bottom: '70%', position: 'absolute', fontSize: 12, fontWeight: 'bold'}}>
                Вы: Калиниченко А.М.
            </Text>
          
            <Text style={{color:'white', left: '35%',bottom: '50%', position: 'absolute', fontSize: 12, fontWeight: 'bold'}}>
                Ваш рейтинг: 1275
            </Text>

            <View style={{borderWidth: 2, borderColor: 'white',backgroundColor:'#006b76',alignItems: 'center', justifyContent: 'center', left: '35.5%',bottom: '8%', position: 'absolute',width: '32%'}}>
                <Text style={{fontSize: 13, fontWeight: 'bold',paddingVertical:3,color:'white'}}>
                    Ваш профиль
                </Text>
            </View>

            <Text style={{color:'black', left: '1%',top: '-30%', position: 'absolute', fontSize: 13, fontWeight: 'bold'}}>
            </Text>
        </View>  
    </View>
  );
};


const styles = StyleSheet.create({
    titleCont:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      minHeight: 100,
    },
    Kone:{
      flexDirection: 'row',
      minHeight: 100,
    },
    KKone:{
      width: '25%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    KKtwo:{

      width: '25%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    KKeythree:{

      width: '25%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    KKeyfour:{

      width: '25%',
      alignItems: 'center',
      justifyContent: 'center'
    },

    
    yourPhoto:{
        position: 'absolute',
        flex:1,
        backgroundColor: '#765043',
        bottom:0,
        left: 0,
        right: 0,
        height: '11%',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 5,
        borderColor: '#006b76',
        
      },
      yourPhotoBot:{
        position: 'absolute',
        backgroundColor: 'white',
        width: 116,
        height: 116,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        right: 7,
        marginLeft: 7
        
      },
      yourPhotoBack: {
        position: 'absolute',
        backgroundColor: 'white',
        width: 64,
        height: 64,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        left: 3,
      },
      yourPhotoCall:{
        position: 'absolute',
        backgroundColor: 'white',
        width: 64,
        height: 64,
        bottom: "7%",
        borderRadius: 5,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        left: '18%',
      },

});
