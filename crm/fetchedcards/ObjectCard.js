import axios from 'axios';
import React, {useState,useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export const ObjectCard = ({object}) => {

    const navigation = useNavigation();

    console.log(object)
    
    const routeObjectPage = () =>{
        navigation.navigate('ObjectPage',object);
    }

   
    return ( 
        <View style={styles.ticketContainer}>
            <TouchableOpacity onPress={routeObjectPage} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                <View style={styles.leftTicketCont}> 
                
                    <Text style={{fontSize: 17, fontWeight: 'bold', color: 'green'}}>
                    {object.mainTitle}
                    </Text> 

                    <View style={{flexDirection:'row'}}>

                        <Text >
                            Начало работ:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            {object.start}
                        </Text>  
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Text >
                            Финал работ:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            {object.end}
                        </Text>  
                    </View>


                    <View style={{flexDirection:'row'}}>

                        <Text>
                            Адрес:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'black', marginLeft: 5}}>
                            {object.adress}
                        </Text> 
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Text>
                            Статус:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            Поиск исполнителя
                        </Text> 
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Text>
                            Бюджет:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'green', marginLeft: 5}}>
                            {object.budget}
                        </Text> 
                    </View>

                </View>

                  <Image source= {object.mainImage ? {uri: object.mainImage } : require('../../../assets/crm/icons/villa1.jpg')} style={{
                    width: 120,
                    height: 70,
                    borderColor: 'black',
                }}/>

                
            
            
            </TouchableOpacity>
      </View>
      
    )
}
      

     


const styles = StyleSheet.create({
    ticketContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        margin: 10,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
    leftTicketCont:{
        
    },
}) 
        
