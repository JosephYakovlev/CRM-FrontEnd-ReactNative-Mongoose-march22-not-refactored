import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'
import { ObjectsFetch } from '../components/ObjectsFetch';

import {Context as AuthContext} from '../../../context/AuthContext';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function YourContractsPage({navigation}) {

    const routeRegisterObjectPage = () =>{
        navigation.navigate('RegisterObjectPage')
    }

    const routeYourObjectsPage = () =>{
        navigation.navigate('CRMMainPage')
    }


    const routeYourBrigadesPage = () =>{
        navigation.navigate('YourBrigadesPage')
    }


    return (
        <View style={styles.container}>
            <View style={styles.profilebar}>
                <View style={{left: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18 }}>
                        Добро пожаловать,
                    </Text>
                    <Text style={{fontSize: 18, color: 'blue'}}>
                        Иосиф
                    </Text>
                </View>

                <View style={{width:'100%', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={routeYourObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Объекты
                        </Text>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={routeYourBrigadesPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Бригады
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{...styles.categoryBarPart,backgroundColor: 'lightblue', width: '34%', borderLeftWidth: 0}}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Контракты
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

            <ObjectsFetch  navigation = {navigation} />

           
           
           
           
           
           
           
           
            <View style={{width:'100%', flexDirection: 'row', minHeight: 70}}>
                    
                    <TouchableOpacity onPress={routeSkladsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            Склады
                        </Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeBuildingObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgreen', width: '50%', borderLeftWidth: 0}}>
                        <Text style={{fontSize: 20}}>
                            Строительные
                        </Text>  
                    </TouchableOpacity>
    
                </View>
                    
                <View style={{width:'100%', flexDirection: 'row', marginBottom: 10, minHeight: 70}}>
                    <TouchableOpacity onPress={routeContractObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            Подрядные
                        </Text>
                            
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeFutureObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                        <Text style={{fontSize: 20}}>
                            Будущие
                        </Text>
                    </TouchableOpacity>
                </View>
           

                <View style={{width:'100%', flexDirection: 'row', marginBottom: 10, minHeight: 70}}>
                    <TouchableOpacity onPress={routeContractObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            Подрядные
                        </Text>
                            
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeFutureObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                        <Text style={{fontSize: 20}}>
                            Будущие
                        </Text>
                    </TouchableOpacity>
                </View>
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
           
            <View style={{width:'100%',  marginBottom: 10, minHeight: 70, alignItems: 'center'}}>
                
                <TouchableOpacity onPress= {routeYourBrigadesPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%', borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20, fontWeight: '500',}}>
                        Будущие
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={routeYourObjectsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgreen', width: '80%',borderTopWidth: 0, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20,fontWeight: '500'}}>
                        Текущие
                    </Text>
                        
                </TouchableOpacity>

                <TouchableOpacity onPress= {routeYourBrigadesPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%', borderTopWidth: 0, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20,fontWeight: '500'}}>
                        Завершенные
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    В данный момент у вас
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500', color: 'blue'}}>
                    не заключено ни одного 
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    контракта
                </Text>
            </View>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginBottom: 10}}>

            </View>


        

            <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Найти контракт
                </Text>

            </TouchableOpacity>


            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    profilebar: {
        width: '100%',
        minHeight: 120,
        justifyContent: 'center'
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'80%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 60,
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
    }
});

