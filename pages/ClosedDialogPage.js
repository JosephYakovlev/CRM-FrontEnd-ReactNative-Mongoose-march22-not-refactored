import axios from 'axios'
import React, { useContext, useState, useEffect} from 'react'
import { Text, View, StyleSheet,  ScrollView, TouchableOpacity, Modal, Image, SafeAreaView, StatusBar, Dimensions, TextInput, Alert } from 'react-native'
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import {Context as AuthContext} from '../../context/AuthContext';
import { useNavigation} from '@react-navigation/native';
import { TicketSearchDialogs } from '../components/tickets/TicketSearchDialogs';
import ReversedFlatList from 'react-native-reversed-flat-list';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const windowWidth = Dimensions.get('window').width
const imageWidth = windowWidth/100*10




export default function ClosedDialogPage(dialogdata) {

    const headerHeight = getStatusBarHeight()

    const {state} = useContext(AuthContext)

    const currentUser = state.user.user.userDump
    const thisDialog = dialogdata.route.params

    

    const currCC = currentUser.concludingContracts.find(i => {
        return i?.caseOwner == thisDialog.owner,
        i?.caseContractor == thisDialog.contractor
      })

    console.log("CURRENTDIALOGPAGE")

    const thisDialogFromState = state.user.user.userDump.dialogs.filter(i => {
            return i._id == thisDialog._id 
        })
    
    const thisDialogMessages = thisDialogFromState[0].messages

    const companion   =   thisDialogFromState[0].type === "PERSONAL MESSAGE" && thisDialogFromState[0].companion || 
                          thisDialogFromState[0].type !== "PERSONAL MESSAGE" && thisDialogFromState[0].owner == currentUser._id && thisDialogFromState[0].contractor || 
                          thisDialogFromState[0].type !== "PERSONAL MESSAGE" && thisDialogFromState[0].owner != currentUser._id && thisDialogFromState[0].owner
      
    const navigation = useNavigation();

    const routeMainMarketPlacePage = () =>{
        navigation.navigate('MainMarketPlacePage')
    }

    const alertclosedcase = () => {
        Alert.alert(
            "Этот контракт закрыт.",
            "Данная функция недоступна.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
    }

    useEffect(()=> {
        setShowMessages(false)
        setMessages(thisDialogFromState[0].messages)
    },[thisDialogMessages])


    

    let today = String(new Date()).substring(16,21)
    let currdatec = currentUser.datec.substring(0,11)
    
    let todayfull = currdatec.concat(today)

    const [newMessage, setNewMessage] = useState({
        messageSender: currentUser._id,
        messageSenderAvatar: currentUser.avatar,
        messageSenderUsername: currentUser.username,
        messageReciever: thisDialog.owner ? (currentUser._id == thisDialog.owner ? thisDialog.contractor : thisDialog.owner) : thisDialog.companion ,
        title: '',
        theme: "PERSONAL MESSAGE",
        belongs: thisDialog.companion,
        seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487284/check2_n6aw8c.png',
        
    })

    const routeToUserHandler = async (id) => {

        const user = await  axios.get(`http://62.113.97.220:8800/api/users/${id}`).then((user)=>{
            
            navigation.navigate('UserPage', user.data)

            // navigation.navigate('UserPage', user.data)
        })

    }

    const routeToRunningContractHandler = async () => {

        const casedata = await  axios.get(`http://62.113.97.220:8800/api/openedCases/${thisDialog.companion}`).then((casedata)=>{
            
            console.log("REQUEST CASE DATA")
            console.log(casedata.data)
            navigation.navigate('ClosedCasePage', casedata.data)

            // navigation.navigate('UserPage', user.data)
        })

    }

    

    const [messages, setMessages] = useState(thisDialogFromState[0].messages)

    const [showMessages, setShowMessages] = useState(false)

    const [value1, setValue1] = useState()
  

    console.log(todayfull)

    const sendNewMessageHandler = async () => {

        setValue1({value: ''})

        try {
            
            setMessages([...messages, {...newMessage, datec: todayfull, seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487287/check1_brohks.png', title: value1}])
            setShowMessages(true)    
            
            const res = await axios.post(`http://62.113.97.220:8800/api/users/newmessage`, {...newMessage, title: value1})
                .then((res)=>{
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)
                
            })
            
          } catch (error) {
            console.log(error)
          }
    }

    const sendNewConclCMessageHandler = async () => {

        setValue1({value: ''})

        try {

            setMessages([...messages, {...newMessage, datec: todayfull, seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487287/check1_brohks.png', title: value1}])
            setShowMessages(true)

            const res = await axios.post(`http://62.113.97.220:8800/api/users/newconcludingmessage`, {...newMessage, title: value1}).then((res)=>{
              
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)
                
                
            })
            
          } catch (error) {
            console.log(error)
          }
    }

    const sendNewRunningMessageHandler = async () => {

        setValue1({value: ''})
        
        try {

            setMessages([...messages, {...newMessage, datec: todayfull, seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487287/check1_brohks.png', title: value1}])
            setShowMessages(true)

            const res = await axios.post(`http://62.113.97.220:8800/api/users/newrunningconmessage`, {...newMessage, title: value1}).then((res)=>{
              
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)
                
                
            })
            
          } catch (error) {
            console.log(error)
          }
    }

    const renderMessage = (item,index) => {


        if(item.messageSender == currentUser._id) {
            return (
                <View style={{ 
                        width:'90%', 
                        minHeight: 80, 
                        backgroundColor: 'white', 
                        marginTop: 15,
                        marginBottom: index == 0 ? 50 : 0, 
                        alignSelf: 'flex-end',
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1  ,
                        borderTopLeftRadius: 9,
                        borderBottomLeftRadius: 9,
                        flexDirection: 'row'
                    }}>

                    <View style = {{ width: '80%'}}>
                        
                        <Text style={{marginLeft: 10, fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
                            Вы:
                        </Text>

                            
                       

                        <View style={{width: '85%', alignSelf:'center', minHeight: 35}}>
                            <Text>
                               {item.title}
                            </Text>
                        </View>

                        <View style={{position: 'absolute', bottom: 3, right: item.messageSender === currentUser._id ? 5 : null, bottom: 3 , left: item.messageSender === currentUser._id ? null : 67,flexDirection: 'row' }}>

                            <Image source ={{uri: item.seen}} style={{
                                width: 16,
                                height: 13,        
                            }}/>

                            <Text style={{ fontSize: 12, marginLeft: 5}}>
                                {item.datec.substring(11,16)}
                            </Text>

                        </View>
                        

                    </View>
                    <View style = {{ width: '20%', alignItems: 'center', justifyContent: 'flex-start'}}>
                        <Image source ={{uri: item.messageSenderAvatar}} style={{    
                            width: imageWidth*1.7,
                            height: imageWidth*1.7,
                            borderRadius: imageWidth,
                            borderWidth: 1 ,
                            borderColor: 'black',
                            marginTop: 4,
                            marginRight: 2
                        }}/>
                    </View>
                </View>
            )
        } else {

            return(
                <View style={{
                        width:'90%', 
                        minHeight: 80, 
                        backgroundColor: 'white', 
                        marginTop: 15, 
                        marginBottom: index == 0 ? 50 : 0,
                        alignSelf: 'flex-start',
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1 ,
                        borderBottomRightRadius: 9,
                        borderTopRightRadius: 9,
                        flexDirection: 'row'
                    }}>

                        <View style = {{ width: '20%', alignItems: 'center', justifyContent: 'flex-start'}}>
                            <Image source ={{uri: item.messageSenderAvatar}} style={{    
                                width: imageWidth*1.7,
                                height: imageWidth*1.7,
                                borderRadius: imageWidth,
                                borderWidth: 1 ,
                                borderColor: 'black',
                                marginTop: 4,
                                marginRight: 2
                            }}/>
                        </View>

                        <View style = {{ width: '80%'}}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue'}}>
                                    {item.messageSenderUsername}:

                                </Text>

                                

                            <View style={{width: '90%', alignSelf:'center', minHeight: 35}}>
                                <Text>
                                {item.title}
                                </Text>
                            </View>

                            <View style={{position: 'absolute', bottom: 3, right: 5,flexDirection: 'row' }}>

                                

                                <Text style={{ fontSize: 12, marginLeft: 5}}>
                                    {item.datec.substring(11,16)} 
                                </Text>

                            </View>
                            

                        </View>
                    
    
                </View>
            )

        }

    }







        return (
            <SafeAreaView style={styles.container}>


                <View style={{flex: 1, marginTop: 102+headerHeight, marginBottom: imageWidth+8, 
                    backgroundColor: '#05C6AB',
                    
                    
                }}>
                    
                        <ReversedFlatList
                            
                            data={showMessages == false ? thisDialogMessages : messages}
                            keyExtractor={(item) => item._id}
                            renderItem={ ({ item, index }) => (
                                renderMessage(item, index) 
                            )}
                        />

                </View>

                <View style={{top: 0, position: 'absolute'}}>    
                    {thisDialog.type === "PERSONAL MESSAGE" && 
                        <TouchableOpacity onPress={()=> thisDialog.companion != "BUILDER" && routeToUserHandler(thisDialog.companion)} style={{width:'100%', height: 75, flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1}}>
                            <View style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}> 
                                <Image source ={{uri: thisDialog.avaimage}} style={{
                                        width: 65,
                                        height: 65,
                                }}/>
                            </View>

                            <View style={{width: '75%'}}> 
                                <Text style={{alignSelf: 'center', fontSize: 13, alignSelf: 'flex-end', marginRight: 5}}>
                                    {thisDialog.type === "PERSONAL MESSAGE" && 'Личная переписка'}
                                    {thisDialog.type === "RUNNING CONTRACT" && 'Активный контракт'}
                                    {thisDialog.type === "CONCLUDING CONTRACT" && 'Заключение контракта'}
                                </Text>

                                <Text style={{marginLeft: 10, color: 'blue', fontSize: 18}}>
                                    {thisDialog.companionName}

                                </Text>

                                {thisDialog.companion != "BUILDER" && <View style={{ marginLeft: 10, flexDirection: 'row'}}>
                                    <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
                                        Id:
                                    </Text>
                                    <Text style={{marginLeft: 4, color: 'blue', fontSize: 13}}>
                                        {thisDialog.companion}
                                    </Text>

                                </View>}
                            </View>
                        </TouchableOpacity>
                    }

                    {thisDialog.type !== "PERSONAL MESSAGE" && 
                    <View>
                        <TouchableOpacity onPress={()=> thisDialog.type === "CONCLUDING CONTRACT" ? navigation.navigate('OpenedCase', {caseData: currCC}) : routeToRunningContractHandler()} style={{width:'100%', height: 65, flexDirection: 'row', backgroundColor: 'white', borderBottomWidth: 1, marginTop: headerHeight}}>
                            <View style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}> 
                                <Image source ={{uri: thisDialog.avaimage}} style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 7,
                                        borderWidth: 1,
                                        borderColor: 'black'
                                }}/>
                            </View>

                            <View style={{width: '75%'}}>

                                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                    
                                    <Text style={{ color: 'blue', fontSize: 18, top: 5}}>
                                        {thisDialog.companionName.substring(0,9)}..
                                    </Text>
                                    
                                    <Text style={{alignSelf: 'center', fontSize: 15, alignSelf: 'flex-end', marginRight: 5, fontWeight: 'bold'}}>
                                        {thisDialog.type === "RUNNING CONTRACT" && 'Активный контракт'}
                                        {thisDialog.type === "CONCLUDING CONTRACT" && 'Заключение контракта'}
                                    </Text>

                                </View>
                               
                                <View style={{  flexDirection: 'row', top: 5}}>
                                    <Text style={{color: 'black', fontSize: 13, fontWeight: 'bold'}}>
                                        Id:
                                    </Text>
                                    <Text style={{marginLeft: 4, color: 'blue', fontSize: 13}}>
                                        {thisDialog.companion}
                                    </Text>

                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{width: '100%', minHeight: 40, backgroundColor: 'white', borderBottomWidth: 1, flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => routeToUserHandler(thisDialog.owner)} style={{width: '50%', borderRightWidth: 1, flexDirection: 'row'}}>
                                <View style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source ={{uri: thisDialog.ownerAvatar}} style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            borderWidth: 1,
                                            borderColor: 'black'
                                    }}/>
                                </View>

                                <View style={{width: '75%'}}>
                                    <Text style={{alignSelf: 'center', fontSize: 15}}>
                                        Заказчик:
                                    </Text>

                                    <Text style={{ fontSize: 14, fontWeight: '900', color: 'blue'}}>
                                        {thisDialog.ownerUserName}
                                    </Text>

                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => routeToUserHandler(thisDialog.contractor)} style={{width: '50%', flexDirection: 'row'}}>
                                
                                <View style={{width: '75%'}}>
                                    <Text style={{alignSelf: 'center', fontSize: 15}}>
                                        Подрядчик:
                                    </Text>

                                    <Text style={{marginRight: 5, fontSize: 14, fontWeight: '900', color: 'blue', alignSelf: 'flex-end'}}>
                                        {thisDialog.contractorUserName}
                                    </Text>

                                </View>

                                <View style={{width: '25%', alignItems: 'center', justifyContent: 'center'}}>
                                    <Image source ={{uri: thisDialog.contractorAvatar}} style={{
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            borderWidth: 1,
                                            borderColor: 'black'
                                    }}/>
                                </View>

                            </TouchableOpacity>

                        </View>
                    </View>}

                </View>

                <View style={{position:'absolute',bottom: 0, backgroundColor: 'white', width: '100%', paddingBottom: 5, borderTopWidth: 1}}>
                    <View style={{width: '100%', minHeight: imageWidth+8, maxHeight: 100, flexDirection: 'row'}}>
                        <View style={{width: '85%'}}>
                       
                            <ScrollView style={{maxHeight: 90}}>
                                <TextInput
                                    onChangeText={(message) => setValue1(message)}
                                    placeholder="Сообщение"
                                    iconType="user"
                                    autoCapitalize="none"
                                    multiline={true} 
                                    value={value1}
                                    style={styles.input}
                                />
                            </ScrollView>
                        </View>
                        <TouchableOpacity onPress={alertclosedcase} style={{width: '15%', justifyContent: 'flex-end', alignItems: 'center'}}>
                                 <Image source ={require('../../assets/sendmsg.png')} style={{    
                                    width: imageWidth,
                                    height: imageWidth,
                                }}/>
                        </TouchableOpacity>
                    </View>
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
   },
   input: {
     width: '100%',
     marginLeft: '5%',
     padding: 8,
     color: 'black',
     fontSize: 15,
     borderBottomWidth: 1,
     
   }
  });

