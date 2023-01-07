import axios, { Axios } from 'axios'
import React, {useState, useEffect, Component, useContext} from 'react'
import {View, Button, TextInput, StyleSheet, Platform, Image, Text, TouchableOpacity, Modal, Alert,ScrollView, Dimensions} from 'react-native'
import { io } from 'socket.io-client'
const socket = io("http://62.113.97.220:3000")
import {Context as AuthContext} from '../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker'
import ProfileBar from '../components/profilebar/ProfileBar'
import InputScrollView from 'react-native-input-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { NormalizeNumHook } from '../hooks/NormalizeNumHook';
import ReversedFlatList from 'react-native-reversed-flat-list';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const windowWidth = Dimensions.get('window').width
const imageWidth = windowWidth/100*10
const headerHeight = getStatusBarHeight()

export default function OpenedCase(concludingContract) {


  


  console.log("OPENEDCASESESE")
  console.log(concludingContract.route.params.caseData)

  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;

  const caseData = concludingContract.route.params.caseData 

 

  const {state, signin} = useContext(AuthContext)
 

  const currentUser = state.user.user.userDump
  
  const csId = caseData._id
  const indexCaseData = currentUser.concludingContracts?.findIndex(i => i?._id === csId)

  const currentMessages = state.user.user.userDump.dialogs.filter(i=>{
    return i?.companion == caseData.caseTicket
  })

  const thisDialogMessages = currentMessages[0]?.messages || []

  useEffect(()=> {
    setShowMessages(false)
    setNewMessage({...newMessage, title: '1'})
    setMessages(currentMessages[0]?.messages)
  },[thisDialogMessages])
  

  const [newMessage, setNewMessage] = useState({
    messageSender: currentUser._id,
    messageSenderAvatar: currentUser.avatar,
    messageSenderUsername: currentUser.username,
    messageReciever: currentUser._id === caseData.caseOwner ? caseData.caseContractor : caseData.caseOwner,
    title: '',
    theme: 'CC-Message',
    belongs: caseData.caseTicket,
    seen: "https://res.cloudinary.com/stroyka-ru/image/upload/v1664487284/check2_n6aw8c.png"
  })


  let today = String(new Date()).substring(16,21)
  let currdatec = currentUser.datec.substring(0,11)
  
  let todayfull = currdatec.concat(today)
  const [showMessages, setShowMessages] = useState(false)
  const [messages, setMessages] = useState(currentMessages[0]?.messages || [])

  
const [value1, setValue1] = useState()
 

  const sendMessageHandler = async () => {
    setValue1({value: ''})
   
    try{

      setMessages([...messages, {...newMessage, datec: todayfull, seen: 'https://res.cloudinary.com/stroyka-ru/image/upload/v1664487287/check1_brohks.png', title: value1}])
      setShowMessages(true)


      const res = await axios.post(`http://62.113.97.220:8800/api/users/newconcludingmessage`, {...newMessage, title: value1}).then((res) => {
      
        socket.emit("reload", res.data.reciever)
        socket.emit("reload", res.data.sender)
        seenDialogHandler()
    })

    } catch (error) {
      console.log("noPost", error);
    }
  
  }




  socket.on("connect",()=>{
    console.log(`you connected with ${socket.id}`)
  })

  socket.on('hey', message => {
    console.log(message)
  })
 
 
  const concCaseData = currentUser.concludingContracts.find(i => {
    return i?.caseTicket == caseData.caseTicket,
    i?.caseContractor == caseData.caseContractor
  })
 

  const termsData = currentUser.concludingContracts[indexCaseData]?.terms || caseData.terms

  const CaseCusDepositState = {
    Sender: currentUser._id,
    Reciever: caseData._id,
    Summ: termsData[1].title ,
    Context: 'CASE DEPOSIT',
    BelongsTo: caseData._id,
    PayFor: caseData._id 
  }

  const companion = currentUser._id == caseData.caseContractor ? caseData.caseOwner : caseData.caseContractor

  const unseenmsg = currentMessages[0]?.messages.filter(i => {
    return  i?.messageSender != currentUser._id && 
            i?.unseen == "YES"
       
   })

  const seenDialogHandler = async () => {
    try {

        const res = await axios.post(`http://62.113.97.220:8800/api/users/seendialog/${currentUser._id}/${currentMessages[0]?._id}/${companion}`).then((res)=>{
            socket.emit("reload", res.data.sender)
            socket.emit("reload", res.data.reciever)
            console.log("DONE")
        })
        
      } catch (error) {
        console.log(error)
      }
  }


  const payDepositCusHandler = async () => {
      try {

          const res = await axios.post(`http://62.113.97.220:8800/api/users/paydeposit/${caseData._id}/${caseData.caseOwner}/${caseData.caseTicket}`, CaseCusDepositState).then((res)=>{
            
              socket.emit("reload", res.data.owner)
              socket.emit("reload", res.data.contractor)
              
            
          })
          
        } catch (error) {
          console.log(error)
        }
    }

  const days = new Date(termsData[0]?.mainTitle) - new Date(termsData[0]?.title)
  const termDays = days/(3600000*24)*-1


  const [img64default,setImg64default] = useState('')


  
  const routeOpenedCasePage = () =>{
    navigation.navigate('OpenedCasePage')
  }

  const [showModalAccept, setShowModalAccept] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showTermsEditModal, setShowTermsEditModal] = useState(false)
  const [showPledgeEditModal, setShowPledgeEditModal] = useState(false)
  const [showTermEditModal, setShowTermEditModal] = useState(false)
  const [showDeleteTermModal, setShowDeleteTermModal] = useState(false)

  const showModalAccepted = () =>{
    setShowModalAccept(true)
  }

  const hideModalAccepted = () => {
    setShowModalAccept(false)
  }

  const showDialogModal = () =>{
    setShowDialog(true)
    seenDialogHandler()
  }

  const hideDialogModal = () => {
    setShowDialog(false)
  }

  const showTermsEdit = () =>{
    setShowTermsEditModal(true)
  }

  const hideTermsEdit = () => {
    setShowTermsEditModal(false)
  }

  const showPledgeEdit = () =>{
    setShowPledgeEditModal(true)
  }

  const hidePledgeEdit = () => {
    setShowPledgeEditModal(false)
  }

  const showTermEdit = () =>{
    setShowTermEditModal(true)
  }

  const hideTermEdit = () => {
    setShowTermEditModal(false)
  }

  const showDeleteTerm = () =>{
    setShowDeleteTermModal(true)
  }

  const hideDeleteTerm = () => {
    setShowDeleteTermModal(false)
  }


  const [newTerm, setNewTerm] = useState(
    {
      author: currentUser._id,
      mainTitle: 'Условие 1',
      title: 'Ни слова по русски',
      acceptedByOwner: currentUser._id === caseData.caseOwner ? currentUser._id : "NULL",
      acceptedByContractor: currentUser._id === caseData.caseOwner ? "NULL" : currentUser._id,
    }
  )



  const renderMessage = (item,index) => {


    if(item.messageSender == currentUser._id) {
        return (
            <View style={{ 
                    width:'90%', 
                    minHeight: 80, 
                    backgroundColor: '#D5F8E6', 
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
                    backgroundColor: 'lightblue', 
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



  
  

  //   useEffect(() => {
  //     const timer = setInterval(() => Reload(), 15000)
  //   }, [])
    

    const addNewTermHandler = async () => {
      try {
           const res = await axios.post(`http://62.113.97.220:8800/api/users/newterm/${caseData.caseOwner}/${caseData._id}`, newTerm).then((res) => {
            
            socket.emit("reload", res.data.caseOwner)
            socket.emit("reload", res.data.caseContractor)
            console.log("HIDEMODAL")
            hideModalAccepted()
           })
           
      } catch (error) {
        console.log("noPost", error);
      }
    }

    const acceptContractorHadnler = async (termId) => {
      try {

        const res = axios.put(`http://62.113.97.220:8800/api/users/acceptTermByContractor/${termId}/${caseData._id}/${caseData.caseOwner}/${caseData.caseContractor}`).then((res)=>{
          
          socket.emit("reload", res.data.owner)
          socket.emit("reload", res.data.contractor)
          console.log('ПОДРЯДЧИК СОГЛАСЕН')
        })
        

      } catch (error) {
          console.log("noAcceptTerm", error); 
      }
    }

    const acceptOwnerHadnler = async (termId) => {
      try {

          const res = axios.put(`http://62.113.97.220:8800/api/users/acceptTermByOwner/${termId}/${caseData._id}/${caseData.caseOwner}/${caseData.caseContractor}`).then((res)=>{
           
            
            socket.emit("reload", res.data.owner)
            socket.emit("reload", res.data.contractor)
            console.log('ЗАКАЗЧИК СОГЛАСЕН')
          })

      } catch (error) {
        console.log("noAcceptTerm", error); 
      }
    }

    const registerCaseHandler = async (termId) => {
      try {

        const res = axios.post('http://62.113.97.220:8800/api/openedCases/registerCase',caseData).then( async (res)=>{

          const ownerEmit = await  socket.emit("reload", `${res.data.caseOwner}`)
          const contractorEmit = await  socket.emit("reload", `${res.data.caseContractor}`)
          
          navigation.navigate('OpenedCasePage', res.data)

        })
        
    
        

      } catch (error) {
          console.log("noAcceptTerm", error); 
      }
    }

    const [startDate, setStartDate] = useState(new Date(caseData.terms[0].mainTitle))
    const [endDate, setEndDate] = useState(new Date(caseData.terms[0].title))
    const [mode, setMode] = useState('date')
    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
  
  
    


    const [deletingTerm, setDeletingTerm] = useState({author: "NULL",mainTitle: "NULL", title: "NULL", acceptedByOwner: "NULL", acceptedByContractor: "NULL", indx: 0})
    const [redactingTerm, setRedactingTerm] = useState({author: "NULL",mainTitle: "NULL", title: "NULL", acceptedByOwner: "NULL", acceptedByContractor: "NULL", indx: 0})
    
    const onChangeStart = (event,selectedDate) => {
      const currentDate = selectedDate || startDate
      setShowStart(Platform.OS === 'ios')
      setStartDate(currentDate)

      let tempDate = new Date(currentDate)
      let fDate = JSON.stringify(tempDate)
      let formatedDate = fDate.substring(1,11)
      setRedactingTerm({...redactingTerm, mainTitle: formatedDate})
  
    }

    const onChangeEnd = (event,selectedDate) => {
      const currentDate = selectedDate || endDate
      setShowEnd(Platform.OS === 'ios')
      setEndDate(currentDate)

      let tempDate = new Date(currentDate)
      let fDate = JSON.stringify(tempDate)
      let formatedDate = fDate.substring(1,11)
      setRedactingTerm({...redactingTerm, title: formatedDate})
  
    }

    const showModeStart = (currentMode) => {
      setShowStart(true)
      setMode(currentMode)
    }

    const showModeEnd = (currentMode) => {
      setShowEnd(true)
      setMode(currentMode)
    }

    

    const patchTerm = async () => {
      try {

        const res = await axios.put(`http://62.113.97.220:8800/api/users/patchterm/${caseData._id}/${caseData.caseOwner}/${caseData.caseContractor}`, {...redactingTerm, acceptedByContractor: currentUser._id === caseData.caseOwner ? "NULL" : currentUser._id, acceptedByOwner: currentUser._id === caseData.caseOwner ? currentUser._id : "NULL"}).then((res)=>{
          console.log("OPENED CASE REGISTRED")
            socket.emit("reload", res.data.owner)
            socket.emit("reload", res.data.contractor)
            console.log("HIDEMODAL")
            hideTermEdit()
            hidePledgeEdit()
            hideTermsEdit()
        })
        
      } catch (error) {
        console.log(error)
      }
      
    }



    const deleteTerm = async () => {
      try {

        const res = await axios.put(`http://62.113.97.220:8800/api/users/deleteterm/${caseData._id}/${caseData.caseOwner}/${caseData.caseContractor}`, deletingTerm).then((res)=>{
          console.log("TERM DELETED")
            socket.emit("reload", res.data.owner)
            socket.emit("reload", res.data.contractor)
            console.log("HIDEMODAL")
            hideDeleteTerm()
        })
        
      } catch (error) {
        console.log(error)
      }
      
    }
    
    const unacceptedtermslength = termsData.filter(i => {
     return i?.acceptedByContractor !== "NULL" && i?.acceptedByOwner !== "NULL"
        
      
    })

    console.log('TERMLENGTH')
    console.log(unacceptedtermslength.length)
    

  
  return (
    <View style={{flex:1}}>




























      <Modal 
        visible={showModalAccept}  
        transparent
        onRequestClose = {()=>
          setShowModalAccept(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModalAccepted}>
          <TouchableOpacity style={styles.modalInner}>
            <Text style={{fontSize: 22, fontWeight: '700', alignSelf:'center',marginBottom: 20}}>
              Выдвинуть условие
            </Text>
          <View style={{alignItems: 'center', padding: 5, backgroundColor: 'lightgrey', maxHeight: 200, width: '95%', borderRadius:5, borderWidth: 1, alignSelf: 'center', flexWrap: 'wrap'}}>
                <InputScrollView>
                  <TextInput
                    onChangeText={(term) => setNewTerm({...newTerm, title: term})}
                    multiline
                    placeholder="Сформулируйте условие"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false} 
                    style={{ width: '100%',
                    fontSize: 20}}
                  />
                </InputScrollView>
          </View>
          
          <TouchableOpacity onPress={addNewTermHandler} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Отправить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>















      <Modal 
        visible={showTermsEditModal}  
        transparent
        onRequestClose = {()=>
          setShowTermsEditModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideTermsEdit}>
          <TouchableOpacity style={styles.modalInner}>
            <Text style={{fontSize: 22, fontWeight: '700', alignSelf:'center',marginBottom: 10}}>
              Изменить сроки
            </Text>
          
          
            <TouchableOpacity onPress={showModeStart} style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: 10, minHeight: 60, backgroundColor: '#E0C2F5', paddingVertical: 15}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <Text style = {{fontSize: 18}}>
                  Начало  
                </Text> 
                <Text style = {{fontSize: 18}}>
                  Работ :
                </Text> 
              </View>

              <View style={{ width: '50%'}}>
                <Text style={{fontSize: 25}}>
                  {String(redactingTerm.mainTitle).substring(0,10)}
                </Text>
              </View>

            </TouchableOpacity>


            <TouchableOpacity onPress={showModeEnd} style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: 10, minHeight: 60, backgroundColor: 'lightblue', paddingVertical: 15}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <Text style = {{fontSize: 18}}>
                  Окончание
                </Text> 
                <Text style = {{fontSize: 18}}>
                  Работ :
                </Text> 
              </View>

              <View style={{ width: '50%'}}>
                <Text style={{fontSize: 25}}>
                  {String(redactingTerm.title).substring(0,10)}
                </Text>
              </View>

            </TouchableOpacity>


          
          <TouchableOpacity onPress={patchTerm} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Отправить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>


















      <Modal 
        visible={showPledgeEditModal}  
        transparent
        onRequestClose = {()=>
          setShowPledgeEditModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hidePledgeEdit}>
          <TouchableOpacity style={styles.modalInner}>

            <Text style={{fontSize: 20, fontWeight: '700', alignSelf:'center'}}>
              Редактировать
            </Text>
            
            <Text style={{fontSize: 20, fontWeight: '700', alignSelf:'center'}}>
              Залоговые обязательства:
            </Text>

            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: 10, minHeight: 60, backgroundColor: '#E0C2F5', paddingVertical: 15}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <Text style = {{fontSize: 18}}>
                  Залог 
                </Text> 
                <Text style = {{fontSize: 18}}>
                  Заказчика(вы) :
                </Text> 
              </View>

              <View style={{ width: '50%'}}>
                <TextInput
                    onChangeText={(term1) => setRedactingTerm({...redactingTerm, mainTitle: term1})}
                    multiline
                    placeholder={NormalizeNumHook(caseData.terms[1].mainTitle)+ " р."}
                    iconType="user"
                    keyboardType='numeric'
                    autoCapitalize="none"
                    autoCorrect={false} 
                    style={{ width: '100%',
                    fontSize: 25,
                    borderBottomWidth: 1,
                    minHeight: 50,
                    width: '80%'}}
                  />
              </View>

            </View>



            <View style={{ flexDirection: 'row', width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: 10, minHeight: 60, backgroundColor: 'lightblue', paddingVertical: 15}}>
              <View style={{width: '50%', alignItems: 'center'}}>
                <Text style = {{fontSize: 18}}>
                  Залог
                </Text> 
                <Text style = {{fontSize: 18}}>
                  Подрядчика :
                </Text> 
              </View>

              <View style={{ width: '50%'}}>
                <TextInput
                    onChangeText={(term2) => setRedactingTerm({...redactingTerm, title: term2})}
                    multiline
                    placeholder={NormalizeNumHook(caseData.terms[1].title)+ " р."} 
                    iconType="user"
                    keyboardType='numeric'
                    autoCapitalize="none"
                    autoCorrect={false} 
                    style={{ width: '100%',
                    fontSize: 25,
                    borderBottomWidth: 1,
                    minHeight: 50,
                    width: '80%'}}
                  />
              </View>

            </View>
          
          
          <TouchableOpacity onPress={patchTerm} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Отправить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>




















      <Modal 
        visible={showTermEditModal}  
        transparent
        onRequestClose = {()=>
          setShowTermEditModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideTermEdit}>
          <TouchableOpacity style={styles.modalInner}>
            <Text style={{fontSize: 22, fontWeight: '700', alignSelf:'center',}}>
              Редактировать условие #{redactingTerm.indx+1}
            </Text>

            <Text style={{fontSize: 22, fontWeight: '700', alignSelf:'center',marginTop: 10}}>
              Текущее предложение:
            </Text>
          <View style={{alignItems: 'center', padding: 5, backgroundColor: 'lightgrey', height: 150, width: '95%', borderRadius:5, borderWidth: 1, alignSelf: 'center', flexWrap: 'wrap'}}>
                <ScrollView>
                  <Text>
                    {caseData.terms[redactingTerm.indx].title}
                  </Text>
                </ScrollView>
          </View>

            <Text style={{fontSize: 22, fontWeight: '700', alignSelf:'center',marginTop: 10}}>
              Ваше предложение:
            </Text>

          <View style={{alignItems: 'center', padding: 5, backgroundColor: 'lightgrey', height: 150, width: '95%', borderRadius:5, borderWidth: 1, alignSelf: 'center', flexWrap: 'wrap'}}>
                <InputScrollView>
                  <TextInput
                    onChangeText={(term) => setRedactingTerm({...redactingTerm, title: term})}
                    multiline
                    placeholder={caseData.terms[redactingTerm.indx].title + "..."}
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false} 
                    style={{ width: '100%',
                    fontSize: 18}}
                  />
                </InputScrollView>
          </View>
          
          <TouchableOpacity onPress={patchTerm} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Редактировать
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>





























      <Modal 
        visible={showDeleteTermModal}  
        transparent
        onRequestClose = {()=>
          setShowDeleteTermModal(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideDeleteTerm}>
          <TouchableOpacity style={{...styles.modalInner, backgroundColor: '#F1CACF'}}>
            <Text style={{fontSize: 18, fontWeight: '700', alignSelf:'center', marginBottom: 10}}>
              Удалить условие #{deletingTerm.indx+1}
            </Text>

            
          <View style={{alignItems: 'center', padding: 5, backgroundColor: 'white', minHeight: 200, width: '95%', borderRadius:5, borderWidth: 1, alignSelf: 'center', flexWrap: 'wrap'}}>
            <Text style={{fontSize: 18, fontWeight: '600', alignSelf:'center',marginBottom: 5}}>
              {deletingTerm.title}
            </Text>
          </View>
          
          <TouchableOpacity onPress={deleteTerm} style={styles.deni}>
            <Text style={{paddingHorizontal: '15%',color: 'white', fontSize: 22,fontWeight:'bold'}}>
              Удалить
            </Text>
          </TouchableOpacity>
         
           
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>





















      <Modal 
        visible={showDialog}  
        transparent
        onRequestClose = {()=>
          setShowDialog(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <View style={styles.modalOne} >
          <View style={styles.modalInnerDialog}>

            <View style={{marginBottom: 84, borderBottomColor: 'black'}}>
            
                        <ReversedFlatList
                            data={showMessages == true ? messages : currentMessages[0]?.messages}
                            keyExtractor={(item) => item._id}
                            renderItem={ ({ item, index }) => (
                                renderMessage(item, index) 
                            )}
                        />

            </View>

            <View style={{width: '100%', position: 'absolute', bottom: 0, minHeight: 85}}>

              <View style={{flexDirection: 'row', padding: 10,borderTopWidth: 2, borderColor: 'black', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 15}}>
                    Вы:
                  </Text>
                </View>

                <TextInput
                  onChangeText={(message) => setValue1(message)}
                  placeholder="Ваше сообщение..."
                  iconType="user"
                  autoCapitalize="none"
                  value={value1}
                  style={styles.inputDialog}
                />
                
              <TouchableOpacity onPress={sendMessageHandler} style={{width: '15%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Image source ={require('../../assets/sendmsg.png')} style={{    
                      width: imageWidth+5,
                      height: imageWidth+5,
                }}/>
              </TouchableOpacity>
                
              </View>

              
            </View>

          </View>
        </View>
      </Modal>























    
    
    <View style={styles.container}>
      <ScrollView >

        {showStart && (
          <DateTimePicker 
            testID='dateTimePicker'
            value={startDate}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChangeStart}
          />
        )}

        {showEnd && (
          <DateTimePicker 
            testID='dateTimePicker'
            value={endDate}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChangeEnd}
          />
        )}

        <Text style={{color:'black', alignSelf: 'center', fontSize: 18, fontWeight: 'bold', marginTop: unacceptedtermslength.length == termsData.length && termsData.length > 0 && currentUser._id === caseData.caseOwner ? 180 : 70}}>
          Cделка по объявлению: 
        </Text>

        <Text style={{color:'green', alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
          {caseData._id}
        </Text>


        <Text style={{color:'blue', alignSelf: 'center', fontSize: 18, fontWeight: 'bold',paddingBottom: 5}}>
          Показать ГОСТы по выбранному профилю
        </Text>

        <Text style={{color:'black', alignSelf: 'center', fontSize: 25, fontWeight: 'bold',paddingBottom: 5}}>
          Условия сделки
        </Text>

        <View style={{width: '95%',paddingVertical: 10 ,alignItems: 'center', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', alignSelf:'center'}}>

          <Text style={{color:'black', alignSelf: 'center', fontSize: 16, }}>
            Продумайте и согласуйте условия,
          
          </Text>
          <Text style={{color:'black', alignSelf: 'center', fontSize: 16, }}>
            
            по ним будет сформированы договор 
          </Text>
          <Text style={{color:'black', alignSelf: 'center', fontSize: 16, }}>
        
            и исполнительная документация.
          </Text>

        </View>







          <View  style={{...styles.ownerTerm, marginRight: 0, borderWidth: 1, alignSelf: 'center', borderRadius: 0,borderBottomEndRadius: 0, borderTopEndRadius: 0, width: '100%', borderLeftWidth: 0, backgroundColor: 'lightblue', marginTop: 15 }}>
            
            <Text style={{ fontSize: 16,fontWeight: '700', alignSelf: 'center',  marginLeft: 40}}>
              Срок выполнения работ: 
            </Text>

            <Text style={{ fontSize: 18,fontWeight: '700', alignSelf: 'center', marginLeft: 40, marginTop: -2}}>
              {termDays} {String(termDays).slice(-1) === '1' && 'день.'}{(String(termDays).slice(-1) == '2' || String(termDays).slice(-1) === '3' || String(termDays).slice(-1) === '4' ) && 'дня.'}{String(termDays).slice(-1) !== '1' && String(termDays).slice(-1) !== '2' && String(termDays).slice(-1) !== '3' && String(termDays).slice(-1) !== '4'  && 'дней.'}
            </Text>

            <TouchableOpacity onPress={() => {setRedactingTerm({...termsData[0],indx: 0}), showTermsEdit()}} style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5}}>

              <View style={{width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={{fontSize: 15}}>
                    Старт:
                </Text>
                <View style={{height: 30, marginLeft: 10 ,width: 100,backgroundColor: 'lightgrey', borderWidth: 1,borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16}}>
                    {termsData[0]?.mainTitle?.substring(0,10)}
                  </Text>
                </View>
                
              </View>

              <View style={{width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <Text style={{fontSize: 15}}>
                    Сдача:
                </Text>
                <View style={{height: 30, marginLeft: 10 ,width: 100,backgroundColor: 'lightgrey', borderWidth: 1,borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 16}}>
                    {termsData[0]?.title.substring(0,10)}
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
           
             
            
            
               
              <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10}}>
                
                <TouchableOpacity onPress={currentUser._id === termsData[0]?.author ? ()=> acceptOwnerHadnler(termsData[0]?._id) : ()=> acceptContractorHadnler(termsData[0]?._id)} style={{width: '45%', alignItems: 'center', justifyContent: 'center'}}>
                    
                    <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 3}}>
                      Ваше согласие
                    </Text>

                   

                    <View style={{height: 35, width: 35,backgroundColor: termsData[0]?.acceptedByContractor !== currentUser._id && termsData[0]?.acceptedByOwner !== currentUser._id ? 'red' : 'green', borderWidth: 1, borderColor: 'black', marginVertical: 5}}>

                    </View>

                </TouchableOpacity> 

                <View style={{width: '45%', alignItems: 'center'}}>
                  
                  <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 3}}>
                    {currentUser._id === termsData[0]?.author ? 'Согласие Подрядчика' :'Согласие заказчика'}
                  </Text>
                      
                 

                  <View style={{height: 35, width: 35,backgroundColor:  (termsData[0]?.author !== currentUser._id && termsData[0]?.acceptedByOwner === termsData[0]?.author || currentUser._id === termsData[0]?.author && termsData[0]?.acceptedByContractor === caseData.caseContractor) ? 'green' : 'red', borderWidth: 1, borderColor: 'black', marginVertical: 5}}>

                  </View>

                </View> 

                {termsData[0]?.acceptedByContractor === caseData.caseContractor && termsData[0]?.acceptedByOwner === caseData.caseOwner && <View style={{position: 'absolute', top: 1, bottom: -3, left: 0, right: 0, backgroundColor: '#03DB6F99', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white', borderTopColor: 'white', borderTopWidth: 1}}>
                  <View style={{width:'55%', minHeight: 55,backgroundColor: 'green', borderRadius: 5, borderWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '700', color: 'white' }}>
                      Сроки выполнения работ
                    </Text>

                    <Text style={{fontWeight: '700',fontSize: 19 , color: 'white', marginTop: -4 }}>
                      согласованы
                    </Text>

                  </View>

                </View>}

             </View>

             <View style={{position: 'absolute', height: 25, width: 100, justifyContent: 'center', alignItems: 'center', top: -11, left: 3, backgroundColor: 'lightgrey', borderWidth: 1, borderRadius: 4 }}>
                <Text >
                  Условие #1
                </Text>
             </View>

             {termsData[0]?.acceptedByContractor !== "NULL" && termsData[0]?.acceptedByOwner !== "NULL" &&
              <Image source ={require('../../assets/ok.png')} style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                position: 'absolute',
                top: -23, 
                right: 50,
                borderWidth: 1,
                borderColor: 'black'       
              }}/>
            }

            </View>


            <View  style={{...styles.ownerTerm, marginRight: 0, borderWidth: 1, alignSelf: 'center', borderRadius: 0,borderBottomEndRadius: 0, borderTopEndRadius: 0, width: '100%', borderLeftWidth: 0, backgroundColor: 'lightblue', marginTop: 15 }}>
            
            <Text style={{ fontSize: 16,fontWeight: '700', alignSelf: 'center', marginBottom: 5, marginLeft: 20}}>
              Залоговые обязательства
            </Text>

            <TouchableOpacity onPress={() => {setRedactingTerm({...termsData[1],indx: 1}), showPledgeEdit()}} style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 7}}>

              <View style={{width: '45%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 15, alignSelf: 'center'}}>
                      Залог 
                  </Text>
                  <Text style={{fontSize: 15}}>
                      заказчика:
                  </Text>
                </View>

                <View style={{height: 40, marginLeft: 10 ,width: 100,backgroundColor: 'lightgreen', borderWidth: 1,borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>
                    {NormalizeNumHook(termsData[1].mainTitle)} р.
                  </Text>
                </View>
                
              </View>

              <View style={{width: '50%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <View>
                  <Text style={{fontSize: 15, alignSelf: 'center'}}>
                      Залог 
                  </Text>
                  <Text style={{fontSize: 15}}>
                      подрядчика:
                  </Text>
                </View>
                
                <View style={{height: 40, marginLeft: 10 ,width: 100,backgroundColor: 'lightgreen', borderWidth: 1,borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 18}}>
                  {NormalizeNumHook(termsData[1].title)} р.
                  </Text>
                </View>
              </View>

            </TouchableOpacity>
           
             
            
            
               
              <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10}}>
                
                <TouchableOpacity onPress={currentUser._id === termsData[1].author ? ()=> acceptOwnerHadnler(termsData[1]._id) : ()=> acceptContractorHadnler(termsData[1]._id)} style={{width: '45%', alignItems: 'center', justifyContent: 'center'}}>
                    
                    <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 3}}>
                      Ваше согласие
                    </Text>

                   

                    <View style={{height: 35, width: 35,backgroundColor: termsData[1].acceptedByContractor !== currentUser._id && termsData[1].acceptedByOwner !== currentUser._id ? 'red' : 'green', borderWidth: 1, borderColor: 'black', marginVertical: 5}}>

                    </View>

                </TouchableOpacity> 

                {currentUser._id === termsData[1].author && <View style={{width: '45%', alignItems: 'center'}}>
                  
                  <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 3}}>
                    Согласие Подрядчика
                  </Text>
                      
                 

                  <View style={{height: 35, width: 35,backgroundColor:  termsData[1].acceptedByContractor === caseData.caseContractor ? 'green' : 'red', borderWidth: 1, borderColor: 'black', marginVertical: 5}}>

                  </View>

                </View>}

                {currentUser._id !== termsData[1].author && <View style={{width: '45%', alignItems: 'center'}}>
                  
                  <Text style={{fontSize: 16, fontWeight: '700', marginVertical: 3}}>
                    Согласие заказчика
                  </Text>
                      
                 

                  <View style={{height: 35, width: 35,backgroundColor:  termsData[1].acceptedByOwner === termsData[1].author ? 'green' : 'red', borderWidth: 1, borderColor: 'black', marginVertical: 5}}>

                  </View>

                </View>}

                {termsData[1].acceptedByContractor === caseData.caseContractor && termsData[1].acceptedByOwner === caseData.caseOwner && <View style={{position: 'absolute', top: -3, bottom: -3, left: 0, right: 0, backgroundColor: '#03DB6F99', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: 'white', borderTopColor: 'white', borderTopWidth: 1}}>
                  <View style={{width:'55%', minHeight: 55,backgroundColor: 'green', borderRadius: 5, borderWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontWeight: '700', color: 'white' }}>
                      Залоговые обязательства
                    </Text>

                    <Text style={{fontWeight: '700',fontSize: 19 , color: 'white', marginTop: -4 }}>
                      согласованы
                    </Text>

                  </View>

                </View>}

             </View>

             <View style={{position: 'absolute', height: 25, width: 100, justifyContent: 'center', alignItems: 'center', top: -11, left: 3, backgroundColor: 'lightgrey', borderWidth: 1, borderRadius: 4 }}>
                <Text>
                  Условие #2
                </Text>
             </View>

             {termsData[1].acceptedByContractor !== "NULL" && termsData[1].acceptedByOwner !== "NULL" &&
              <Image source ={require('../../assets/ok.png')} style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                position: 'absolute',
                top: -23, 
                right: 50,
                borderWidth: 1,
                borderColor: 'black'       
              }}/>
            }


            </View>
             
          
          
           



        { termsData.slice(2).map((term, index)=>
        
          <View key = {term._id} style={term.author === currentUser._id ? styles.ownerTerm : styles.opponentTerm }>
            
            <View style={{width:'100%', flexDirection: 'row',  alignItems:'center', height: 60}}>
               
                <View style={{width:'11%', alignItems: 'center', justifyContent: 'center', top: 15}}> 
                  <TouchableOpacity onPress={() => {setDeletingTerm({...term,indx: index+2}), showDeleteTerm()}} style={{marginTop: 6, backgroundColor: 'white', paddingVertical: 3, borderRadius: 5}}>
                    <Image source ={require('../../assets/trashcan.png')} style={{
                                              width: windowWidth*0.07,
                                              height: windowWidth*0.07,
                                              borderRadius: 3,         
                    }}/>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => {setRedactingTerm({...term,indx: index+2}), showTermEdit()}} style={{marginTop: 6, backgroundColor: 'white', paddingVertical: 3, borderRadius: 5}}>
                    <Image source ={require('../../assets/redact.png')} style={{
                                                width: windowWidth*0.07,
                                                height: windowWidth*0.07,
                                                borderRadius: 3,         
                      }}/>
                  </TouchableOpacity>

                </View>
              

              <View style={{width: '39%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 16, fontWeight: '700', alignContent: 'center', marginTop: term.author === currentUser._id ? 0 : 7}}>
                  {term.author === currentUser._id ? 'ВАШЕ УСЛОВИЕ' : '  УСЛОВИЕ ОППОНЕНТА'}
                </Text>
                
                <Text style={{ fontSize: 15,fontWeight: '600', marginLeft: 7}}>
                  Условие #{index + 3}
                </Text>
              </View>

              <View style={{width:'50%', alignItems: 'center', justifyContent: 'center'}}>

              {term.author === currentUser._id 
              
              ?
              <View>
                {term.acceptedByOwner === "NULL" && caseData.caseOwner !== currentUser._id && term.acceptedByContractor === currentUser._id &&
                  <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',}}>
                
                  <View>
                    <Text style={{alignSelf: 'center', fontSize: 16, fontWeight:'600'}}>
                      Согласие
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight:'600'}}>
                      Заказчика:
                    </Text>
                  </View>

                  <View style={{height: 40, width: 40,backgroundColor: 'red', borderWidth: 2, borderColor: 'black'}}>

                  </View> 

             </View>}

                {term.acceptedByContractor === "NULL" && caseData.caseOwner === currentUser._id && term.acceptedByOwner === currentUser._id &&
                  <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                  <View>
                    <Text style={{alignSelf: 'center', fontSize: 16}}>
                      Согласие
                    </Text>
                    <Text style={{ fontSize: 16}}>
                      Подрядчика :
                    </Text>
                  </View>

                  <View style={{height: 40, width: 40,backgroundColor: 'red', borderWidth: 2, borderColor: 'black'}}>

                  </View>
                

             </View>}

             {caseData.caseOwner !== currentUser._id  && term.acceptedByContractor === "NULL" &&

                <TouchableOpacity onPress={()=> acceptContractorHadnler(term._id)} style={{width: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center',backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40, paddingHorizontal: 10}}>
                  <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                    Дать согласие
                  </Text>
                </TouchableOpacity> 
                }

            {caseData.caseOwner === currentUser._id  && term.acceptedByOwner === "NULL" &&

              <TouchableOpacity onPress={()=> acceptOwnerHadnler(term._id)} style={{width: '100%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center',backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40, paddingHorizontal: 10}}>
                <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                  Дать согласие
                </Text>
              </TouchableOpacity> 
              }

               {term.acceptedByOwner !== "NULL" && term.acceptedByContractor !== "NULL" && 
               
               <View style={{width: '100%', alignItems: 'center'}}>
               <View style={{paddingHorizontal: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40}}>
                 <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                   Согласовано
                 </Text>
               </View>
             </View>
                }

             </View>
             
            
              :

            <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 10}}>
              {caseData.caseOwner !== currentUser._id  && term.acceptedByOwner === "NULL" && term.acceptedByContractor === currentUser._id &&
                <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                <View>
                  <Text style={{alignSelf: 'center', fontSize: 16}}>
                    Согласие
                  </Text>
                  <Text style={{ fontSize: 16}}>
                    Заказчикаа :
                  </Text>
                </View>

                <View style={{height: 40, width: 40,backgroundColor: 'red', borderWidth: 2, borderColor: 'black'}}>

                </View>
                
              </View>
              

           }

           {caseData.caseOwner === currentUser._id  && term.acceptedByOwner === currentUser._id && term.acceptedByContractor === "NULL" &&
              
              <View style={{minHeight: 50, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                
                <View>
                  <Text style={{alignSelf: 'center', fontSize: 16}}>
                    Согласие
                  </Text>
                  <Text style={{ fontSize: 16}}>
                    Подрядчика :
                  </Text>
                </View>

                <View style={{height: 40, width: 40,backgroundColor: 'red', borderWidth: 2, borderColor: 'black'}}>

                </View>

              </View>

            }

                {caseData.caseOwner !== currentUser._id  && term.acceptedByContractor === "NULL" &&

                <TouchableOpacity onPress={()=> acceptContractorHadnler(term._id)} style={{width: '75%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center',backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40}}>
                  <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                    Дать согласие
                  </Text>
                </TouchableOpacity> 
                }

                {caseData.caseOwner === currentUser._id  && term.acceptedByOwner === "NULL" &&

                  <TouchableOpacity onPress={()=> acceptOwnerHadnler(term._id)} style={{width: '75%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center',backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40}}>
                    <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                      Дать согласие
                    </Text>
                  </TouchableOpacity> 
                }

                {term.acceptedByOwner !== "NULL" && term.acceptedByContractor !== "NULL" && 
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <View style={{width: '75%', alignItems: 'center', justifyContent: 'center', marginTop: 10,backgroundColor: 'green', borderRadius: 5,borderWidth: 1, minHeight: 40}}>
                      <Text style={{fontSize: 17, fontWeight: '600', color: 'white'}}>
                        Согласовано
                      </Text>
                    </View>
                  </View>
                }

             </View>
             }

              </View>

            </View>

            <Text style={{alignSelf: 'center', fontSize: 17, fontWeight: '700',marginBottom: 5}}>
              Содержание условия:
            </Text>

            <View style={{width: '90%', minHeight: 100, borderRadius: 5, borderWidth: 1, alignSelf: 'center', backgroundColor: 'white', marginBottom: 11}}>
              <Text style={{ margin: 5 }} >
                {term.title}
              </Text>
            </View>
            
            
             
            

            
          
            
            {term.acceptedByContractor !== "NULL" && term.acceptedByOwner !== "NULL" &&
              <Image source ={require('../../assets/ok.png')} style={{
                width: 45,
                height: 45,
                borderRadius: 30,
                position: 'absolute',
                top: -23, 
                right: 50,
                borderWidth: 1,
                borderColor: 'black'       
              }}/>
            }
          
            
          </View>
        )}

        <View style={{width: '100%', marginBottom: 10, marginTop: 10, paddingVertical: 10,}}>
          
          <TouchableOpacity onPress={showModalAccepted} style={{width: '70%',  height: 50, alignItems: 'center', justifyContent:'center', flexDirection: 'row', backgroundColor: 'lightgrey', borderRadius: 10, borderWidth: 1, alignSelf: 'center'}}>
            <Text style={{fontSize: 25}}>
              +
            </Text>

            <Text style={{fontSize: 20, marginLeft: 20}}>
              Добавить условие
            </Text>
          </TouchableOpacity>
          
          
          


        </View>








    
      </ScrollView>

      <View style={{position: 'absolute', top: 15, right: 27, height: 50, width: '55%',backgroundColor: unacceptedtermslength.length == termsData.length && termsData.length > 0  ? 'green' : '#B70526',borderRadius: 10, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems:'center'}}>
             <View style={{width:'50%', alignItems:'center'}}>

              <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
                Согласовано
              </Text>

              <Text style={{fontSize: 15, fontWeight: '700', color: 'white'}}>
                условий:
              </Text>

             </View>
             <View style={{width:'50%', alignItems:'center'}}>

               <Text style={{fontSize: 30, fontWeight: '600', color: 'white'}}>
                {unacceptedtermslength.length}/{termsData.length}
               </Text>

             </View>

      </View>

      {unacceptedtermslength.length == termsData.length && termsData.length > 0 && currentUser._id === caseData.caseOwner && <View style={{position: 'absolute', height: 110,borderStyle: 'dashed', width: '100%',backgroundColor: 'white', borderWidth: 1, justifyContent: 'space-around', alignItems:'center', top: 70}}>
             

              <Text style={{fontSize: 18, fontWeight: '700', color: 'black', alignSelf: 'center'}}>
                Все условия согласованы!
              </Text>


            {caseData.depositCustomer == termsData[1].title ? 
              
             <TouchableOpacity onPress={registerCaseHandler} style={{width:'80%', alignItems:'center', backgroundColor: 'green', paddingVertical: 5}}>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 Заключить договор и
               </Text>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 приступить к выполнению
               </Text>

             </TouchableOpacity>
            
            :
              
            <View  style={{width:'80%', alignItems:'center', backgroundColor: 'green', paddingVertical: 5}}>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 Ожидаем пока подрядчик
               </Text>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 внесет залог
               </Text>

             </View>

            }

      </View>}

      {termsData[1].title != caseData.depositCustomer && unacceptedtermslength.length == termsData.length && termsData.length > 0 && currentUser._id !== caseData.caseOwner && <View style={{position: 'absolute', height: 100,borderStyle: 'dashed', width: '100%',backgroundColor: 'white', borderWidth: 1, justifyContent: 'space-around', alignItems:'center', top: 70}}>
             

              <Text style={{fontSize: 18, fontWeight: '700', color: 'black', alignSelf: 'center'}}>
                Все условия согласованы!
              </Text>

              
             <TouchableOpacity onPress={payDepositCusHandler} style={{width:'80%', alignItems:'center', backgroundColor: 'green', paddingVertical: 5}}>

               <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>
                 Оплатите 
               </Text>

               <Text style={{fontSize: 17, fontWeight: '700', color: 'white'}}>
                 залоговую сумму!
               </Text>

             </TouchableOpacity>

      </View>}


      {termsData[1].title == caseData.depositCustomer && unacceptedtermslength.length == termsData.length && termsData.length > 0 && currentUser._id !== caseData.caseOwner && <View style={{position: 'absolute', height: 100,borderStyle: 'dashed', width: '100%',backgroundColor: 'white', borderWidth: 1, justifyContent: 'space-around', alignItems:'center', top: 70}}>
             

              <Text style={{fontSize: 18, fontWeight: '700', color: 'black', alignSelf: 'center'}}>
                Все условия согласованы!
              </Text>

              
             <View  style={{width:'80%', alignItems:'center', backgroundColor: 'green', paddingVertical: 5}}>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 Ожидаем старта
               </Text>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'white'}}>
                 от заказчика
               </Text>

             </View>

      </View>}


    </View>













    {currentUser._id === caseData.caseOwner && 
        <View style={styles.opponentPhoto}>
        
          <View style={styles.opponentPhotoBot}>
            <Image source ={{uri: caseData.caseContractorAvatar}} style={{
                                      width: 116,
                                      height: 116,
                                      borderRadius: 5,                                
                                      borderWidth: 1,
                                      borderColor: 'black',
            }}/>
          </View>

          <Text style={{color:'black', left: '33%',top: 3, position: 'absolute', fontSize: 15, fontWeight: '600'}}>
           
              Подрядчик:
            
          </Text>

          <Text style={{color:'black', left: '33%',top: 23, position: 'absolute', fontSize: 17, fontWeight: '700', color: 'blue'}}>
           
              {caseData.caseContractorUserName}
            
          </Text>

          <View style={{borderWidth: 1, borderColor: 'black',backgroundColor:'white',alignItems: 'center', justifyContent: 'center', right: 8,top: 8, position: 'absolute'}}>
            <Text style={{paddingHorizontal: 13}}>
              Профиль
            </Text>
          </View>

          <TouchableOpacity onPress={showDialogModal} style={{borderWidth: 2, borderColor: 'black',backgroundColor:'white',alignItems: 'center', justifyContent: 'center', left: '34%',top: 48, position: 'absolute',width: '64%'}}>

            <Text style={{fontSize: 17, fontWeight: 'bold',paddingVertical:3}}>
              Открыть диалог
            </Text>

            {unseenmsg?.length > 0 && 
              <View style={{position:'absolute',height: 30, width: 30, borderRadius: 13, backgroundColor: 'red', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', top: -12, right: 15}}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {unseenmsg?.length}  
                </Text>
              </View>
            }

          </TouchableOpacity>

        </View>}     
      
        {currentUser._id === caseData.caseContractor && 
        <View style={styles.opponentPhoto}>
        
          <View style={styles.opponentPhotoBot}>
            <Image source ={{uri: caseData.caseOwnerAvatar}} style={{
                                      width: 116,
                                      height: 116,
                                      borderRadius: 5,                                
                                      borderWidth: 1,
                                      borderColor: 'black',
            }}/>
          </View>

          <Text style={{color:'black', left: '33%',top: 3, position: 'absolute', fontSize: 17, fontWeight: '600'}}>
           
              Заказчик:
            
          </Text>

          <Text style={{color:'black', left: '33%',top: 23, position: 'absolute', fontSize: 17, fontWeight: '700', color: 'blue'}}>
           
              {caseData.caseOwnerUserName}
            
          </Text>

          <View style={{borderWidth: 1, borderColor: 'black',backgroundColor:'white',alignItems: 'center', justifyContent: 'center', right: 4,top: 3, position: 'absolute'}}>
            <Text style={{paddingHorizontal: 13}}>
              Профиль
            </Text>
          </View>

          <TouchableOpacity onPress={showDialogModal} style={{borderWidth: 2, borderColor: 'black',backgroundColor:'white',alignItems: 'center', justifyContent: 'center', left: '34%',top: 48, position: 'absolute',width: '64%'}}>

            <Text style={{fontSize: 17, fontWeight: 'bold',paddingVertical:3}}>
              Открыть диалог 
            </Text>

            {unseenmsg?.length > 0 && 
              <View style={{position:'absolute',height: 30, width: 30, borderRadius: 15, backgroundColor: 'red', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', top: -15, right: 15}}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {unseenmsg?.length}  
                </Text>
              </View>
            }

          </TouchableOpacity>

        </View>}




























        <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
        </View>  

        {/* <TouchableOpacity onPress={sendMsg} style={{width: 50, height: 50, position:'absolute', bottom: 90, left: 2, backgroundColor: 'lightgrey', alignItems:'center', justifyContent: 'center', borderWidth: 1, borderRadius: 25}}>
            <Text style={{fontSize: 25, fontWeight: '700'}}>
                R
            </Text>
        </TouchableOpacity> */}

        
    </View>
  )
}



const styles = StyleSheet.create({
  opponentPhoto:{
    position: 'absolute',
    flex:1,
    backgroundColor: 'lightgrey',
    top:headerHeight,
    left: 0,
    right: 0,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'black',
    
  },
  opponentPhotoBot:{
    backgroundColor: 'white',
    width: 116,
    height: 116,
    top: "7%",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 7,
    
  },
yourPhoto:{
  position: 'absolute',
  flex:1,
  backgroundColor: '#31383e',
  bottom:0,
  left: 0,
  right: 0,
  height: 80,
  flexDirection: 'row',
  alignItems: 'center',
  borderTopWidth: 5,
  borderColor: 'black',
  
},
yourPhotoBot:{
  position: 'absolute',
  backgroundColor: 'white',
  width: 116,
  height: 116,
  bottom: "7%",
  borderRadius: 5,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  right: 7,
  marginLeft: 7
  
},
input: {
  width: 350,
  margin: 10,
  padding: 8,
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  flex:1
},
container: {
  marginTop: 80+headerHeight,
  marginBottom: 80,
  backgroundColor: 'white',
  alignItems: 'center',
},
avansCont:{
  backgroundColor: '#006b76', 
  width: "47%",
  alignItems: 'center',
  justifyContent: 'center', 
  minHeight: 60, 
  borderRadius: 3, 
  margin: 5, 
  borderRadius: 3,
  alignSelf: 'flex-start'
},
smetaCont:{
  backgroundColor: 'white',
  borderWidth: 3,
  borderColor: 'black',
  width: "47%",
  alignItems: 'center',
  minHeight: 60, 
  borderRadius: 3, 
  margin: 5, 
  borderRadius: 3,
  alignSelf: 'flex-start',
  flexDirection: 'row'
},
priceCont:{
  backgroundColor: '#006b76', 
  width: "47%",
  alignItems: 'center',
  justifyContent: 'center', 
  minHeight: 60, 
  borderRadius: 3, 
  margin: 5, 
  borderRadius: 3,
  alignSelf: 'flex-end'

},
inputPrice: {
  width: "90%",
  margin: 10,
  padding: 8,
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  flex:1,
},
 logo:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#006b76',
  borderRadius: 3,
  height: '10%',
  width: '97%'
 },
 modalOne:{
  flex: 1,
  alignItems:'center',
  justifyContent: 'center',
  backgroundColor: '#00000099'
 },
 cam:{
  width: '50%',
  alignItems:'center',
  justifyContent: 'center',
  flexDirection: 'column'
  
 },
 gal:{
  width: '50%',
  alignItems:'center',
  justifyContent: 'center',
  flexDirection: 'column'
 ,
},
yourPhotoBack: {
  position: 'absolute',
  backgroundColor: 'white',
  width: 64,
  height: 64,
  bottom: "7%",
  borderRadius: 5,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  left: 3,
},
yourPhotoCall:{
  position: 'absolute',
  backgroundColor: 'white',
  width: 64,
  height: 64,
  bottom: "7%",
  borderRadius: 5,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  left: '18%',
},
inputNew: {
  width: '90%',
  margin: 7,
  padding: 5,
  color: 'black',
  fontSize: 18,
  fontWeight: 'bold',
  borderBottomWidth: 1,
  flex:1
},
modalInner:{
  flexDirection: 'column',
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 10,
  width: '90%',
  paddingVertical: 30
 },
 waiting:{
  backgroundColor: 'white',
  width: 116,
  height: 116,
  borderRadius: 80,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf:'center',
  marginTop: "3%"
},
deni:{
  backgroundColor: 'red',
  minHeight: 40,
  borderRadius: 5,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf:'center',
  marginTop: "7%",
  borderColor: 'black'
},
modalInnerDialog:{
  height: '95%',
  flexDirection: 'column',
  backgroundColor: 'white',
  margin: 10,
  borderRadius: 10,
  width: '95%'
 },
 inputDialog: {
   width: '70%',
   borderBottomWidth: 1,
   padding: 10
   
 },
 deniButton:{
  height: 45, 
  width: 5, 
  backgroundColor: 'white',
  position: 'absolute',
  borderRadius: 10
 },
 ownerTerm: {
  width: '90%',
  minHeight: 40, 
  backgroundColor: '#E0C2F5', 
  left: 0,
  marginRight:'10%',
  marginTop: 15, 
  borderBottomEndRadius: 10,
  borderTopEndRadius: 10,
  borderWidth: 1 
 },
 opponentTerm: {
  width: '90%',
  minHeight: 40, 
  backgroundColor: 'lightblue' ,
  left: '10%',
  marginTop: 15, 
  borderBottomStartRadius: 10,
  borderTopStartRadius: 10,
  borderWidth: 1,
 },
 messageStyle: {
  flexDirection: 'row',
  backgroundColor: 'lightblue',
  borderTopEndRadius: 5,
  borderBottomEndRadius: 5, 
  borderTopWidth: 1, 
  borderRightWidth: 1,
  borderBottomWidth: 1, 
  marginTop: 15, 
  width:'90%', 
  marginRight: '10%', 
  padding: 10,
  paddingLeft: 5
 },
 messageStyleOpponent:{
  flexDirection: 'row-reverse',  
  backgroundColor: 'lightgrey', 
  borderTopStartRadius: 5,
  borderBottomStartRadius: 5, 
  borderTopWidth: 1, 
  borderLeftWidth: 1,
  borderBottomWidth: 1,
  marginTop: 10, 
  width:'90%', 
  marginRight: '10%', 
  alignItems: 'center',
  paddingLeft: 5,
  padding: 10,
 }
 

 
})
