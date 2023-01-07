import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { TicketHat } from '../components/tickets/TicketHat';
import ProfileBar from '../components/profilebar/ProfileBar';
import { TicketSearch } from '../components/tickets/TicketSearch';
import ContractorArea from '../components/contractors/ContractorArea';
import NoAuthProfileBar from '../components/profilebar/NoAuthProfileBar';
import {Context as AuthContext} from '../../context/AuthContext';
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function MainContractor({navigation}) {

  const headerHeight = getStatusBarHeight()
  
  const state1 = useContext(AuthContext)

        return (
            <View style={styles.container}>

              <SafeAreaView style={{flex: 1, marginTop: 70+headerHeight, marginBottom: 90,paddingVertical: 5, justifyContent: 'space-between' }}>
                <ScrollView >
                  <TicketSearch />
                  <ContractorArea navigation = {navigation}/>
                </ScrollView>
              </SafeAreaView>

              <View style={{top: headerHeight, position: 'absolute'}}>
                <TicketHat />
              </View>

              <View style={{bottom: 0, position: 'absolute'}}>
                {state1.state.user !== null ? <ProfileBar navigation = {navigation}/> : <NoAuthProfileBar navigation = {navigation}/>}
              </View>
            </View>
          )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%'
  }
  });

