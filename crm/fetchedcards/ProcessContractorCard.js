import axios from 'axios';
import React, {useState,useCallback, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import {Context as AuthContext} from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export const ProcessContractorCard = ({contractor}) => {

    const navigation = useNavigation();

    const {state, signin} = useContext(AuthContext)

    const currentUser = state.user.user.userDump 

    const routeTicketPage = () =>{
        navigation.navigate('TicketPage',{ticket, currentUser})
    }

    const routeWorkersSchedule = () =>{
        navigation.navigate('WorkersSchedule')
    }

   
    return ( 
        <View style={styles.ticketContainer}>
            <TouchableOpacity onPress={routeTicketPage} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                <View style={styles.leftTicketCont}> 

                    <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}} >
                            {contractor.username}
                        </Text>

                        <TouchableOpacity onPress={routeWorkersSchedule}>
                            <Text style={{fontSize: 15, fontWeight: '500', color: 'blue', marginLeft: 55}}>
                                журнал посещений
                            </Text>  
                        </TouchableOpacity>
                    </View>
                     

                    <View style={{flexDirection:'row'}}>

                        <Text >
                            Рейтинг:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            3 678
                        </Text>  
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Text>
                            Присоеденился:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            30.06.2022
                        </Text> 
                    </View>

                    <TouchableOpacity style={{backgroundColor: 'red', borderRadius: 5, borderWidth: 1, alignItems: 'center' }}>
                        <Text style={{fontSize: 15,fontWeight: '700', color: 'white'}}>
                            ПОКА НЕ ОДОБРЕН
                        </Text>
                    </TouchableOpacity>

                </View>

                <Image source= {contractor.avatar ? {uri: contractor.avatar } : require('../../../assets/profile.png')} style={{
                    width: 100,
                    height: 100,
                    borderWidth: 1,
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
        
    }
 
})
