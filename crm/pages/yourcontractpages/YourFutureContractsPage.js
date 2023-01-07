import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'

import {Context as AuthContext} from '../../../../context/AuthContext';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function YourFutureContractsPage({navigation}) {

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
                <View style={{left: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18 }}>
                        Добро пожаловать,
                    </Text>
                    <Text style={{fontSize: 18, color: 'blue'}}>
                        Иосиф
                    </Text>
                </View>

                <View style={{width:'100%', flexDirection: 'row'}}>
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


            <View style={{width:'100%',  marginBottom: 10, minHeight: 70, alignItems: 'center'}}>
                
                <TouchableOpacity onPress= {routeYourFutureContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgreen', width: '80%', borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20, fontWeight: '500',}}>
                        Будущие
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%',borderTopWidth: 0, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 20,fontWeight: '500'}}>
                        Текущие
                    </Text>
                        
                </TouchableOpacity>

                <TouchableOpacity onPress= {routeYourFinishedContractsPage} style={{...styles.categoryBarPart,minHeight: 70,backgroundColor: 'lightgrey', width: '80%', borderTopWidth: 0, borderLeftWidth: 1}}>
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


        

            <TouchableOpacity onPress={{}} style={styles.addButton}>

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

