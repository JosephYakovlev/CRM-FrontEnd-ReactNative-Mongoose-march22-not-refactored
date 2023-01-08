import axios from 'axios'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList , ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAsyncAbortable, useAsync} from 'react-async-hook';
import {Context as AuthContext} from '../../../context/AuthContext';
import { ObjectCard } from '../fetchedcards/ObjectCard';
import { ProcessContractorCard } from '../fetchedcards/ProcessContractorCard';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProcessConractorsFetch = ({workflow}) => {



    const navigation = useNavigation();
  
  const {state} = useContext(AuthContext)
  
  const [objectsIncomed,setObjectsIncomed] = useState('No')

  const [users, setUsers] = useState([])

    const routeRegisterObjectPage = () =>{
        navigation.navigate('RegisterObjectPage')
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
        _id: workflow._id
    }

    function refreshPage() {
      window.location.reload(false);
    }
   

    const useEffect = (()=> {
        navigation.addListener('focus', 
          async function fetchData() {
              try {
                  const response = await axios.post("http://192.168.0.108:8800/api/buildingprocesses/check",(form))
                  
                  .then(async (response)=> {
                    const usersD = response.data.workflow.contractors
                    
                    const users = await Promise.all(usersD.map(async (i) => {
                        const user = await (await fetch(`http://192.168.0.108:8800/api/users/${i}`)).json();
                        return i=user ;
                      }))
                      if(users.length > 0 ){
                        setUsers(users)
                        setObjectsIncomed('Yes')
                        onRefresh()
                        }
                      onRefresh()
                      
                  })
              } catch (e) {}
    })
  })
    const renderCount = useRef(1)
      useEffect(() => {
        renderCount.current++
      },[users])


  return (
    <View style={styles.container}>
      {objectsIncomed === "No"    &&  
      
      <ScrollView>

                    <Text style={{alignSelf: 'center', fontSize: 21}}>
                        Исполнители:
                    </Text>

             <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 17, fontWeight: '500'}}>
                    пока не нашлось
                </Text>

                <Text style={{fontSize: 17, fontWeight: '500', color: 'blue', marginLeft: 5}}>
                    ни одного
                </Text>
              </View>

               <Text style={{fontSize: 17, fontWeight: '500', color: 'black'}}>
                   исполнителя
               </Text>
           </View>



      

           <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

               <Text style={{fontSize: 18,color: 'black'}}>
                   Найти исполнителя
               </Text>

           </TouchableOpacity>

          
       </ScrollView>}

        
    
      
       {objectsIncomed === "Yes" && 
        <View>

                <View style={{flexDirection: 'row', width: '95%', justifyContent: 'space-between', height: 50, alignItems: 'center', alignSelf: 'center'}}>                       
                    <Text style={{alignSelf: 'center', fontSize: 21}}>
                        Исполнители:
                    </Text>

                    
                    <TouchableOpacity style={{height: 30,alignItems: 'center',justifyContent: 'center', backgroundColor: 'lightgrey', borderWidth: 1,borderRadius: 5, width: 100}}>
                        <Text>
                            Добавить 
                        </Text>
                    </TouchableOpacity>
                </View>

          
          <FlatList
        data= {users}
        keyExtractor={(item) => item._id}
        renderItem={ ({ item }) => (              
            <ProcessContractorCard contractor = {item}/>
        )}/>

          
        </View>
      }
    </View>
  ) 
}






const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: 'white'
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
    }
    })
