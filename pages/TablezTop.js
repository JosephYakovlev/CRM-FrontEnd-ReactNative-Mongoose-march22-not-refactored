import { TicketHat } from '../components/tickets/TicketHat';
import { TicketSearch } from '../components/tickets/TicketSearch';
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert,ImageBackground} from 'react-native'
import React from 'react';

const TablezTop = () => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
        <TicketHat />
        <TicketSearch />
        <View style={styles.titleCont}>
          <Text>
            TОП 100 2021-2022г.
          </Text>
        </View>

        <View style={styles.ZakazPodryad}>
          <View style={styles.ZPone}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Заказчики
            </Text>
          </View>

          <View style={styles.ZPtwo}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Подрядчики
            </Text>
          </View>

        </View>

        <View style={styles.category}>

        <View style={styles.catone}>
        <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }} 
                 resizeMode='cover' 
                 source={require('../../assets/categories/raz1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Рабочие
            </Text>
            </View>
          </View>

          <View style={styles.cattwo}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/m1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>

            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Мастера
            </Text>
            </View>
          </View>

          <View style={{...styles.catthree,borderWidth: 2, borderColor: 'blue'}}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/eng1.jpg')}>
            </ImageBackground>
            <View style={styles.catTitle}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Инженерия
            </Text>
            </View>
          </View>

          <View style={styles.catfour}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/buh1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>


            <Text style={{fontSize: 10, fontWeight: 'bold', color: 'black'}}>
              Проект. и бух. учет
            </Text>
            </View>
          </View>


        </View>

        <View style={styles.category}>
        <View style={styles.catone}>
        <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/ur1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>

            <Text style={{fontSize: 12, fontWeight: 'bold', color: 'black'}}>
              Юриспруденция
            </Text>
            </View>
          </View>
          

          <View style={styles.cattwo}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/it1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>

            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              IT 
            </Text>
            </View>
          </View>

          <View style={styles.catthree}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/teh1.jpg')}>
            
            </ImageBackground>
            <View style={styles.catTitle}>

            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Техника
            </Text>
            
            </View>
          </View>

          <View style={styles.catfour}>
          <ImageBackground style={{...styles.imgBackground, alignItems: 'center', justifyContent: 'center' }}
                 resizeMode='cover' 
                 source={require('../../assets/categories/klu41.jpg')}>
            
            </ImageBackground>
            
            <View style={styles.catTitle}>
            

            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black'}}>
              Под ключ
            </Text>
            </View>
          </View>
        </View>

        <View style={styles.profession}>
        <ImageBackground style={ styles.imgBackground } 
                 resizeMode='cover' 
                 source={require('../../assets/categories/eng1.jpg')}>

          <View style={{flexDirection: 'row',backgroundColor: '#00000045',minHeight: 50}}>
            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Электро-
              </Text>

              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                монтаж
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Слаботочка
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Системы 
              </Text>

              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                авт. полива
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'yellow'}}>
                Видео-
              </Text>

              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'yellow'}}>
                наблюдение
              </Text>
            </View>

          </View>

          <View style={{flexDirection: 'row',backgroundColor: '#00000045',minHeight: 50}}>
            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white',}}>
                Пожарные 
              </Text>

              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white',}}>
                системы
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Сантехника
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Автоматика
              </Text>
            </View>

            <View style={{width: '25%',alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                Ремонт 
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                техники
              </Text>
            </View>
          </View>

        </ImageBackground>

        </View>

        <View style={styles.TopsCont}>
          <View style={styles.casecont}>
                                    <View style={{flexDirection: 'column',width: '5%',flex: 2,alignItems: 'center'}}>
                                        <Text style={styles.textcase}>
                                            №
                                        </Text>
                                        
                                        <Text style={styles.textcase}>
                                            
                                        </Text>

                                        <Text style={styles.textcase}>
                                            1
                                        </Text>

                                        <Text style={styles.textcase}>
                                            2
                                        </Text>

                                        <Text style={styles.textcase}>
                                            3
                                        </Text>
                                        <Text style={styles.textcase}>
                                            4
                                        </Text>

                                        <Text style={styles.textcase}>
                                            5
                                        </Text>

                                        <Text style={styles.textcase}>
                                            6
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7
                                        </Text>
                                        <Text style={styles.textcase}>
                                            8
                                        </Text>

                                        <Text style={styles.textcase}>
                                            9
                                        </Text>

                                        <Text style={styles.textcase}>
                                            10
                                        </Text>

                                        <Text style={styles.textcase}>
                                            11
                                        </Text>
                                        <Text style={styles.textcase}>
                                            12
                                        </Text>
                                        
                    
                                    </View>

                                    <View style={{flexDirection: 'column',width: '40%',flex: 9}}>
                                        <Text style={styles.textcase}>
                                            Имя:
                                        </Text>
                                        
                                        <Text style={styles.textcase}>
                                        </Text>

                                        <Text style={styles.textcase}>
                                            ИП Яковлев И.Н.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Калиниченко А.М.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            OOO "AMTEK"
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Мелетенко А.Н.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            ООО "Долгострой"
                                        </Text>

                                        <Text style={styles.textcase}>
                                            ООО "KayaBud"
                                        </Text>

                                        <Text style={styles.textcase}>
                                            ПАО "Ривьера"
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Жук К.А.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Мулин Р.М.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Калиниченко А.М.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            ИП Ивашко А.В.
                                        </Text>

                                        <Text style={styles.textcase}>
                                            Мелетенко А.Н.
                                        </Text>
                                        
                    
                                    </View>

                                    <View style={{flexDirection: 'column',width: '10%',flex: 3}}>
                                        <Text style={styles.textcase}>
                                            Рейт.:
                                        </Text>
                                        
                                        <Text style={styles.textcase}>
                                            
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8657
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8650
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8320
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8170
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8057
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8045
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7997
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7950
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7932
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7904
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7850
                                        </Text>

                                        <Text style={styles.textcase}>
                                            7840
                                        </Text>
                                        
                    
                                    </View>

                                    <View style={{flexDirection: 'column',width: '55%',flex: 3}}>
                                        <Text style={styles.textcase}>
                                            Закр. сделок:
                                        </Text>
                                        
                                        <Text style={styles.textcase}>
                                          470
                                        </Text>

                                        <Text style={styles.textcase}>
                                          603
                                        </Text>

                                        <Text style={styles.textcase}>
                                            551
                                        </Text>

                                        <Text style={styles.textcase}>
                                            507
                                        </Text>

                                        <Text style={styles.textcase}>
                                          476
                                        </Text>

                                        <Text style={styles.textcase}>
                                          703
                                        </Text>

                                        <Text style={styles.textcase}>
                                            351
                                        </Text>

                                        <Text style={styles.textcase}>
                                            547
                                        </Text>

                                        <Text style={styles.textcase}>
                                          450
                                        </Text>

                                        <Text style={styles.textcase}>
                                          665
                                        </Text>

                                        <Text style={styles.textcase}>
                                            543
                                        </Text>

                                        <Text style={styles.textcase}>
                                            537
                                        </Text>
                                        
                    
                                    </View>

                                    <View style={{flexDirection: 'column',width: '15%',flex: 4}}>
                                        <Text style={styles.textcase}>
                                            Оборот месяц:
                                        </Text>

                                        <Text style={styles.textcase}>
                                            260 013
                                        </Text>

                                        <Text style={styles.textcase}>
                                           230 034
                                        </Text>

                                        <Text style={styles.textcase}>
                                            220 890
                                        </Text>

                                        <Text style={styles.textcase}>
                                            219 083
                                        </Text>

                                        <Text style={styles.textcase}>
                                            160 013
                                        </Text>

                                        <Text style={styles.textcase}>
                                           230 334
                                        </Text>

                                        <Text style={styles.textcase}>
                                            220 890
                                        </Text>

                                        <Text style={styles.textcase}>
                                            119 083
                                        </Text>

                                        <Text style={styles.textcase}>
                                            160 013
                                        </Text>

                                        <Text style={styles.textcase}>
                                           230 034
                                        </Text>

                                        <Text style={styles.textcase}>
                                            220 890
                                        </Text>

                                        <Text style={styles.textcase}>
                                            219 083
                                        </Text>
                                        
                                       
                        
                                    </View>

                                    <View style={{flexDirection: 'column',width: '15%'}}>
                                        <Text style={styles.textcase}>
                                            Оборот год:
                                        </Text>

                                        <Text style={styles.textcase}>
                                            4 670 803
                                        </Text>

                                        <Text style={styles.textcase}>
                                            4 320 344
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8 994 112
                                        </Text>
                                        

                                        <Text style={styles.textcase}>
                                            6 315 039
                                        </Text>

                                        <Text style={styles.textcase}>
                                            5 472 803
                                        </Text>

                                        <Text style={styles.textcase}>
                                            5 723 392
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8 994 112
                                        </Text>
                                        

                                        <Text style={styles.textcase}>
                                            6 315 039
                                        </Text>

                                        <Text style={styles.textcase}>
                                            4 670 803
                                        </Text>

                                        <Text style={styles.textcase}>
                                            4 320 344
                                        </Text>

                                        <Text style={styles.textcase}>
                                            8 994 112
                                        </Text>
                                        

                                        <Text style={styles.textcase}>
                                            6 315 039
                                        </Text>
                                       
                            
                               
            </View>

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

export default TablezTop

const styles = StyleSheet.create({
    titleCont:{
      flexDirection: 'row',
      backgroundColor: '#00000015',
      marginTop: 10,
      marginHorizontal: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'grey',
      minHeight: 50,
      alignItems: 'center',
      justifyContent: 'center'
    },
    ZakazPodryad:{
      flexDirection: 'row',
      backgroundColor: '#00000015',
      marginHorizontal: 10,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'grey',
      minHeight: 50
    },
    ZPone:{
      width: "50%",
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent:'center',
      borderWidth:2 ,
      borderColor: 'blue'
    },
    ZPtwo:{
      width: '50%',
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent:'center',
    },
    category:{
      flexDirection: 'row',
      backgroundColor: '#00000015',
      marginHorizontal: 10,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'grey',
      minHeight: 70
    },
    catTitle:{
      height: 22
    },
    catone:{
      width: "25%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:'center'
    },
    cattwo:{
      width: "25%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:'center'
    },
    catthree:{
      width: "25%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:'center'
    },
    catfour:{
      width: "25%",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent:'center'
    },

    profession:{
      marginHorizontal: 10,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: 'grey',
      minHeight: 100,
    },
    TopsCont:{
      backgroundColor: '#00000015',
      marginHorizontal: 10,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'grey',
      minHeight: 50,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    casecont:{
      flexDirection: 'row',
      backgroundColor: 'white',
      margin: 10,
      borderWidth: 1,
      borderColor: 'black',
      minHeight: 150,
      borderRadius: 10,
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
      imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1 
      },
      textcase:{
        fontSize: 11
      }

});
