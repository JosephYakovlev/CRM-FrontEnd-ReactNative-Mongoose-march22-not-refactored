import axios from 'axios';
import React, {useState,useCallback, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export const WorkFlowCard = (workflow) => {

    const navigation = useNavigation();
  
 
    
    const routeProjectPage = () =>{
        navigation.navigate('ProjectPage',workflow);
    }

   
    return ( 
        <View style={styles.WorkflowContainer}>
            <TouchableOpacity onPress={routeProjectPage} style={{flexDirection: 'row', backgroundColor: 'white'}}>
                <View style={{flexDirection: 'column', width: '20%', alignItems: 'center'}}>
                    <View style={{width: 5, backgroundColor: 'green',minHeight: 130, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{borderRadius: 11, minWidth: 22, minHeight: 22,backgroundColor: 'green' }}>
                            <Text style={{alignSelf: 'center', fontSize: 15, color: 'white'}}>
                                {(workflow.object.processes.indexOf(workflow.workflow._id) * -1) + 1 }
                            </Text>

                        </View>

                    </View>
                </View>

                <View style={{flexDirection: 'column', width: '80%', padding: 5}}>
                    <View style={{width: '100%', minHeight: 90, borderColor: 'grey',borderWidth: 1, borderRadius: 5}}>
                        <Text style={{alignSelf: 'center',fontSize: 18}}>
                            Отлив монолита
                        </Text>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Статус:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green'}}>
                                Выполнено
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Старт:
                            </Text>

                            <Text style={{fontSize: 16, color: 'orange'}}>
                                {workflow.workflow.start}
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Конец:
                            </Text>

                            <Text style={{fontSize: 16, color: 'red'}}>
                                {workflow.workflow.end}
                            </Text>

                        </View>

                        <View style={{flexDirection: 'row'}}>

                            <Text style={{fontSize: 16}}>
                                Выделено средств:
                            </Text>

                            <Text style={{fontSize: 16, color: 'green', marginLeft: 5}}>
                                250 000
                            </Text>

                            <Text style={{fontSize: 16, marginLeft: 3}}>
                                Руб.
                            </Text>

                        </View>

                    </View>
                </View>
            </TouchableOpacity>
      </View>
      
    )
}
      

     


const styles = StyleSheet.create({
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
 
})







































