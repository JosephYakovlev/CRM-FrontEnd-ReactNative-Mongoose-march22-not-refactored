import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'


const windowWidth = Dimensions.get('window').width;


export default function ContractsPage({navigation}) {

    const routeMyProjectsPage = () =>{
        navigation.navigate('MyProjectsPage')
    }

    const routeRegisterObjectPage = () =>{
        navigation.navigate('RegisterObjectPage')
    }
    const routeCurrentContractPage = () =>{
        navigation.navigate('CurrentContractPage')
    }

    const routeConnectToProcess = () =>{
        navigation.navigate('ConnectToProcess')
    }

    return (
        <View style={styles.container}>
            <View style={styles.profilebar}>
                <View style={{left: 10, justifyContent: 'center'}}>
                    <Text style={{fontSize: 18 }}>
                        Добро пожаловать,
                    </Text>
                    <Text style={{fontSize: 18, color: 'blue'}}>
                        Сергей
                    </Text>
                    <Text style={{alignSelf: 'center', fontSize: 22}}>
                        Активные подряды
                    </Text>

                </View>

            </View>

            <TouchableOpacity style={styles.projectPlace} onPress={routeCurrentContractPage}>
                <Image source ={require('../../../assets/crm/icons/villa1.jpg')} style={{
                                        alignSelf: 'center',
                                        width: `${windowWidth}`/3,
                                        height: `${windowWidth}`/5,
                                        margin: 10
                }}/>

                <View style={styles.projectDescription}>
                    <Text style={{alignSelf: 'center', fontSize: 18}}>
                        Villa 1
                    </Text>

                    <Text style={{alignSelf: 'center', fontSize: 16}}>
                        Кладка стен
                    </Text>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Бюджет:
                        </Text>

                        <Text style={{color: 'green'}}>
                            80 000 000руб.
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Потрачено:
                        </Text>

                        <Text style={{color: 'red'}}>
                            56 000 000руб.(78%)
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Выполнено работ:
                        </Text>

                        <Text style={{color: 'blue'}}>
                            54%
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>

            <TouchableOpacity onPress={routeConnectToProcess} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Присоедениться к подряду
                </Text>

            </TouchableOpacity>

            <TouchableOpacity onPress={routeRegisterObjectPage} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Искать подряды
                </Text>

            </TouchableOpacity>

            
            <ImageBackground source ={require('../../../assets/crm/backgroundlogo.png')} style={{
                                    position: 'absolute',
                                    width: 200,
                                    height: 270,
                                    top:'2%',
                                    right: -80
            }}>
                

                
            </ImageBackground>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
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
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'80%',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 60,
        backgroundColor: 'lightgrey',
        marginTop: 5
    }
});

