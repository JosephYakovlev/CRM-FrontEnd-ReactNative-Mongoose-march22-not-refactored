import axios from 'axios';
import React, {useState,useCallback, useEffect, useContext} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import {Context as AuthContext} from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NormalizeNumHook } from '../../hooks/NormalizeNumHook';

export const ActiveContractCard = (caseD) => {

    const ticket = caseD.ticket
    const caseData = caseD.ticket

    const navigation = useNavigation();

    const {state, signin} = useContext(AuthContext)

    const currentUser = state.user.user.userDump 
    const contractor = currentUser
    const user = currentUser


    const routeOpenedCase = () =>{
        navigation.navigate('OpenedCasePage',ticket)

    }

    const currentTicketOffers = currentUser.offers.filter(offer => offer.offerTicketId == ticket._id)
    const uncheckedOffers = currentTicketOffers.filter(offers => offers.checked === false)
 

    

   
    return ( 
        <View style={{...styles.ticketContainer, backgroundColor: ticket.caseOwner === currentUser._id ? 'lightblue' : 'lightgrey'}}>
            <TouchableOpacity onPress={routeOpenedCase} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center', width:'90%'}}>
                
                <View style={styles.leftTicketCont}> 
                    <View style={{width:'100%'}}>

                        <Text style={{fontSize: 14,  color: 'black', }}>
                            #{ticket._id}
                        </Text> 
                    
                        <Text style={{fontSize: 16, fontWeight: '700', color: 'blue'}}>
                            «{ticket.title}»
                        </Text> 

                        <View style={{flexDirection:'row'}}>

                            <Text>
                                Статус:
                            </Text>

                            <Text style={{fontSize: 15, fontWeight: '700', color: 'green', marginLeft: 5}}>
                                Активный контракт
                            </Text> 

                        </View>

                    </View>

                    <View style={{flexDirection:'row', width:'100%'}}>
                        <View style={{flexDirection:'row', width:'50%'}}>
                            <Text >
                                Цена:
                            </Text>

                            <Text style={{fontSize: 15, fontWeight: '700', color: 'green', marginLeft: 5}}>
                                {NormalizeNumHook(ticket.price)}.00 р.
                            </Text> 
                        </View> 

                        <View style={{flexDirection:'row', width:'50%', alignItems: 'center', justifyContent:'center'}}>
                            <Text >
                                День:
                            </Text>

                            <Text style={{fontSize: 15, fontWeight: '700', color: 'green', marginLeft: 5}}>
                                {ticket?.workDays?.length}  || 6
                            </Text> 
                        </View> 

                    </View>


                   
                </View>

                <Image source= {{uri: ticket.openedCaseimg}} style={{
                    width: '25%',
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
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderStyle: 'dashed',
        width: '100%',
        height: 90,
        justifyContent: 'center'
    },
    
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
    leftTicketCont:{
        width: '75%'
    }
 
})
