import axios from 'axios'
import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, ScrollView, SafeAreaView, TextInput, Dimensions, Alert } from 'react-native'
import { TicketHat } from '../components/tickets/TicketHat'
import { useNavigation } from '@react-navigation/native';
import {Context as AuthContext} from '../../context/AuthContext';
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import ImageView from "react-native-image-viewing";
import ProfileBar from '../components/profilebar/ProfileBar';
import { getStatusBarHeight } from 'react-native-status-bar-height'


const windowWidth = Dimensions.get('window').width
const imageWidth = windowWidth/100*60

const priceHeight = windowWidth/100*2



const UserPage = (user) => {

    const thisUser = user.route.params

    const alertsendedmsg = () => {
        Alert.alert(
            "Поздравляем!",
            "Сообщение успешно отправлено!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          )
      }

    const headerHeight = getStatusBarHeight()

    const navigation = useNavigation();

    const {state} = useContext(AuthContext)

    const currentUser = state.user.user.userDump

    const [imageViewerProps, setImageViewerProps] = useState({
        visible: false,
        index: 0
    })

    const thisUserDialog = currentUser.dialogs.filter( i => 
        i.companion === thisUser._id
    )

    console.log("USERPAGE")
    console.log(thisUserDialog.length)

   


    const routeCreateTicket = () =>{
        navigation.navigate('CreateTicket')
      }

    const [showSendMessage, setShowSendMessage] = useState(false)

    const showSMes = () =>{
        setShowSendMessage(true)
      }
  
    const hideSMes = () => {
        setShowSendMessage(false)
    }

    const [newMessage, setNewMessage] = useState({
        messageSender: currentUser._id,
        messageSenderAvatar: currentUser.avatar,
        messageSenderUsername: currentUser.username,
        messageReciever: thisUser._id,
        title: '',
        theme: "PERSONAL MESSAGE",
        belongs: '',
        seen: "UNSEEN",
        senderImg: currentUser.avatar,
        recieverImg: thisUser.avatar,
        recieverUserName: thisUser.username
    })

    const portFolioImgs = thisUser.portfolioImg.map(i => {
        return { 
           uri: i.imgUri
        }
    })


    const sendNewDialogMsgHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/users/msgwithdialog`, newMessage).then((res)=>{
              
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)
                
                alertsendedmsg()
                hideSMes()
            })
            
          } catch (error) {
            console.log(error)
          }
    }


    const sendNewMessageHandler = async () => {
        try {

            const res = await axios.post(`http://62.113.97.220:8800/api/users/newmessage`, newMessage).then((res)=>{
              
                socket.emit("reload", res.data.sender)
                socket.emit("reload", res.data.reciever)
                
                alertsendedmsg()
                hideSMes()
            })
            
          } catch (error) {
            console.log(error)
          }
    }

    console.log("thisUserDialog")
    console.log(thisUserDialog)

      

    return (
        <View style={{height: '100%'}}>
            



            <ImageView
                images={portFolioImgs}
                imageIndex={imageViewerProps.index}
                visible={imageViewerProps.visible}
                onRequestClose={() => setImageViewerProps({...imageViewerProps, visible: false})}
            />





















            <Modal 
                visible={showSendMessage}  
                transparent
                onRequestClose = {()=>
                setShowSendMessage(false)
                }
                hardwareAccelerated
                animationType='none'
            >
                <View style={styles.achievModal} >
                    <View style={styles.opaMiddleWare}>

                        {thisUserDialog.length > 0 &&  <TouchableOpacity onPress={()=> navigation.navigate('CurrentDialogPage', thisUserDialog[0])} style={{alignSelf: 'flex-end', marginRight: 10}}>

                            <Text style={{fontSize: 14, margin: 5, alignSelf: 'flex-end', color: 'blue'}}>
                                Перейти к диалогу..
                            </Text>

                        </TouchableOpacity>}

                        

                        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 15}}>
                            Новое сообщение:
                        </Text>

                        <ScrollView style={{ height: 200}}>

                        <TextInput
                            onChangeText={(pass) => setNewMessage({...newMessage, title: pass})}
                            placeholder="Ваше сообщение"
                            iconType="user"
                            autoCapitalize="none"
                            multiline={true} 
                            autoCorrect={false} 
                            style={styles.input}
                        />
                        </ScrollView>

                        <View style={{width:'100%', flexDirection: 'row', minHeight: 40, position: 'absolute', bottom: 5}}>
                            <View style={{width: '30%'}}>

                            </View>
                            <View style={{width: '70%',flexDirection: 'row'}}>
                                <TouchableOpacity onPress={thisUserDialog.length > 0 ? sendNewMessageHandler : sendNewDialogMsgHandler } style={{width: '50%',flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                                    <View style={{width:'90%', height: 30, backgroundColor: 'green', alignItems: 'center', justifyContent:'center', borderRadius: 5}}>
                                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                                            Отправить
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress = {hideSMes} style={{width: '50%',flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                                    <View style={{width:'90%', height: 30, backgroundColor: 'red', alignItems: 'center', justifyContent:'center', borderRadius: 5}}>
                                        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
                                            Назад
                                        </Text>
                                    </View>

                                </TouchableOpacity>

                            </View>

                        </View>
                        
                    </View>
                                
                </View>
             </Modal>
            
            
            


























            
            
            <SafeAreaView style={{flex: 1, marginTop: 74+headerHeight, marginBottom: 90}}>
                <ScrollView >
                    <View style={styles.firstUserFormCont}>
                        <View style={styles.innerFirstUserFormContOne}>
                            
                            <Text style={styles.texttitle}>
                                Организационно-правовая форма:
                            </Text>

                            <Text style={styles.textvalue}>
                             Физ. лицо
                            </Text>
                            
                            <Text style={styles.texttitle}>
                                Имя пользователя:
                            </Text>

                            <Text style={styles.textvalue}>
                              {thisUser.username}
                            </Text>

                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text style={styles.texttitle}>
                                    id: 
                                </Text>

                                <Text style={styles.textvalue}>
                                    {thisUser._id}
                                </Text>

                            </View>

                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text style={styles.texttitle}>
                                    Регистрация: 
                                </Text>

                                <Text style={styles.textvalue}>
                                    {thisUser.datec.substring(0,10)}
                                </Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text style={styles.texttitle}>
                                    Рейтинг 
                                </Text>

                                <Text style={styles.textvalue}>
                                    ---------
                                </Text>
                            </View>

                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <Text style={styles.texttitle}>
                                    Закрыто сделок:
                                </Text>

                                <Text style={styles.textvalue}>
                                    ---
                                </Text>
                            </View>


                        </View>


                        <TouchableOpacity onPress={showSMes} style={styles.innerFirstUserFormContTwo}>

                       
                            <Image source ={{uri: thisUser.avatar}} style={{
                                        width: 124,
                                        height: 124,
                                        borderRadius: 62,
                                        overflow: "hidden",
                                        borderWidth: 2,
                                        borderColor: "grey",
                                        
                                        

                            }}/>

                            <View style={{width: '90%', minHeight: 30, backgroundColor :'#31383e', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginVertical: 7}}>
                                <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>
                                    Сообщение..
                                </Text>
                            </View>
                            
                        

                        
                        </TouchableOpacity>
                    </View>

                    <View style={{...styles.firstUserFormCont, minHeight: 100 ,marginTop: 10}}>
                        <View style={{width: '50%', minHeight: 100, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 22}}>
                                Достижения:
                            </Text>

                        </View>

                        <View style={{width: '50%', рeight: 100, flexDirection: 'row', padding: 10 ,flexWrap: 'wrap'}}>
                            <TouchableOpacity >
                                <Image source ={require('../../assets/achievements/Lesopoval.jpg')} style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                margin: 2,
                                                borderWidth: 1,
                                                borderColor: '#006b76'
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity >
                            <Image source ={require('../../assets/achievements/woodwork.jpg')} style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            margin: 2,
                                            borderWidth: 1,
                                            borderColor: '#006b76'
                            }}/>
                        </TouchableOpacity>

                        <TouchableOpacity >
                            <Image source ={require('../../assets/achievements/1stPlace.jpg')} style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            margin: 2,
                                            borderWidth: 1,
                                            borderColor: '#006b76'
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source ={require('../../assets/achievements/oborud.jpg')} style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            margin: 2,
                                            borderWidth: 1,
                                            borderColor: '#006b76'
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source ={require('../../assets/achievements/virgintree.png')} style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 20,
                                            margin: 2,
                                            borderWidth: 1,
                                            borderColor: '#006b76'
                            }}/>
                        </TouchableOpacity>
                        </View>

                     
                       



                    </View>




                    <View style={{...styles.firstUserFormCont, minHeight: 100 ,marginTop: 10, flexDirection: 'column'}}>
                        <Text >
                            Сделки с вами: ??
                        </Text>
                      
                    </View>

                    <View style={{...styles.firstUserFormCont, minHeight: imageWidth+70 ,marginTop: 10, flexDirection: 'column'}}>

                        <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 10}}>
                            Портфолио:
                        </Text>

                        <ScrollView style={{width: '100%', alignSelf: 'center', alignContent: 'stretch'}} horizontal={true}>
                        
                            {portFolioImgs.map((img, indx)=>
                                <TouchableOpacity key={img+indx} onPress={()=>setImageViewerProps({visible: true, index: indx})}>
                                    <Image  
                                        style={{width: imageWidth, height: imageWidth, borderColor: 'black', borderRadius: 9, marginHorizontal: 5,}} 
                                        source={img}
                                    />
                                </TouchableOpacity>
                            )}
                                    
                        </ScrollView>
                    </View>

                    

                    
                    
                </ScrollView>
            </SafeAreaView>

            <View style={{position: 'absolute', top: headerHeight}}>
                <TicketHat  />
            </View>

            <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
            </View>  
            
            
            

        </View>
    )
}

export default UserPage

const styles = StyleSheet.create({
    ScrollViewContainer:{
        flex: 1
      },
    achievModal:{
        flex: 1,
        backgroundColor: '#00000099',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    opaMiddleWare:{
        minHeight: '50%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        paddingBottom: 50

    },
    opaInnerAchievMain:{
        height: '20%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row'

    },
    opaInnerAchiev:{
        height: '17%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row'

    },
    opaInnerAchievLeft:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '35%'

    },
    opaInnerAchievRight:{
        
        flexDirection: 'column',
        width: '65%'

    },
    titlemodal:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textmodal:{
        marginTop: 5,
        fontSize: 18,
    },
    hatStyle:{
        backgroundColor: 'white',
        marginTop: '1%',
        marginBottom: '1%'
    },
    firstUserFormCont:{

        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    innerFirstUserFormContOne:{
        flexDirection: 'column',
        width: '65%',

    },
    innerFirstUserFormContTwo:{
        flexDirection: 'column',
        width: '35%',
        alignItems: 'center'
      
        
    },
    userFormCont:{
        backgroundColor: 'white',
        width: '98%',
        borderRadius: 5,
        marginTop: 3,
        marginBottom: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    casecont:{
        flexDirection: 'row',
        backgroundColor: '#00000015',
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        
    },
    textcase:{
        fontStyle: 'italic',
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
    bottomNavigation:{
        flexDirection:'row',
        backgroundColor:'white',
        marginTop: 15,
        borderBottomWidth: 3, 
        borderTopWidth: 3, 
        paddingTop: 5, 
        paddingBottom: 5,
        borderColor: 'grey'
    },
    input: {
      width: 350,
      margin: 10,
      padding: 8,
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
      borderBottomWidth: 1,
      
    }
})
