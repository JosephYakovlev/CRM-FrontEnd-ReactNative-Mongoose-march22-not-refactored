import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet,  ScrollView, TouchableOpacity, Modal, ImageBackground, SafeAreaView, StatusBar } from 'react-native'
import { Bodydown } from '../components/Bodydown';
import BodyTickets from '../components/BodyTickets';
import { TicketHat } from '../components/tickets/TicketHat';
import { TicketSearch } from '../components/tickets/TicketSearch';
import { TicketMiddle } from '../components/tickets/TicketMiddle'
import { MainFooter } from '../components/main/MainFooter';
import ProfileBar from '../components/profilebar/ProfileBar';
import NoAuthProfileBar from '../components/profilebar/NoAuthProfileBar';
import {Context as AuthContext} from '../../context/AuthContext';
import { TicketSearchExtended } from '../components/tickets/TicketSearchExtended';
import { useNavigation} from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function MainMPlaceContr() {

    const state1 = useContext(AuthContext)

    const headerHeight = getStatusBarHeight()

    const navigation = useNavigation();

    const routeMainMarketPlacePage = () =>{
        navigation.navigate('MainMarketPlacePage')
    }

    const useEffect = (()=> {
        navigation.addListener('focus', 
            render()

        )
    },[])

        return (
                <SafeAreaView style={styles.container}>





                <ImageBackground source ={require('../../assets/map11.jpg')} style={{
                    width: '100%',
                    top: 60+headerHeight,
                    bottom: 90,
                    alignItems: 'center',
                    position: 'absolute'
                }} >
                    <View style={{flexDirection: 'row', width: '96%', marginVertical: 10, justifyContent: 'space-around'}}>
                        
                        <TouchableOpacity onPress={routeMainMarketPlacePage} style={{width: '48%', height: 60, backgroundColor:'lightblue', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle:"dashed", borderRadius: 1}}>
                            <Text style={{fontSize: 20, fontWeight: '500'}}>
                                Ваши 
                            </Text>

                            <Text style={{fontSize: 20, fontWeight: '500'}}>
                                склады/объекты
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width: '48%', height: 60, backgroundColor:'lightgreen', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle:"dashed", borderRadius: 1}}>
                            <Text style={{fontSize: 20, fontWeight: '500'}}>
                                Базы
                            </Text>
                            <Text style={{fontSize: 20, fontWeight: '500'}}>
                                контрагентов
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>

              <View style={{top: headerHeight, position: 'absolute'}}>    
                <TicketSearchExtended />
              </View>

              <View style={{bottom: 0, position: 'absolute'}}>
                {state1.state.user !== null ? <ProfileBar navigation = {navigation}/> : <NoAuthProfileBar navigation = {navigation}/>}
              </View>


            </SafeAreaView>
          );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%'
   },
   modalOne:{
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#00000099'
   },
   modalInner:{
    height: '40%',
    backgroundColor: 'white',
    width:'85%',
    borderRadius: 10,
    borderWidth: 1, 
    alignItems:'center', 
   }
  });

