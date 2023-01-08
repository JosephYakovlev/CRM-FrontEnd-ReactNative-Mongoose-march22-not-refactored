import axios from 'axios'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList , ScrollView, SafeAreaView } from 'react-native'

import { useAsyncAbortable, useAsync} from 'react-async-hook';
import {Context as AuthContext} from '../../../context/AuthContext';
import { ObjectCard } from '../fetchedcards/ObjectCard';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const BrigadesFetch = ({navigation}) => {
  
  const {state} = useContext(AuthContext)


  const [objects, setObjects] = useState([])

    const routeRegisterObjectPage = () =>{
        navigation.navigate('RegisterObjectPage')
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
                      setObjects(objects)
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
      <FlatList
        data= {objects}
        keyExtractor={(item) => item._id}
        renderItem={ ({ item }) => (              
          <ObjectCard object={item} navigation = {navigation} />
        )}
       />
    </View>
  ) 
}






const styles = StyleSheet.create({
    container: {
      width: '100%',
    }
    })
