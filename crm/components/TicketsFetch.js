import axios from 'axios'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList , ScrollView, SafeAreaView, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAsyncAbortable, useAsync} from 'react-async-hook';
import {Context as AuthContext} from '../../../context/AuthContext';
import { TicketCRMCard } from '../fetchedcards/TicketCRMCard';
import { ObjectsFetch } from './ObjectsFetch';
import { setStatusBarTranslucent } from 'expo-status-bar';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const TicketsFetch = () => {

  const [showModalAddWorkers, setShowModalAddWorkers] = useState(false)

    const showModAddWorkers = () =>{
        setShowModalAddWorkers(true)
      }
  
    const hideModAddWorkers = () => {
        setShowModalAddWorkers(false)
    }
  
  const {state} = useContext(AuthContext)

  const navigation = useNavigation();

  const [tickets, setTickets] = useState([])

  const [ticketsIncomed,setTicketsIncomed] = useState('No')
  

    const routeRegisterTicketPage = () =>{
        navigation.navigate('RegisterTicketPage')
    }

    const routeConnectToProcessPage = () =>{
      navigation.navigate('ConnectToProcessPage')
    }

    const routeMainPage = () =>{
      navigation.navigate('Main')
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, [])

    const form = {
        email: `${state.user.user.userDump.email}`
    }

    function refreshPage() {
      window.location.reload(false);
    }
   

    const useEffect = (()=> {
        navigation.addListener('focus', 
          async function fetchData() {
              try {
                  const response = await axios.post("http://62.113.97.220:8800/api/auth/check",(form))
                  
                  .then(async (response)=> {
                    const ticketsD = response.data.user.tickets
                    
                    const tickets = await Promise.all(ticketsD.map(async (i) => {
                        const ticket = await (await fetch(`http://62.113.97.220:8800/api/ticket/getTicketById/${i}`)).json();
                        return i=ticket ;
                      }))
                      if(tickets.length > 0 ){
                      setTickets(tickets)
                      setTicketsIncomed('Yes')
                      }
                      onRefresh()
                      
                      
                  })
              } catch (e) {}
      })
    })

    const renderCount = useRef(1)
      useEffect(() => {
        renderCount.current++
      },[tickets])
 

  return (
    <View style={styles.container}>

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
                  <TouchableOpacity style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:18,fontWeight:'500'}}>
                          Поиск по
                      </Text>
                      <Text style={{fontSize:18,fontWeight:'500'}}>
                          объявлениям
                      </Text>
                      <Image source ={require('../../../assets/crm/scheduledesk.png')} style={{
                                          width: '67%',
                                          height: 113,
                                          borderRadius: 5,         
                  }}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flexDirection:'column',width:'50%', alignItems:'center',justifyContent:'center'}}>
                      <Text style={{fontSize:18,fontWeight:'500'}}>
                          Поиск
                      </Text>
                      <Text style={{fontSize:18,fontWeight:'500'}}>
                          на карте
                      </Text>
                      <Image source ={require('../../../assets/crm/icons/map.jpg')} style={{
                                          width: '70%',
                                          height: 113,
                                          borderRadius: 5,         
                      }}/>
                  </TouchableOpacity>
              </View>

              <Text style={{fontSize: 22, alignSelf: 'center', marginBottom: 10}}>
                    или 
                </Text>

              <TouchableOpacity onPress={routeConnectToProcessPage} style={{alignSelf: 'center', backgroundColor: 'lightgrey', width: '80%', borderWidth: 1, borderRadius: 5, alignItems:'center', justifyContent: 'center', height: 70}}>
                <Text style={{fontSize: 20}}>
                    Присоедениться 
                </Text>
                
                <Text style={{fontSize: 20}}>
                  по id
                </Text>
              </TouchableOpacity>

            </View>
          </TouchableOpacity>
      </Modal>
      
      {ticketsIncomed === "No"    &&  
      
        <ScrollView>
               <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 20, fontWeight: '500'}}>
                      У вас нет
                  </Text>

                  <Text style={{fontSize: 20, fontWeight: '500', color: 'blue', marginLeft: 5}}>
                      ни одного
                  </Text>
                </View>

                 <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                     активного контракта
                 </Text>
             </View>



        

             <TouchableOpacity onPress={routeRegisterTicketPage} style={styles.addButton}>

                 <Text style={{fontSize: 18,color: 'black'}}>
                     Объявить задание
                 </Text>

             </TouchableOpacity>

             <TouchableOpacity onPress={showModAddWorkers} style={styles.addButton}>

                 <Text style={{fontSize: 18,color: 'black'}}>
                     Найти контракт
                 </Text>

             </TouchableOpacity>
         </ScrollView>}

          
      
        
         {ticketsIncomed === "Yes" && 
          <View>

            <View style={{flexDirection: 'row', width: '96%', alignSelf: 'center'}}>

              <TouchableOpacity onPress={routeRegisterTicketPage} style={styles.addButtonLeft}>

                <Text style={{fontSize: 17,color: 'black'}}>
                    Объявить задание
                </Text>

              </TouchableOpacity>


              <TouchableOpacity onPress={showModAddWorkers} style={styles.addButtonRight}>

                <Text style={{fontSize: 17,color: 'black'}}>
                    Найти контракт
                </Text>

              </TouchableOpacity>
            </View>

            <FlatList
              data= {tickets}
              keyExtractor={(item) => item._id}
              renderItem={ ({ item }) => (              
                <TicketCRMCard ticket={item} navigation = {navigation} />
            )}/>

          </View>
        }
      


    </View>
  ) 
}






const styles = StyleSheet.create({
    container: {
      marginBottom: 190
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'70%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 50,
        backgroundColor: 'lightgrey',
        marginBottom: 7
    },
    addButtonLeft:{
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'50%',
        borderWidth: 1,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        minHeight: 50,
        backgroundColor: 'lightgrey',
    },
    addButtonRight:{
      alignItems: 'center', 
      justifyContent: 'center', 
      width:'50%',
      borderWidth: 1,
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      minHeight: 50,
      backgroundColor: 'lightgrey',
  },
  modalInnerAddWorkers:{
      width: '90%',
      height: 400,
      flexDirection: 'column',
      backgroundColor: 'white',
      margin: 10,
      borderRadius: 10,
   },
  modalOne:{
      flex: 1,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#00000099'
  }
    })
