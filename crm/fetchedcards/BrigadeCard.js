import axios from 'axios';
import React, {useState,useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export const BrigadeCard = ({brigade}) => {

    const navigation = useNavigation();

    console.log(brigade)
    
    const routeWorkersSchedule = () =>{
        navigation.navigate('WorkersSchedule')
    }
   
    return ( 
        <View style={styles.ticketContainer}>
            <View style={{flexDirection: 'column', width: '70%'}}>

                <View style={{flexDirection: 'row'}}>
                     <Text style={{ fontSize: 16,left: 5 }}>
                        Фирма:
                    </Text>

                    <Text style={{color: 'blue', fontSize: 16, left: 10}}>
                        Калиниченко А.М.
                    </Text> 
                </View>


                <View style={{flexDirection: 'row'}}>
                     <Text style={{ fontSize: 16,left: 5 }}>
                        Бригадир:
                    </Text>

                    <Text style={{color: 'blue', fontSize: 16, left: 10}}>
                        Романенко С.М.
                    </Text> 
                </View>

                 <View style={{flexDirection: 'row'}}>
                     <Text style={{ fontSize: 16,left: 5 }}>
                        Мастера:
                    </Text>

                    <Text style={{color: 'green', fontSize: 16, left: 10}}>
                        (10/10)
                    </Text> 
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={{ fontSize: 16,left: 5 }}>
                        Подсобные рабочие:
                    </Text>

                    <Text style={{color: 'red', fontSize: 16, left: 10}}>
                        (6/10)
                    </Text> 
                </View>

                <TouchableOpacity onPress={routeWorkersSchedule}>   
                    <Text style={{color: 'blue', left: 5}}>
                        Журнал посещений
                    </Text>
                </TouchableOpacity>
            </View>
      </View>
      
    )
}
      

     


const styles = StyleSheet.create({
    ticketContainer: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        margin: 10,
        padding: 10
    },
    
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
 
})
