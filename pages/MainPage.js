import React, { useContext, useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native'
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
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function Main({navigation}) {

  const state1 = useContext(AuthContext)

  const headerHeight = getStatusBarHeight()

  const [showAddTicket, setShowAddTicket] = useState(false)

  const showAddTicketModal = () =>{
    setShowAddTicket(true)
    console.log(1)
  }

  const hideAddTicketModal = () => {
      setShowAddTicket(false)
  }

  const routeRegisterTicketPage = () =>{
    navigation.navigate('RegisterTicketPage')
  }

  const useEffect = (()=> {
    navigation.addListener('focus', 
          render()

    )
  },[])

        return (
            <View style={styles.container}>


              <Modal 
                visible={showAddTicket}  
                transparent
                onRequestClose = {()=>
                  setShowAddTicket(false)
                }
                hardwareAccelerated
                animationType='none'
              >
                <TouchableOpacity style={styles.modalOne} onPress = {hideAddTicketModal}>
                    <View style={styles.modalInner}>
                      <Text style={{fontSize: 18, marginTop: 15}}>
                        Поздравляем,
                      </Text>
                      <Text style={{fontSize: 18}}>
                        Вы зарегистрировались!
                      </Text>

                      <Text style={{fontSize: 20, color: 'black', fontWeight:'bold', marginTop: 30, marginBottom: 10}}>
                        Вам нужна наша помощь?
                      </Text>

                      <TouchableOpacity onPress={routeRegisterTicketPage} style={{width:'80%',alignItems:'center', justifyContent: 'center', height: 100,backgroundColor: '#31383e', borderRadius: 10, borderWidth: 1}}>
                        <Text style={{fontSize: 23, color: 'white', fontWeight:'500'}}>
                          Попросить 
                        </Text>

                        <Text style={{fontSize: 25, color: 'white', fontWeight:'bold'}}>
                          B U I L D E R
                        </Text>

                        <Text style={{fontSize: 23, color: 'white', fontWeight:'500'}}>
                          о помощи
                        </Text>
                      </TouchableOpacity>
                      
                    </View>

                </TouchableOpacity>
            </Modal> 



              <SafeAreaView style={{flex: 1, marginTop: 115+headerHeight, marginBottom: 90,paddingVertical: 5, justifyContent: 'space-between' }}>
                <View >
                  <BodyTickets navigation = {navigation}/>
                  <Bodydown navigation = {navigation}/>
                </View>
              </SafeAreaView>

              <View style={{top: headerHeight, position: 'absolute'}}>
                <TicketHat />
                <TicketSearch />
              </View>
              <View style={{bottom: 0, position: 'absolute'}}>
                {state1.state.user !== null ? <ProfileBar navigation = {navigation}/> : <NoAuthProfileBar navigation = {navigation}/>}
              </View>


            </View>
          );
}

const styles = StyleSheet.create({
   container: {
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

