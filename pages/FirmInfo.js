import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FirmInfoComp } from '../components/firms/FirmInfoComp';
import { TicketFooter } from '../components/tickets/TicketFooter';
import { TicketHat } from '../components/tickets/TicketHat';
import { TicketMiddle } from '../components/tickets/TicketMiddle';
import { TicketSearch } from '../components/tickets/TicketSearch';

export default function FirmInfo() {
        return (
            <View style={styles.container}>
              <TicketHat />
              <FirmInfoComp />
              <TicketMiddle />
              <TicketFooter />
            </View>
          );
}

const styles = StyleSheet.create({
  container: {
       
  }
  });