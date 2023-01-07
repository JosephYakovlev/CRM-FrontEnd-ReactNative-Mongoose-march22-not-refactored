import axios from 'axios'
import React, {useRef,useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity, Modal, TextInput, Alert, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useAsyncAbortable} from 'react-async-hook';
import {Context as AuthContext} from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import ProfileBar from '../components/profilebar/ProfileBar';
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import ImageView from "react-native-image-viewing";
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const TicketPage = (ticket) => {

    console.log("TICKET")
    console.log(ticket)

    const [imageViewerProps, setImageViewerProps] = useState({
        visible: false,
    })

    const headerHeight = getStatusBarHeight()

    const navigation = useNavigation();
    
    const routeOpenedCase = () =>{
        navigation.navigate('OpenedCase')
    }

    const routeWorkersSchedule = () =>{
        navigation.navigate('WorkersSchedule')
    }

    const [offerType, setOfferType] = useState('Активные')
    const [offerUsers, setOfferUsers] = useState([])
    const [usersIncomed,setUsersIncomed] = useState('No')

    

    
    const {state} = useContext(AuthContext)
    const currentUser = state.user.user.userDump
    
    

    const currentTicket = ticket?.route?.params?.ticket

    const includes = currentUser.outgoingOffers.filter(i => {
        return i.offerTicketId == currentTicket._id
    })

    const currentTicketOffers = currentUser.offers.filter(offer => offer.offerTicketId == currentTicket._id)

    const ticketUser = ticket?.route?.params?.currentUser
    console.log("пользователь") 
    console.log(ticketUser)
    const activeOffers = offerUsers.filter(offer => offer.checked === true)

    const uncheckedOffers = offerUsers.filter(offer => offer.checked === false)

    useEffect(()=> {
        navigation.addListener('focus', 
          async function fetchData() {
              try {
                    const offerOwners = await Promise.all(currentTicketOffers.map(async (i) => { 
                        const user = await (await fetch(`http://62.113.97.220:8800/api/users/${i.offerOwnerId}`)).json();
                        return i={...i,offerOwner: user} ;
                      }))
                      if(offerOwners.length > 0 ){
                        setOfferUsers(offerOwners)
                        setUsersIncomed('Yes')
                      }
                      onRefresh()
                  
      }catch (e) {}})})


    

    console.log('Активные')

    console.log(activeOffers.length)

    console.log(activeOffers)

    console.log('Заявленные')

    console.log(uncheckedOffers.length)

    // console.log(users)


    
    


    const carouselRef = useRef(null)  
    
    const RenderItem = ({item}) => {
        return (
                <View style={{backgroundColor: '#31383e',borderRadius: 10,}}>
                    <Image
                        style={{height: 200, width: '100%',borderTopLeftRadius: 10,borderTopRightRadius: 10}}
                        source= {item.imgUri ? {uri: item.imgUri } : null}
                    />
                    <View style={{alignItems:"center"}}>
                        <Text style={{color: '#ffffff', fontWeight: '600', fontSize: 20}}>
                           Задача: {item.imgTitle}
                        </Text>
                        
                        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 20}}>
                            Сдать до: {item.imgSroki}
                        </Text>
                    </View>
                </View>
        );
    }

    const renderOffer = ({offer}) => {
        return (
            <View>

            </View>
        )
    }


    const [showListvaModal, setShowListvaModal] = useState(false)

    const openListvaModal = () =>{
        setShowListvaModal(true)
    }
  
    const hideListvaModal = () => {
        setShowListvaModal(false)
    }  

    
    const [responsefromS, setResponsefromS] = useState({})

    // Добавление предложения подрядчика

    const [showOfferModal, setShowOfferModal] = useState(false)

    const openAddOfferModal = () =>{
        setShowOfferModal(true)
    }
  
    const hideAddOfferModal = () => {
        setShowOfferModal(false)
    }  

    const currTickId = currentTicket._id
    const tickOwner = currentTicket.ownerId

    const casePartners = {
        caseOwner: ticketUser._id,
        caseOwnerUserName: ticketUser.username,
        caseOwnerAvatar: ticketUser.avatar,
    }

    const windowWidth = Dimensions.get('window').width;

    const [offerForm, setOfferForm] = useState(
        { 
            offerTicketId: `${currentTicket._id}`,
            offerOwnerId:`${currentUser._id}`, 
            offerOwnerUserName: currentUser.username,
            offerOwnerAvatar: currentUser.avatar,
            ticketOwnerId: `${ticketUser._id}`,
            offerPrice: '',
            offerComment: '',
            checked: false
        }
        
      )

    const approveHandler = async (offers) => { 
        
        let offerOwner = offers.offerOwner
        const responseApprove = await axios.post('http://62.113.97.220:8800/api/ticket/approved',{...casePartners,offerOwner, currentTicket})
        .then((responseApprove) => {
            console.log('RESPONSEDATA');
            console.log(responseApprove.data)
            console.log('RESPONSEDATA');

            let caseData = responseApprove.data
            
            setResponsefromS({caseData})
            setOfferType('Активные')
            openListvaModal()
            // navigateHandler({caseData})
            
            socket.emit("reload", responseApprove.data.caseContractor)
            socket.emit("reload", responseApprove.data.caseOwner)
            
          
            
       

            
            
        })
    }


    const navigateHandler = () => {
        navigation.navigate('OpenedCase', responsefromS)
    }


    const registerOfferHandler = async (result) => {
        try {
        
            const response = await axios.put(`http://62.113.97.220:8800/api/ticket/${currentTicket._id}/addOffer`,offerForm)
            .then((response)=>{
              
                socket.emit("reload", response.data.sender)
                socket.emit("reload", response.data.reciever)

                 Alert.alert(
                        "Поздравляем",
                        "Вы успешно добавили свое предложение!",
                        [
                          { text: "Ок", onPress: () => console.log("Остаться в профиле") }
                        ]
                      );
                }).then(() => {
            // rerender
                    navigation.navigate('Main')
                })
              
        }  catch (error) {
          console.log("Keychain couldn't be accessed!", error);
        }
      }
    
    return (
        <View style={{height: '100%'}}>


        <ImageView
            images={[{uri: currentTicket.mainimg}]}
            imageIndex={imageViewerProps.index}
            visible={imageViewerProps.visible}
            onRequestClose={() => setImageViewerProps({...imageViewerProps, visible: false})}
        />

            <SafeAreaView style={{flex: 1, marginBottom: 90, justifyContent: 'space-between', marginTop: headerHeight }}>
                <ScrollView >

















                <Modal 
                    visible={showListvaModal}  
                    transparent
                    onRequestClose = {()=>
                    setShowListvaModal(false)
                    }
                    hardwareAccelerated
                    animationType='none'
            >
                
                <TouchableOpacity onPress={navigateHandler} style={{...styles.achievModal, alignItems: 'center', justifyContent: 'center', minHeight: '100%'}} >

                
                    <View style={{...styles.purposeModalTitle, height: 300, backgroundColor: 'white', width: '97%'}}>

                        <Text style={{alignSelf: 'center', fontSize: 23, fontWeight: 'bold',}}>
                            Пользователь 
                        </Text>

                        <Text style={{alignSelf: 'center', fontSize: 27, fontWeight: 'bold',}}>
                            {responsefromS?.caseData?.caseContractorUserName}
                        </Text>

                        <Text style={{alignSelf: 'center', fontSize: 23, fontWeight: 'bold',}}>
                            одобрен.
                        </Text>

                        <Text style={{alignSelf: 'center', fontSize: 17, marginTop: 20}}>
                            Начат процесс заключения сделки.
                            
                        </Text>

                        <TouchableOpacity onPress={navigateHandler} style={{minHeight: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 5, backgroundColor: 'lightgrey', paddingHorizontal: 5, marginTop: 50, width: '80%'}} >
                            <Text style={{alignSelf: 'center', fontSize: 23}}>
                                Перейти к сделке
                            </Text>
                        </TouchableOpacity>
                    
                    </View>
                


 
                </TouchableOpacity>

            </Modal>















            




















            <Modal 
                    visible={showOfferModal}  
                    transparent
                    onRequestClose = {()=>
                    setShowOfferModal(false)
                    }
                    hardwareAccelerated
                    animationType='none'
            >
                
                <TouchableOpacity style={styles.achievModal} onPress = {hideAddOfferModal}>
                    <ScrollView>
                    <View style={styles.purposeModalTitle}>
                        <Text style={{fontSize:22,fontWeight:'bold',color: '#31383e'}}>
                            Сформируйте ваше
                        </Text>
                        <Text style={{fontSize:22,fontWeight:'bold',color: '#31383e'}}>
                            предложение
                        </Text>
                    </View>




                    <View style={styles.purposeModal}> 

                        <Text style={{alignSelf: 'center', fontSize: 22, fontWeight: '700'}}>
                            Вы:
                        </Text>

                        <TouchableOpacity style={{width:'100%', alignSelf: 'center', flexDirection: 'row', marginVertical: 10, paddingVertical: 7, borderStyle: 'dashed', borderBottomWidth: 1, borderTopWidth: 1}}>
                            <View style={{width: '50%'}}>
                                <Text style={{marginLeft: 10, color: 'blue', fontSize: 22}}>
                                    {currentUser.username}
                                </Text>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source ={require('../../assets/crm/wallet.jpg')} style={{
                                        height: 40,
                                        width: 50,
                                        marginBottom: 3,
                                    }} />
                                    <Text style={{marginLeft: 10, color: 'green', fontSize: 18, }}>
                                        {currentUser.wallet} руб.
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{ marginLeft: 10, color: 'black', fontSize: 14,fontWeight: '700' }}>
                                        email:
                                    </Text>
                                    <Text style={{marginLeft: 10, color: 'blue', fontSize: 13, }}>
                                        {currentUser.email}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{ marginLeft: 10, color: 'black', fontSize: 14,fontWeight: '700' }}>
                                        телефон:
                                    </Text>
                                    <Text style={{marginLeft: 10, color: 'blue', fontSize: 13, }}>
                                        {currentUser.phoneNumber}
                                    </Text>
                                </View>
                            </View>
                            <View style={{width: '50%', alignItems:'flex-end', justifyContent:'center', right: 15}}>
                                <Image source= {{uri: currentUser.avatar}} style={{
                                                width: `${windowWidth}` / 4,
                                                height: `${windowWidth}` / 4,
                                                borderRadius: 5,
                                                borderWidth: 2,
                                                borderColor: 'black',

                                }}/>  
                            </View>

                        </TouchableOpacity>





                    <TextInput 
                        onChangeText={(price) => setOfferForm({...offerForm, offerPrice: price})}
                        placeholder="Ваша цена"
                        iconType="user"
                        autoCapitalize="none"
                        keyboardType='numeric'
                        autoCorrect={false} 
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={(comment) => setOfferForm({...offerForm, offerComment: comment})}
                        placeholder="Ваш комментарий"
                        iconType="user"
                        autoCapitalize="none"
                        autoCorrect={false} 
                        style={styles.input}
                        multiline
                    />

                    <TouchableOpacity 
                        style={{backgroundColor: 'green', width: "97%",alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 3, margin: 5, borderRadius: 3,}}
                        onPress={registerOfferHandler}
                    >
                        
                        
                        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
                        Выдвинуть предложение
                        </Text>

                    </TouchableOpacity>
                   
                </View>
                </ScrollView>
 
                </TouchableOpacity>
                

            </Modal>






















            
            <View style={{alignItems: 'center',backgroundColor: '#31383e', height: 40, justifyContent: 'center'}}>
                <Text style={{fontSize: 22, fontWeight: '600', color: 'white'}}>
                    {currentTicket.mainTitle}
                </Text>
            </View>
            <View style={styles.contCarousel}>
                {currentTicket.otherImg.length > 0 ?<Carousel
                    ref={carouselRef}
                    data={currentTicket.otherImg}
                    renderItem={RenderItem}
                    sliderWidth={320}
                    itemWidth={320 - 10}
                    swipeThreshold={100}
                    layoutCardOffset={-12}
                    inactiveSlideOpacity={0.4}
                    containerCustomStyle={{
                    overflow: 'visible',
                    marginVertical: 7,
                    }}
                    contentContainerCustomStyle={{
                    paddingTop: -14,
                    }}
                /> : 
                <TouchableOpacity onPress={()=>setImageViewerProps({visible: true, index: 0})} style={{width: '100%', alignItems: 'center', paddingVertical: 10}}>
                <Image source = {{uri: currentTicket.mainimg}} style={{
                    margin: 3,
                        width: "80%",
                        height: 200,
                        borderRadius: 5
                }}/>
                </TouchableOpacity>
                }
            </View>
                    {currentTicket.ownerId != currentUser._id && includes.length == 0 && <TouchableOpacity onPress={openAddOfferModal} style={{width: '100%', backgroundColor: 'white'}}>
                        <View style={styles.joinCont}>
                            <Text style={{fontSize: 22, fontWeight: '700',color: 'black'}}>
                                Предложить свои услуги
                            </Text>
                        </View>
                    </TouchableOpacity>}

                    {currentTicket.ownerId != currentUser._id && includes.length > 0 && <TouchableOpacity  style={{width: '100%', backgroundColor: 'white'}}>
                        <View style={styles.joinCont}>
                            <Text style={{fontSize: 18, fontWeight: '700',color: 'black'}}>
                                Вы уже отправили предложение
                            </Text>
                        </View>
                    </TouchableOpacity>}

                    {currentTicket.ownerId == currentUser._id && <TouchableOpacity  style={{width: '100%', backgroundColor: 'white'}} > 
                        <View style={styles.joinCont}>
                            <Text style={{fontSize: 18, fontWeight: '700',color: 'black'}}>
                                Объявление видят пользователи
                            </Text>
                        </View>
                    </TouchableOpacity>}
            
                <View style={{backgroundColor: 'white'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black', alignSelf: 'center'}}>
                        Информация о заказе:
                    </Text>
                </View>


                <View style={styles.ownerInfo}>
                
                <Text style={{fontSize: 21, fontWeight: 'bold', color: 'black'}}>
                    Заказчик: 
                </Text>

                <TouchableOpacity onPress={routeOpenedCase} style={{flexDirection: 'column'}}>
                    

                    <Image source ={ticketUser.avatar ? {uri: ticketUser.avatar} : require('../../assets/users/f1.png')} style={{
                    margin: 3,
                        width: 90,
                        height: 90,
                        borderRadius: 45
                    }}/>
                </TouchableOpacity>

                <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:18,fontWeight:'bold',color: 'blue'}}>
                        {ticketUser.username}
                    </Text>

                    <Text>
                        Рейтинг: 2340
                    </Text>

                    <Text>
                        Закр. сделок: 90
                    </Text>

                    <Text>
                        Откр. сделок: 4
                    </Text>
                </View>

            </View>

            <View style={{flexDirection:'row', width: '100%', marginLeft:10, backgroundColor: 'white'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    Цена контракта:
                </Text>

                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue',  marginLeft: 10}}>
                    {NormalizeNumHook(currentTicket.price)}.00 р.
                </Text>
            </View>
       


            <View style={{flexDirection:'row', width: '100%', marginLeft:10, backgroundColor: 'white'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    Начало работ:
                </Text>

                <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue',  marginLeft: 10}}>
                    {currentTicket?.start?.substring(0,10)}
                </Text>
            </View>

            <View style={{flexDirection:'row', width: '100%', marginLeft:10, backgroundColor: 'white'}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    Адрес:
                </Text>
                
                <Text style={{fontSize: 20, fontWeight: '500', color: 'blue',  marginLeft: 10}}>
                    {currentTicket.city}
                </Text>
            </View>

            <View style={styles.titleCont}>
                
                <Text style={{fontSize: 18, fontWeight: 'bold', alignSelf: 'center', color: 'black'}}>
                    Комментарий:
                </Text>

                <Text style={{fontSize: 16, fontWeight: '500'}}>
                    {currentTicket.title}
                </Text>

            </View>


        { currentTicket.ownerId === currentUser._id &&
         <View>
            <Text style={{alignSelf: 'center', fontSize: 20}}>
                    Исполнители
            </Text>

            <View style={{width: '95%', flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity onPress={()=> setOfferType('Активные')} style={{width: '50%', backgroundColor: offerType === 'Активные' ? 'lightgreen' : 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, fontWeight: '700'}}>
                        Активные
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setOfferType('Заявленные')} style={{width: '50%',backgroundColor: offerType === 'Заявленные' ? 'lightgreen' : 'lightgrey', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 24, fontWeight: '700'}}>
                        Заявленные
                    </Text>
                </TouchableOpacity>
            </View>

                { 
                    offerType === 'Активные' && activeOffers.length > 0 && activeOffers.map((  offers ) => 
                    <View key = {offers._id} style={styles.ticketContainer}>
                    <TouchableOpacity  style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                        
                        <View style={{width: '60%'}}> 
        
                            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}} >
                                        {offers.offerComment}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={routeWorkersSchedule} style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14, color: 'blue'}} >
                                        Журнал посещений
                                    </Text>
                                </TouchableOpacity>
        
                            </View>
                             
        
                            <View style={{flexDirection:'row'}}>
        
                                <Text >
                                    Рейтинг:
                                </Text>
        
                                <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                                    3 678
                                </Text>  
                            </View>
        
                            <View style={{flexDirection:'row'}}>
        
                                <Text>
                                    Присоеденился:
                                </Text>
        
                                <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                                    30.06.2022
                                </Text> 
                            </View>
        
                            <TouchableOpacity onPress={() => approveHandler(offers.offerOwner._id)} style={{backgroundColor: 'green', borderRadius: 5, borderWidth: 1, alignItems: 'center' }}>
                                <Text style={{fontSize: 15,fontWeight: '700', color: 'white'}}>
                                    ОДОБРЕН
                                </Text>
                            </TouchableOpacity>
        
                        </View>
        
                        <Image source={offers?.offerOwner?.avatar ? {uri: offers?.offerOwner?.avatar } : require('../../assets/profile.png')} style={{
                            width: 100,
                            height: 100,
                            borderWidth: 1,
                            borderColor: 'black',
                        }}/>
        
                        
                    
                    
                    </TouchableOpacity>
              </View>)}



                 { offerType === 'Активные' && activeOffers.length == 0  &&
                 <View  style={{minHeight: 100, justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{fontSize: 22, color: 'black'}}>
                        {activeOffers.length} 
                     </Text>

                 </View>}



                 { offerType === 'Заявленные' && uncheckedOffers.length > 0 &&  uncheckedOffers.map((  offers ) => 
                 <View key = {offers._id} style={styles.ticketContainer}>
                 <TouchableOpacity  style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                     
                     <View style={styles.leftTicketCont}> 
     
                         <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                             <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}} >
                                 {offers.offerComment}
                             </Text>
     
                         </View>
                          
     
                         <View style={{flexDirection:'row'}}>
     
                             <Text >
                                 Рейтинг:
                             </Text>
     
                             <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                                 3 678
                             </Text>  
                         </View>
     
                         <View style={{flexDirection:'row'}}>
     
                             <Text>
                                 Присоеденился:
                             </Text>
     
                             <Text style={{fontSize: 15, fontWeight: '700', color: 'blue', marginLeft: 5}}>
                                 30.06.2022
                             </Text> 
                         </View>
     
                         <TouchableOpacity onPress={() => approveHandler(offers)} style={{backgroundColor: 'red', borderRadius: 5, borderWidth: 1, alignItems: 'center' }}>
                             <Text style={{fontSize: 15,fontWeight: '700', color: 'white'}}>
                                 ПОКА НЕ ОДОБРЕН
                             </Text>
                         </TouchableOpacity>
     
                     </View>
     
                     <Image source={offers?.offerOwner?.avatar ? {uri: offers?.offerOwner?.avatar } : require('../../assets/profile.png')} style={{
                         width: 100,
                         height: 100,
                         borderWidth: 1,
                         borderColor: 'black',
                     }}/>
     
                     
                 
                 
                 </TouchableOpacity>
           </View>)
                 }

                { offerType === 'Заявленные' && uncheckedOffers.length == 0  &&
                 <View  style={{minHeight: 100, justifyContent: 'center', alignItems: 'center'}}>
                     <Text style={{fontSize: 22, color: 'black'}}>
                        Нет заявок на выполнение 
                     </Text>

                 </View>}

                </View>}

                 
                </ScrollView>
      
      
            </SafeAreaView>

            <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
            </View>

        </View>
    )
}

export default TicketPage

const styles = StyleSheet.create({
    achievModal:{
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center'
    },
    contCarousel:{
        alignItems: 'center',
        backgroundColor: 'white',
    },
    mainInfo:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    ownerInfo:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'

    },
    purposes:{
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    purposeModal:{
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
    },
    titleCont:{
        width: '95%',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'center',
        padding: 5,
        marginBottom: 5
    },
    purposeModalTitle:{
        height: 70,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'lightgreen',
        borderColor: 'white',
        borderWidth: 3,
    },
    input:{
        width: 350,
        margin: 10,
        padding: 8,
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        borderBottomWidth: 1
    },
    purposesinmodal:{
        height: '90%',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
    },
    purposesModalTitle:{
        height: '20%',
        backgroundColor: 'white',
        marginTop: 80,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    joinCont: {
        width: '85%',
        backgroundColor: 'lightgreen',
        borderRadius: 1,
        minHeight: 50,
        alignSelf: 'center',
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    ticketContainer: {
        backgroundColor: 'white',
        borderRadius: 1,
        margin: 10,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
})
