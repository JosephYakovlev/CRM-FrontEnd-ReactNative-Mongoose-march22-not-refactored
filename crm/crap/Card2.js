import axios from 'axios';
import React, {useState,useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export const Card2 = () => {

    const navigation = useNavigation();
  
    const routeProjectPage = () =>{
        navigation.navigate('ProjectPage',workflow);
    }

   
    return ( 
        <View style={styles.ticketContainer}>
            <TouchableOpacity onPress={routeProjectPage} style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <View style={{flexDirection: 'column', width: '20%', alignItems: 'center'}}>
                    <View style={{width: 5, backgroundColor: 'green',minHeight: 110, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{borderRadius: 11, minWidth: 22, minHeight: 22,backgroundColor: 'green' }}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white'}}>
                                1
                            </Text>

                        </View>

                    </View>
                </View>

                <View style={{flexDirection: 'column', width: '80%', padding: 5}}>
                    <View style={{width: '100%', minHeight: 90, borderColor: 'grey',borderWidth: 1, borderRadius: 5}}>
                        <Text style={{alignSelf: 'center',fontSize: 18}}>
                            Отлив монолита
                        </Text>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Статус:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green'}}>
                                Выполнено
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Старт:
                            </Text>

                            <Text style={{fontSize: 16, color: 'orange'}}>
                                24.05.2022
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Конец:
                            </Text>

                            <Text style={{fontSize: 16, color: 'red'}}>
                                31.05.2022
                            </Text>

                        </View>

                    </View>
                </View>
            </TouchableOpacity>
      </View>
      
    )
}
      

     


const styles = StyleSheet.create({
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
 
})







































