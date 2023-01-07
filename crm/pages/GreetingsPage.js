import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'


const windowWidth = Dimensions.get('window').width;

export default function GreetingsPage({navigation}) {

    
    const routeLoginPage = () =>{
        navigation.navigate('LoginPage')
    }

    const routeRegistrationPage = () =>{
        navigation.navigate('RegistrationPage')
    }


    return (
        <View style={styles.container}>
            

            <View style={{minHeight: '50%', justifyContent: 'center', alignItems: 'center'}}>
                
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    B U I L D E R
                </Text>

                <Image source ={require('../../../assets/crm/logo.png')} style={{
                    marginTop: 15
                }} />
            </View>




           

            
        <View style={{ marginTop: 20}}>
            <TouchableOpacity onPress={routeLoginPage} style={styles.LogInButton}>

                <Text style={{fontSize: 18,color: 'white'}}>
                    Войти
                </Text>

            </TouchableOpacity>


            <Text style={{fontSize: 18, alignSelf: 'center', marginVertical: 10}}>
                или
            </Text>


            <TouchableOpacity onPress={routeRegistrationPage} style={styles.RegistrateButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Зарегистрироваться
                </Text>

            </TouchableOpacity>
        </View>

            
            
            
                

                
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center'
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
    LogInButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'60%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 40,
        backgroundColor: '#31383e'
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

