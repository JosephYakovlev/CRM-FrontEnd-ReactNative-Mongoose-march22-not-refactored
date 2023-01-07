import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'
import { ObjectsFetch } from '../components/ObjectsFetch';

import {Context as AuthContext} from '../../../context/AuthContext';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function CRMMainPage({navigation}) {

    const routeRegisterObjectPage = () =>{
        navigation.navigate('RegisterObjectPage')
    }

    const routeYourBrigadesPeoplePage = () =>{
        navigation.navigate('YourBrigadesPeoplePage')
    }

    const routeYourRunningContractsPage = () =>{
        navigation.navigate('YourRunningContractsPage')
    }

    const routeSkladsPage = () =>{
        navigation.navigate('SkladsPage')
    }

    const routeBuildingObjectsPage = () =>{
        navigation.navigate('BuildingObjectsPage')
    }

    const routeContractObjectsPage = () =>{
        navigation.navigate('ContractObjectsPage')
    }

    const routeFutureObjectsPage = () =>{
        navigation.navigate('FutureObjectsPage')
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilebar}>
                
                <View style={{width:'100%', flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.categoryBarPart}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Объекты
                        </Text>
                    </TouchableOpacity> 

                    <TouchableOpacity onPress={routeYourBrigadesPeoplePage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Бригады
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress= {routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '34%', borderLeftWidth: 0}}>
                        <Text>
                            Ваши
                        </Text>
                        <Text>
                            Контракты
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={{width:'100%', flexDirection: 'row', minHeight: 70}}>
                    
                <TouchableOpacity onPress={routeSkladsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgreen', width: '50%'}}>
                    <Text style={{fontSize: 20}}>
                        Склады
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress= {routeBuildingObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
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

            <ObjectsFetch  navigation = {navigation} />

            <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    В данный момент у вас
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500', color: 'blue'}}>
                    не зарегистрировано ни одного
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    склада
                </Text>
            </View>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginBottom: 10}}>

            </View>


        

            <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Зарегистрировать склад
                </Text>

            </TouchableOpacity>


            

            
            {/* <ImageBackground source ={require('../../../assets/crm/backgroundlogo.png')} style={{
                                    position: 'absolute',
                                    width: 200,
                                    height: 270,
                                    top:'2%',
                                    right: -80
            }}>
                

                
            </ImageBackground> */}
            
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
        justifyContent: 'center',
        marginBottom: 5
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

