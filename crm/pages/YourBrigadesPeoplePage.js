import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image, SafeAreaView, ScrollView, Modal } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ProfileBar from '../../components/profilebar/ProfileBar';

const windowWidth = Dimensions.get('window').width;

export default function YourBrigadesPeoplePage({navigation}) {
    
    const headerHeight = getStatusBarHeight()

    const routeMainContractor = () =>{
        navigation.navigate('MainContractor')
    }

    const routeYourBrigadesPeoplePage = () =>{
        navigation.navigate('YourBrigadesPeoplePage')
    }

    
    const routeYourBrigadesTechnicsPage = () =>{
        navigation.navigate('YourBrigadesTechnicsPage')
    }


    const routeBuildingObjectsPage = () =>{
        navigation.navigate('BuildingObjectsPage')
    }

    const routeYourRunningContractsPage = () =>{
        navigation.navigate('YourRunningContractsPage')
    }



    return (
        <View style={styles.container}>











            <SafeAreaView style={{flex: 1, marginBottom: 90, marginTop: headerHeight}}>
                <ScrollView >
                    
                <View style={styles.profilebar}>
                    {/* <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'}}>
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
                    </View> */}

                    <View style={{width:'100%', flexDirection: 'row', marginBottom: 5}}>
                        <TouchableOpacity onPress={routeBuildingObjectsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey'}}>
                            <Text>
                                Ваши
                            </Text>
                            <Text>
                                Объекты
                            </Text>
                        </TouchableOpacity> 

                        <TouchableOpacity onPress={routeYourBrigadesPeoplePage} style={{...styles.categoryBarPart,backgroundColor: 'lightblue'}}>
                            <Text>
                                Ваши
                            </Text>
                            <Text>
                                Бригады
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={routeYourRunningContractsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '34%', borderLeftWidth: 0}}>
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
                            <Image source ={require('../../../assets/crm/logo.png')} style={{
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

            {/* <ObjectsFetch  navigation = {navigation} /> */}

            <View style={{width:'100%', flexDirection: 'row', marginBottom: 10, minHeight: 70}}>
                <TouchableOpacity onPress={routeYourBrigadesPeoplePage} style={{...styles.categoryBarPart,backgroundColor: 'lightgreen', width: '50%'}}>
                    <Text style={{fontSize: 20}}>
                        Люди
                    </Text>
                        
                </TouchableOpacity>

                <TouchableOpacity onPress= {routeYourBrigadesTechnicsPage} style={{...styles.categoryBarPart,backgroundColor: 'lightgrey', width: '50%', borderLeftWidth: 0}}>
                    <Text style={{fontSize: 20}}>
                        Техника
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '40%'}}>
                    <Text style={{fontSize: 20, fontWeight: '500', marginLeft: 20}}>
                        Бригады:
                    </Text>
                </View>

                <View style={{width: '60%',alignItems: 'center', justifyContent: 'center'}}>
                        
                        
                      <Text style={{fontSize: 25, color:'blue'}}>
                          0
                      </Text>

                </View>
            </View>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginVertical: 5}}>

            </View>


            <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    В данный момент у вас
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500', color: 'blue'}}>
                    нет ни одной 
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    бригады
                </Text>
            </View>


            <TouchableOpacity  style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Зарегистрировать бригаду
                </Text>


            </TouchableOpacity>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginVertical: 10}}>

            </View>


            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: '40%'}}>
                    <Text style={{fontSize: 20, fontWeight: '500', marginLeft: 20}}>
                        Люди:
                    </Text>
                </View>

                <View style={{width: '60%',alignItems: 'center', justifyContent: 'center'}}>
                        
                        
                      <Text style={{fontSize: 25, color:'blue'}}>
                          0
                      </Text>

                </View>
            </View>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginVertical: 5}}>

            </View>


            <View style={{ alignSelf: 'center', marginBottom: 10, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    В данный момент у вас
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500', color: 'blue'}}>
                    нет ни одного
                </Text>

                <Text style={{fontSize: 20, fontWeight: '500'}}>
                    рабочего
                </Text>
            </View>


            <TouchableOpacity onPress={routeMainContractor} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Найти человека
                </Text>


            </TouchableOpacity>

               
            </ScrollView>
            </SafeAreaView>


            

            {/* <View style={{position: 'absolute', top: 0}}>
                <TicketHat />
            </View> */}

            <View style={{position:'absolute',bottom: 0 }}>
                <ProfileBar />
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
        justifyContent: 'center'
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'70%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 60,
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
        borderRightWidth: 1,
    }
});

