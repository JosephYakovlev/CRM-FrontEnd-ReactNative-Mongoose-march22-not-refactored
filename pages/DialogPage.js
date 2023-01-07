import axios from 'axios'
import React, { useContext, useState, useEffect} from 'react'
import { Text, View, StyleSheet,  ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import ProfileBar from '../components/profilebar/ProfileBar';
import {Context as AuthContext} from '../../context/AuthContext';
import { useNavigation} from '@react-navigation/native';
import { TicketSearchDialogs } from '../components/tickets/TicketSearchDialogs';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const windowWidth = Dimensions.get('window').width
const imageWidth = windowWidth/100*20


export default function DialogPage() {

    const {state} = useContext(AuthContext)

    const currentUser = state.user.user.userDump

    const headerHeight = getStatusBarHeight()
    
    console.log("LAST WISH")
    
    const sortedall = currentUser.dialogs.sort(function(a,b) {
        const date1 = new Date(a.messages[a.messages.length-1].datec)
        const date2 = new Date(b.messages[b.messages.length-1].datec)

            return date1 - date2

    })

    const navigation = useNavigation();


    const seenDialogHandler = async (dialog, companion) => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/users/seendialog/${currentUser._id}/${dialog}/${companion}`).then((res)=>{
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)    
                console.log('DONE')
            })
            
          } catch (error) {
            console.log(error)
          }
    }

 

  

        return (
            <SafeAreaView style={styles.container}>


                {currentUser.dialogs.length === 0 ? 
                
                <View style={{flex: 1, marginTop: 40+headerHeight, marginBottom: 90, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

                    <Text style={{fontSize: 18}}>
                        У вас пока нет сообщений
                    </Text>

                    <Image source ={require('../../assets/msg.png')} style={{
                        width: 180,
                        height: 180,      
                    }}/>
                </View>
                
                
                
                :
                
                <View style={{flex: 1, marginTop: 40+headerHeight, marginBottom: 90}}>
                    
                    <ScrollView >
                    
                        <View style={styles.innerFirstUserFormContOne}>
                            
                            
                            {sortedall.map((i,index) => {


                                const unseenmsg = i.messages.filter(mes => {
                                    return  mes?.messageSender != currentUser._id && 
                                            mes?.unseen == "YES"
                                    
                                })

                                return <TouchableOpacity 
                                onPress={()=> { 
                                    navigation.navigate(i.type === "CLOSED CONTRACT" ? 'ClosedDialogPage' :'CurrentDialogPage', i), 
                                    seenDialogHandler(
                                        i._id, 
                                        i.type === "PERSONAL MESSAGE" && i.companion || 
                                        i.type !== "PERSONAL MESSAGE" && i.owner == currentUser._id && i.contractor || 
                                        i.type !== "PERSONAL MESSAGE" && i.owner != currentUser._id && i.owner  
                                    )
                                }} 
                
                                key={i._id} 
                                style={{
                                    ...styles.DialogCont, 
                                    backgroundColor: 
                                        i.type === "PERSONAL MESSAGE" && 'lightblue' ||   
                                        i.type === "RUNNING CONTRACT" && '#9DFFCB' || 
                                        i.type === "CONCLUDING CONTRACT" && '#F0FF9D' ||
                                        i.type === "CLOSED CONTRACT" && '#05C6AB'
                            }}> 

                                <View style={{width: '75%', }}>
                                    <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
                                        {i.type === "PERSONAL MESSAGE" && 'Личное сообщение'}
                                        {i.type === "RUNNING CONTRACT" && 'Активный контракт'}
                                        {i.type === "CONCLUDING CONTRACT" && 'Заключение контракта'}
                                        {i.type === "CLOSED CONTRACT" && 'Закрытый контракт'}
                                    </Text>

                                    <Text style={{marginLeft: 10, fontSize: 15, fontWeight: '600'}}>
                                        Последнее сообщение:
                                    </Text>

                                    <View style={{width: '90%', alignSelf: 'center', minHeight: 50, borderRadius: 5, borderWidth: 1, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{width: '25%', marginVertical: 5, alignItems: 'center'}}>
                                            <Image source ={{uri: i.messages[i.messages.length-1].messageSenderAvatar}} style={{
                                                width: imageWidth/1.8,
                                                height: imageWidth/1.8,
                                                borderRadius: imageWidth,
                                                borderWidth: 1,
                                                borderColor: 'black'
                                                
                                            }}/>
                                        </View>

                                        <View style={{width: '75%'}}>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'blue', marginLeft: 10,}}>
                                                {i.messages[i.messages.length-1].messageSenderUsername}:
                                            </Text>

                                            <View style={{width:'95%', alignSelf: 'center', justifyContent: "space-between", alignItems: 'center', flexDirection: 'row'}}>
                                                <Text>
                                                    {i.messages[i.messages.length-1].title.substring(0,15)}..
                                                </Text>

                                                <Text style={{fontSize: 12}}>
                                                    {i.messages[i.messages.length-1].datec.substring(11,16)}
                                                </Text>
                                            </View>
                                            
                                        </View>


                                        {i.messages[i.messages.length-1].unseen == "YES" &&  i.messages[i.messages.length-1].messageSender != currentUser._id &&
                                            <View style={{position:'absolute',paddingHorizontal: 9, paddingVertical: 1, borderRadius: 5, backgroundColor: 'green', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', top: -12, right: 5}}>
                                                <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                                                 Новое  
                                                </Text>
                                            </View>
                                        }

                                    </View>
                                
                                </View>

                                <View style={{width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source ={{uri: i.avaimage}} style={{
                                        width: imageWidth+7,
                                        height: imageWidth+7,
                                        borderRadius: 5,
                                        borderWidth: 1,
                                        borderColor: 'black'
                                        
                                    }}/>
                                </View>


                                {unseenmsg.length > 0 && 
                                    <View style={{position:'absolute',height: 30, width: 30, borderRadius: 15, backgroundColor: 'red', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', top: -5, right: imageWidth+30}}>
                                        <Text style={{color: 'white', fontSize: 19}}>
                                        {unseenmsg.length}  
                                        </Text>
                                    </View>
                                }

                            
                            </TouchableOpacity>}
                            ).reverse()

                            }


                        </View>

                </ScrollView>
            </View>}

            <View style={{top: headerHeight, position: 'absolute'}}>    
                <TicketSearchDialogs />
            </View>

            <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
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
   },
   texttitle:{
       fontSize: 14,
       color: 'grey',
       fontWeight: 'bold',
       marginLeft: '3%'
   },
   textvalue:{
       fontSize: 14,
       color: '#058E9C',
       marginLeft: '3%',
       fontWeight: 'bold'
   },
   DialogCont:{

       width: '100%',
       flexDirection: 'row',
       padding: 5,
       backgroundColor: 'white',
       marginVertical: 7,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,

       elevation: 5,
   }
  });

