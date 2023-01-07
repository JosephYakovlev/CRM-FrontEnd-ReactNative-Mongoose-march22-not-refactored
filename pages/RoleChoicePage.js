import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
import ProfileBar from '../components/profilebar/ProfileBar';
import NoAuthProfileBar from '../components/profilebar/NoAuthProfileBar';
import {Context as AuthContext} from '../../context/AuthContext';


const windowWidth = Dimensions.get('window').width;

export default function RoleChoicePage({navigation}) {

    const state1 = useContext(AuthContext)

   


    
    
    const routeRegisterTicketPage = () =>{
        navigation.navigate('RegisterTicketPage')
    }

    const routeMainTicketPage = () =>{
        navigation.navigate('MainTicket')
    }


    return (
        <SafeAreaView style={styles.container}>
            
                <Text style={{alignSelf: 'center',fontSize: 20,color: 'black', fontWeight: 'bold'}}>
                    Выберите следующий шаг.
                </Text>

                <Text style={{alignSelf: 'center',fontSize: 18,color: 'black', marginTop: 10}}>
                    Если сложно определиться сразу, 
                </Text>

                <Text style={{alignSelf: 'center',fontSize: 18,color: 'black'}}>
                    посмотрите примеры заданий
                </Text>

            <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginBottom: 90, marginTop: 40}}>


                

                <TouchableOpacity onPress={routeRegisterTicketPage} style={styles.ZkzBtn}>
                    
                    <Image source ={require('../../assets/2.jpg')} style={{
                          width: 120,
                          height: 120,
                          borderRadius: 5,
                        
                    }}/>

                    <View >
                        <Text style={{fontSize: 20,color: 'black', fontWeight: '700'}}>
                            Создать задание
                        </Text>

                        <Text style={{fontSize: 15,color: 'black', marginTop: 10}}>
                            Заказать услугу 
                        </Text>

                        <Text style={{fontSize: 15,color: 'black'}}>
                            и найти специалиста 
                        </Text>
                    </View>
                    

                </TouchableOpacity>

                <TouchableOpacity onPress={routeMainTicketPage} style={styles.PdrBtn}>
                    

                    <View >
                        <Text style={{fontSize: 20,color: 'black', fontWeight: '700'}}>
                            Стать исполнителем
                        </Text>

                        <Text style={{fontSize: 15,color: 'black', marginTop: 10}}>
                            Найти заказы 
                        </Text>

                        <Text style={{fontSize: 15,color: 'black'}}>
                            и начать зарабатывать 
                        </Text>
                    </View>

                    <Image source ={require('../../assets/users/33.jpg')} style={{
                          width: 120,
                          height: 120,
                          borderRadius: 5,
                        
                    }}/>
                    

                </TouchableOpacity>

            </View>

             


            <View style={{bottom: 0, position: 'absolute'}}>
                {state1.state.user !== null ? <ProfileBar navigation = {navigation}/> : <NoAuthProfileBar navigation = {navigation}/>}
            </View>

            <View style={{height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey', position: 'absolute', top: 0, width: '100%'}}>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                    С чем вам помочь?
                </Text>
            </View>
            
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    profilebar: {
        width: '100%',
        minHeight: 120,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    projectPlace: {
        marginTop: 10,
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    projectDescription:{
        flexDirection: 'column',
    },
    projectDescElement:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ZkzBtn:{
        alignItems: 'center', 
        justifyContent: 'space-around', 
        width:'90%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 150,
        backgroundColor: 'white',
        marginBottom: 10,
        flexDirection: 'row',

    },
    PdrBtn:{
        alignItems: 'center', 
        justifyContent: 'space-around', 
        width:'90%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 150,
        backgroundColor: 'white',
        marginTop: 10,
        flexDirection: 'row',
    },
    RegistrateButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'70%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 50,
        backgroundColor: 'lightgrey'
    }
});

