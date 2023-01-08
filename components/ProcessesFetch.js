import axios from 'axios'
import React, {useState, useEffect, useRef, useContext} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList , ScrollView, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useAsyncAbortable, useAsync} from 'react-async-hook';
import {Context as AuthContext} from '../../../context/AuthContext';
import { ObjectCard } from '../fetchedcards/ObjectCard';
import { WorkFlowCard } from '../fetchedcards/WorkFlowCard';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export const ProcessesFetch = ({object}) => {

  
  const navigation = useNavigation();

  const {state} = useContext(AuthContext)

  

  const currentObject = object.route.params

  const [currentworkflowes, setCurrentworkflowes] = useState([])

    

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => setRefreshing(false));
    }, [])

    const form = {
        _id: `${currentObject._id}`
    }

    function refreshPage() {
      window.location.reload(false);
    }
   

    const useEffect = (()=> {
        navigation.addListener('focus', 
          async function fetchData() {
              try {
                  const response = await axios.post("http://192.168.0.108:8800/api/buildingObjects/check",(form))
                  
                  .then(async (response)=> {
                    const workflowesId = response.data.object.processes
                  
                    
                    const workflowes = await Promise.all(workflowesId.map(async (i) => {
                        const workflow = await (await fetch(`http://192.168.0.108:8800/api/buildingprocesses/getprocessbyid/${i}`)).json();
                        return i=workflow ;
                      }))
                      setCurrentworkflowes(workflowes)
                      onRefresh()
                      
                  })
              } catch (e) {}
    })
  })
    const renderCount = useRef(1)
      useEffect(() => {
        renderCount.current++
      },[currentworkflowes])


  return (
    <View style={styles.container}>
      <FlatList
        data= {currentworkflowes}
        keyExtractor={(item) => item._id}
        renderItem={ ({ item }) => (              
          <WorkFlowCard workflow={item} object={currentObject} />
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
