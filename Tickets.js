import axios from 'axios'

export default axios.create({
    baseURL: 'https://newsapi.org/v2/'
})

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'


export const TicketCard = ({tickets }) => {

    console.log(tickets)
   
    
      
    return (
            <View style={styles.ticketContainer}>
            <TouchableOpacity style={styles.leftTicketCont}>
                <ImageBackground source={tickets.mainimg ? {uri: tickets.mainimg } : null} style={{width: '100%', height: '100%'}}>
                </ImageBackground>   
            
            </TouchableOpacity>
                
               
                <View style={styles.rightTicketCont}>
                    <View style={styles.rightTicketIns}>

                    </View>
                </View>

            </View>
      
          )
        }
      

     


const styles = StyleSheet.create({
    ticketContainer: {
        flexDirection: "row",
        minHeight: "10%",
        padding: 10,
    },
    leftTicketCont:{
        
        backgroundColor: 'green',
        width: "45%",
        justifyContent: 'center',
        alignItems: 'center',

    },
    rightTicketCont:{

        backgroundColor: 'red',
         width: "55%",
         justifyContent: 'center',
      alignItems: 'center',

    },
    leftTicketIns:{

    },
    rightTicketIns:{

    },
    image:{
        resizeMode: 'cover',
        ...StyleSheet.absoluteFillObject,
    }
})
