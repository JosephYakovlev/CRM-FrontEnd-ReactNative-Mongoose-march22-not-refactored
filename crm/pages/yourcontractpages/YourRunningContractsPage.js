import axios from 'axios'
import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image, ScrollView, SafeAreaView, Modal, FlatList } from 'react-native'
import {Context as AuthContext} from '../../../../context/AuthContext';
import { TicketHat } from '../../../components/tickets/TicketHat';
import ProfileBar from '../../../components/profilebar/ProfileBar';
import { TicketsFetch } from '../../components/TicketsFetch';
import CRMProfileBar from '../../components/CRMContractTypesBar';
import CRMContractTypesBar from '../../components/CRMContractTypesBar';
import CRMCategoriesBar from '../../components/CRMCategoriesBar';
import BuilderDefenseBar from '../../components/BuilderDefenseBar';
import CRMWalletBar from '../../components/CRMWalletBar';
import { TicketCRMCard } from '../../fetchedcards/TicketCRMCard';
import { ConcludingCard } from '../../fetchedcards/ConcludingCard';
import { ActiveContractCard } from '../../fetchedcards/ActiveConractCard';
import { FinConCard } from '../../fetchedcards/FinConCard';
import { getStatusBarHeight } from 'react-native-status-bar-height'


const windowWidth = Dimensions.get('window').width;

export default function YourRunningContractsPage({navigation}) {

    const headerHeight = getStatusBarHeight()
    console.log("HEADERHEIFGTH")
    console.log(headerHeight)
    const {state} = useContext(AuthContext)
    const currentUser = state.user.user.userDump
    
    const [section, setSection] = useState('В процессе')

    const [conContracts, setConContracts] = useState(currentUser.concludingContracts)
    const [runContracts, setRunContracts] = useState([])
    const [tickets, setTickets] = useState([])
    const [finContracts, setFinContracts] = useState([])



    const [showModalAddWorkers, setShowModalAddWorkers] = useState(false)

    const showModAddWorkers = () =>{
        setShowModalAddWorkers(true)
      }
  
    const hideModAddWorkers = () => {
        setShowModalAddWorkers(false)
    }

    const [showModalLoading, setShowModalLoading] = useState(false)

    const showModLoading = () =>{
        setShowModalLoading(true)
      }
  
    const hideModLoading = () => {
        setShowModalLoading(false)
    }

    const routeRequestBrigadePage = () =>{
        navigation.navigate('RequestBrigadePage')
    }

    const routeRegisterTicketPage = () =>{
        navigation.navigate('RegisterTicketPage')
    }

    const routeMainPage = () =>{
        navigation.navigate('Main')
    }

    const routeYourOutgoingContractsPage = () =>{
        navigation.navigate('YourOutgoingContractsPage')
    }

    const routeYourRunningContractsPage = () =>{
        navigation.navigate('YourRunningContractsPage')
    }


    const routeBuildingObjectsPage = () =>{
        navigation.navigate('BuildingObjectsPage')
    }

    const routeYourBrigadesPeoplePage = () =>{
        navigation.navigate('YourBrigadesPeoplePage')
    }


    const fetchActive = async () => {
        try {
            setShowModalLoading(true)
            
            const response = await axios.get(`http://62.113.97.220:8800/api/users/getactivecontracts/${currentUser._id}`)
          
                .then(response => {
                   
                    setRunContracts(response.data)
                    setSection('Активные')
                    setShowModalLoading(false)
                }
                    
                )

            }  catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }


        const fetchTickets = async () => {
            try {
                setShowModalLoading(true)
                
                const response = await axios.get(`http://62.113.97.220:8800/api/users/gettickets/${currentUser._id}`)
              
                    .then(response => {
                       
                        setTickets(response.data)
                        setSection('Ваши')
                        setShowModalLoading(false)
                    }
                        
                    )
    
                }  catch (error) {
                    console.log("Keychain couldn't be accessed!", error);
                }
            }


        const fetchClosed = async () => {
                try {
                    setShowModalLoading(true)
                    
                    const response = await axios.get(`http://62.113.97.220:8800/api/users/getclosedcontracts/${currentUser._id}`)
                  
                        .then(response => {
                           
                            setFinContracts(response.data)
                            setSection('Завершенные')
                            setShowModalLoading(false)
                        }
                            
                        )
        
                    }  catch (error) {
                        console.log("Keychain couldn't be accessed!", error);
                    }
                }



    const fetchCC = async () => {
        try {
            setShowModalLoading(true)
            
            const response = await axios.get(`http://62.113.97.220:8800/api/users/getconclcontracts/${currentUser._id}`)
          
                .then(response => {
                   
                    setConContracts(response.data)
                    setSection('В процессе')
                    setShowModalLoading(false)
                }
                    
                )

            }  catch (error) {
                console.log("Keychain couldn't be accessed!", error);
            }
        }
        


    return (
        <View style={styles.container}>




    

<Modal 
        visible={showModalLoading}  
        transparent
        onRequestClose = {()=>
          setShowModalLoading(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModLoading}>
          <View style={{...styles.modalInnerAddWorkers, alignItems: 'center', justifyContent: 'center', height: 200}}>
              <Text style={{fontSize: 25, fontWeight: '500'}}>
                  Загрузка...
              </Text>
         

          </View>
        </TouchableOpacity>
    </Modal>










    <Modal 
        visible={showModalAddWorkers}  
        transparent
        onRequestClose = {()=>
          setShowModalAddWorkers(false)
        }
        hardwareAccelerated
        animationType='none'

      >
        <TouchableOpacity style={styles.modalOne} onPress = {hideModAddWorkers}>
          <View style={styles.modalInnerAddWorkers}>
          <View style={{alignItems: 'center', justifyContent: 'center', padding: 5}}>
            <Text style={{fontWeight: 'bold', fontSize: 25}}>
              Добавить бригаду
            </Text>
          </View>

            <View style={{width:'90%',margin:'5%',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500'}}>
                        Штат
                    </Text>
                    <Image source ={require('../../../../assets/crm/icons/shtat.jpg')} style={{
                                        width: '67%',
                                        height: 113,
                                        borderRadius: 5,         
                }}/>
                </View>
                <View style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                    <Text style={{fontSize:18,fontWeight:'500'}}>
                        Поиск ~15км
                    </Text>
                    <Image source ={require('../../../../assets/crm/icons/map.jpg')} style={{
                                        width: '70%',
                                        height: 113,
                                        borderRadius: 5,         
                    }}/>
                </View>
            </View>

            <TouchableOpacity onPress={routeRequestBrigadePage} style={{alignSelf: 'center', backgroundColor: 'lightgrey', height: 40, width: '80%', borderWidth: 1, borderRadius: 5, alignItems:'center', justifyContent: 'center'}}>
                <View>
                    <Text style={{fontSize: 20}}>
                        Отправить приглашение
                    </Text>
                </View>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
    </Modal>

    


        {section === "Ваши" &&
            <View style={{width: '96%', alignSelf: 'center',marginTop: 240+headerHeight, marginBottom: 90}}>
                    <FlatList
                        data = {tickets}
                        keyExtractor = {(item) => item._id}
                        renderItem = { ({ item }) => (    
                            <TicketCRMCard ticket={item} navigation = {navigation} />
                        )}
                    /> 
                </View>
        }

        {section === "Активные" && 
            <View style={{width: '96%', alignSelf: 'center',marginTop: 240+headerHeight, marginBottom: 90}}>
                    <FlatList
                        data = {runContracts}
                        keyExtractor = {(item) => item._id}
                        renderItem = { ({ item }) => (    
                            <ActiveContractCard ticket={item} navigation = {navigation} />
                        )}
                    /> 
            </View>
        }

        


        {section === "Завершенные" && 
            <View style={{width: '96%', alignSelf: 'center',marginTop: 240+headerHeight, marginBottom: 90}}>
                    <FlatList
                        data = {finContracts}
                        keyExtractor = {(item) => item._id}
                        renderItem = { ({ item }) => (              
                            <FinConCard ticket={item} navigation = {navigation} />
                        )}
                    /> 
            </View>
        }

        {section === "В процессе" && 
            <View style={{width: '96%', alignSelf: 'center',marginTop: 240+headerHeight, marginBottom: 90}}>
                    {conContracts.length > 0 ? <FlatList
                        data = {conContracts}
                        keyExtractor = {(item) => item._id}
                        renderItem = { ({ item }) => (              
                            <ConcludingCard ticket={item} navigation = {navigation} />
                        )}
                    /> 
                        :
                    <View style={{width: '100%', minHeight: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}> 
                        <Text style={{fontSize:22}}>
                            ПОКА НЕТ НИЧЕ
                        </Text>
                    </View>
                    
                    }
            </View>
        }




           









    

    <View style={{position:'absolute',top: headerHeight }}>
        <BuilderDefenseBar />
        <CRMCategoriesBar category = 'running' />
        <CRMWalletBar />

                
        <View style={styles.ProfileBar}>
            <ScrollView  horizontal={true}  style={{flexDirection: 'row', width:'100%', alignSelf: 'center'}}>

                <TouchableOpacity onPress={fetchActive} style={{width: windowWidth/2, backgroundColor: section === 'Активные' ? 'lightgreen' : 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>
                        Активные
                    </Text>

                    <Text style={{fontSize:22, position: 'absolute', right: 5, top: 8}}>
                        {currentUser.runningContracts.length}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={fetchCC} style={{width: windowWidth/2, backgroundColor: section === 'В процессе' ? 'lightgreen' : 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16}}>
                        В процессе
                    </Text>
                    <Text style={{fontSize: 16}}>
                        заключения
                    </Text>

                    <Text style={{fontSize:22, position: 'absolute', right: 5, top: 8}}>
                        {currentUser.concludingContracts.length}
                    </Text>

                </TouchableOpacity>

            </ScrollView>
        </View>


        <View style={{...styles.ProfileBar, borderTopWidth: 1, borderBottomWidth: 2}}>
            <ScrollView  horizontal={true}  style={{flexDirection: 'row', width:'100%', alignSelf: 'center'}}>

                <TouchableOpacity onPress={fetchTickets} style={{width: windowWidth/2, backgroundColor: section === 'Ваши' ? 'lightgreen' : 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 16}}>
                        Ваши
                    </Text>
                    <Text style={{fontSize: 16}}>
                        объявления
                    </Text>

                    <Text style={{fontSize:22, position: 'absolute', right: 5, top: 8}}>
                        {currentUser.tickets.length}
                    </Text>

                </TouchableOpacity>


                

                <TouchableOpacity onPress={fetchClosed} style={{width: windowWidth/2, backgroundColor: section === 'Завершенные' ? 'lightgreen' : 'lightgrey', borderLeftWidth:0, borderRightWidth:1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 18}}>
                        Завершенные
                    </Text>
                    
                    <Text style={{fontSize:22, position: 'absolute', right: 5, top: 8}}>
                        {currentUser.finishedContracts.length}
                    </Text>

                </TouchableOpacity>


            </ScrollView>
        </View>



    </View>


    <View style={{position:'absolute',bottom: 20 }}>
        <ProfileBar />
    </View>

        
</View> 

)}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        marginTop: 20
    },
    profilebar: {
        position: 'absolute',
        width: '100%',
        top: 245,
        bottom: 0
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'80%',
        borderWidth: 1,
        borderRadius: 10,
        height: 60,
        backgroundColor: 'lightgrey',
    },
    categoryBarPart:{
        width:'33%', 
        alignItems:'center', 
        justifyContent: 'center', 
        backgroundColor: 'lightblue', 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1
    },
    modalInnerAddWorkers:{
        width: '90%',
        height: 500,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
     },
    modalOne:{
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#00000099'
    },
    ProfileBar:{
        backgroundColor: 'white',
        height: 50,
        width: windowWidth,
        borderColor: '#31383e',
        borderTopWidth: 2,
        borderBottomWidth: 1
        
    },
});

