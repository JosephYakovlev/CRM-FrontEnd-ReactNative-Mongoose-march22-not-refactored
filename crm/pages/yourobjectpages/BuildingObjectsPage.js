import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import { ObjectsFetch } from '../../components/ObjectsFetch';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ProfileBar from '../../../components/profilebar/ProfileBar';

const windowWidth = Dimensions.get('window').width;

export default function BuildingObjectsPage({navigation}) {


    const headerHeight = getStatusBarHeight()

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
            <SafeAreaView style={{flex: 1, marginBottom: 90, marginTop: headerHeight}}>
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

            <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-around', marginHorizontal: 10}}>
                        <View style={{justifyContent: 'center', alignItems:'center', width: '43%'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold' }}>
                            З А Щ И Щ Е Н О
                            </Text>
                        </View>

                        <View style={{ alignItems: 'center', width: '14%'}}>
                            <Image source ={require('../../../../assets/crm/logo.png')} style={{
                                height: 60,
                                width: 45,
                                marginVertical: 10,
                            }} />
                        </View>

                        <View style={{ justifyContent: 'center',  alignItems:'center', width: '43%'}}>
                            <Text style={{fontSize: 23, fontWeight: 'bold' }}>
                            B U I L D E R
                            </Text>
                        </View>
                    </View> 


            <View style={{width:'100%', flexDirection: 'row', minHeight: 70}}>
                    
                <TouchableOpacity  style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                    <Text style={{fontSize: 20}}>
                        Склады
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{...styles.categoryBarPart,backgroundColor: 'lightgreen', width: '50%', borderLeftWidth: 0}}>
                    <Text style={{fontSize: 20}}>
                        Строительные
                    </Text>  
                </TouchableOpacity>

            </View>
                
            <View style={{width:'100%', flexDirection: 'row', marginBottom: 10, minHeight: 70}}>
                <TouchableOpacity  style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%'}}>
                    <Text style={{fontSize: 20}}>
                        Подрядные
                    </Text>
                        
                </TouchableOpacity>

                <TouchableOpacity  style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                    <Text style={{fontSize: 20}}>
                        Будущие
                    </Text>
                </TouchableOpacity>
            </View>


        

            <ObjectsFetch  navigation = {navigation} />

            
            </SafeAreaView>


            <View style={{bottom: 0, position: 'absolute'}}>
                <ProfileBar navigation = {navigation}/> 
            </View>


            

            
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
        justifyContent: 'center'
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'80%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 50,
        backgroundColor: 'lightgrey',
        marginBottom: 10
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

