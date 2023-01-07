import axios from 'axios'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList , ScrollView, SafeAreaView } from 'react-native'

import { useAsyncAbortable, useAsync} from 'react-async-hook';
import {Context as AuthContext} from '../../../context/AuthContext';
import { ObjectCard } from '../fetchedcards/ObjectCard';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ObjectsFetch = ({navigation}) => {
  
  const {state} = useContext(AuthContext)
  
  const [objectsIncomed,setObjectsIncomed] = useState('No')

  const [objects, setObjects] = useState([])

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
        email: `${state.user.user.userDump.email}`
    }

    function refreshPage() {
      window.location.reload(false);
    }
   

    const useEffect = (()=> {
        navigation.addListener('focus', 
          async function fetchData() {
              try {
                  const response = await axios.post("http://192.168.0.108:8800/api/auth/check",(form))
                  
                  .then(async (response)=> {
                    const objectsD = response.data.user.objects
                    
                    const objects = await Promise.all(objectsD.map(async (i) => {
                        const object = await (await fetch(`http://192.168.0.108:8800/api/buildingObjects/getobjectbyid/${i}`)).json();
                        return i=object ;
                      }))
                      if(objects.length > 0 ){
                        setObjects(objects)
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
      },[objects])


  return (
    <View style={styles.container}>
      {objectsIncomed === "No"    &&  
      
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



      

           <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

               <Text style={{fontSize: 18,color: 'black'}}>
                   Объявить задание
               </Text>

           </TouchableOpacity>

           <TouchableOpacity onPress={routeMainPage} style={styles.addButton}>

               <Text style={{fontSize: 18,color: 'black'}}>
                   Найти контракт
               </Text>

           </TouchableOpacity>
       </ScrollView>}

        
    
      
       {objectsIncomed === "Yes" && 
        <View>

          <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

            <Text style={{fontSize: 18,color: 'black'}}>
                Создать объект
            </Text>

          </TouchableOpacity>

          
          <FlatList
        data= {objects}
        keyExtractor={(item) => item._id}
        renderItem={ ({ item }) => (              
          <ObjectCard object={item} navigation = {navigation} />
        )}/>

          
        </View>
      }
    </View>
  ) 
}






const styles = StyleSheet.create({
    container: {
      width: '100%',
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
