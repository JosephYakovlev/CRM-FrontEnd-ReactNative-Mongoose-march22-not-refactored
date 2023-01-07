import axios from 'axios';
import React, {useState,useCallback, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import {Context as AuthContext} from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

import { NormalizeNumHook } from '../../hooks/NormalizeNumHook';

export const ConcludingCard = (caseD) => {

    const ticket = caseD.ticket
    const caseData = caseD.ticket

    const navigation = useNavigation();

    const {state, signin} = useContext(AuthContext)

    const currentUser = state.user.user.userDump 
    const contractor = currentUser
    const user = currentUser


    const routeOpenedCase = () =>{
        navigation.navigate('OpenedCase',{caseData,contractor,user})

    }

    const currentTicketOffers = currentUser.offers.filter(offer => offer.offerTicketId == ticket._id)
    const uncheckedOffers = currentTicketOffers.filter(offers => offers.checked === false)
 

    

   
    return ( 
        <View style={{...styles.ticketContainer, backgroundColor: ticket.caseOwner === currentUser._id ? '#F0FF9D' : 'lightgrey'}}>
            <TouchableOpacity onPress={routeOpenedCase} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                <View style={styles.leftTicketCont}> 
                
                    <Text style={{fontSize: 17, fontWeight: 'bold', color: 'green'}}>
                        {ticket.title}
                    </Text> 

                    <View style={{flexDirection:'row'}}>

                        <Text >
                            Бюджет:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            {NormalizeNumHook(ticket.price)}.00 р.
                        </Text>  
                    </View>


                    <View style={{flexDirection:'row'}}>

                        <Text>
                            Статус:
                        </Text>

                        <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                            Заключение сделки
                        </Text> 
                    </View>
                </View>

                <Image source= {{uri: ticket.openedCaseimg}} style={{
                    width: 100,
                    height: 70,
                    borderWidth: 1,
                    borderColor: 'black',
                }}/>

                

                
            
            
            </TouchableOpacity>
                            {uncheckedOffers.length !== 0 && <View style={{position:'absolute',height: 25, width: 25, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'white', justifyContent: 'center', alignItems: 'center', top: -11, right: 5}}>
                                <Text style={{color: 'white', fontSize: 14}}>
                                    {uncheckedOffers.length}
                                </Text>
                            </View>}
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
