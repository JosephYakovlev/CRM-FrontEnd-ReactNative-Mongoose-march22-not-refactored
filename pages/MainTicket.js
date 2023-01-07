import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { TicketArea } from '../components/TicketArea';
import { TicketFooter } from '../components/tickets/TicketFooter';
import { TicketHat } from '../components/tickets/TicketHat';
import ProfileBar from '../components/profilebar/ProfileBar';
import { TicketSearch } from '../components/tickets/TicketSearch';
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function MainTicket({navigation}) {

  
  const headerHeight = getStatusBarHeight()


        return (
            <View style={styles.container}>
              
              <View style={{marginTop: 115+headerHeight, marginBottom: 90}}>
                  <TicketArea navigation = {navigation}/>
              </View>

              <View style={{top: headerHeight, position: 'absolute'}}>
              <TicketHat />
              <TicketSearch />
              </View>
              <View style={{bottom: 0, position: 'absolute'}}>
                <ProfileBar navigation = {navigation}/> 
              </View>
            </View>
          )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  }
  });

