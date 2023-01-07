import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'

import {Context as AuthContext} from '../../../../context/AuthContext';
import axios from 'axios';
import CRMProfileBar from '../../components/CRMProfileBar';

const windowWidth = Dimensions.get('window').width;

export default function YourInProgressContractsPage({navigation}) {

    const routeYourFinishedContractsPage = () =>{
        navigation.navigate('YourFinishedContractsPage')
    }

    const routeYourFutureContractsPage = () =>{
        navigation.navigate('YourFutureContractsPage')
    }

    const routeYourRunningContractsPage = () =>{
        navigation.navigate('YourRunningContractsPage')
    }


    const routeSkladsPage = () =>{
        navigation.navigate('SkladsPage')
    }

    const routeYourBrigadesPeoplePage = () =>{
        navigation.navigate('YourBrigadesPeoplePage')
    }




    return (
        <View style={styles.container}>
            <View style={styles.profilebar}>
                <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
                    <View style={{left: 10, justifyContent: 'center', width: '50%', alignItems:'center'}}>
                        <Text style={{fontSize: 23, fontWeight: 'bold' }}>
                        B U I L D E R
                        </Text>
                    </View>

                    <View style={{width: '50%', alignItems: 'center'}}>
                        <Image source ={require('../../../../assets/crm/logo.png')} style={{
                            height: 70,
                            width: 50,
                            marginVertical: 10,
                        }} />
                    </View>
                </View>

                <View style={{width:'100%', flexDirection: 'row', marginBottom: 5}}>
                    <TouchableOpacity onPress={routeSkladsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
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

                    <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightblue', width: '34%', borderLeftWidth: 0}}>
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
                    <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            Исходящие
                        </Text>

                        <View style={{height: 30, width: 30, backgroundColor: 'red',position: 'absolute', borderRadius: 15, borderWidth: 2, borderColor: 'white', top: -15, right: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 18}}>
                                0
                            </Text>
                        </View>
                            
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgreen', width: '50%', borderLeftWidth: 0}}>
                        <Text style={{fontSize: 20}}>
                            Входящие
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{width:'100%', flexDirection: 'row', minHeight: 70}}>
                    <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            В процессе
                        </Text>
                        <Text style={{fontSize: 20}}>
                            заключения
                        </Text>
                            
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                        
                        <Text style={{fontSize: 20}}>
                            Активные
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={{width:'100%', flexDirection: 'row', marginBottom: 10, minHeight: 70}}>
                    <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                        <Text style={{fontSize: 20}}>
                            Завершенные
                        </Text>
                            
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress= {routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                        <Text style={{fontSize: 20}}>
                            Будущие
                        </Text>
                    </TouchableOpacity>
                </View>



            {/* <View style={{width:'100%',  marginBottom: 10, minHeight: 70, alignItems: 'center'}}>
                
                <TouchableOpacity onPress= {routeYourFutureContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%', borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20, fontWeight: '500',}}>
                        Будущие
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgreen', width: '80%',borderTopWidth: 0, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20,fontWeight: '500'}}>
                        Текущие
                    </Text>
                        
                </TouchableOpacity>

                <TouchableOpacity onPress= {routeYourFinishedContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%', borderTopWidth: 0, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20,fontWeight: '500'}}>
                        Завершенные
                    </Text>
                </TouchableOpacity>
            </View> */}

                <View style={{flexDirection: 'column', width: '100%', padding: 5}}>
                    <View style={{width: '100%', minHeight: 100, borderColor: 'grey',borderWidth: 1, borderRadius: 5,flexDirection:'row',backgroundColor: '#02D6FF25'}}>
                        
                        <View style={{height: 24, width: 24, backgroundColor: 'red',position: 'absolute', borderRadius: 12, borderWidth: 2, borderColor: 'white', top: -15, right: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: 'white', fontSize: 15}}>
                                1
                            </Text>
                        </View>

                    </View>
                </View>



        

            <TouchableOpacity onPress={{}} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Найти контракт
                </Text>

            </TouchableOpacity>

            <View style={{position:'absolute',bottom: 0 }}>
                <CRMProfileBar />
            </View>

        
            

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

