import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'


const windowWidth = Dimensions.get('window').width;


export default function WorkersSchedule({navigation}) {

    const routeMyProjectsPage = () =>{
        navigation.navigate('MyProjectsPage')
    }

    const routeCheckInWorker = () =>{
        navigation.navigate('CheckInWorker')
    }

    const routeWastedMaterials = () =>{
        navigation.navigate('WastedMaterials')
    }


    return (
        <View style={styles.container}>
            <View style={styles.profilebar}>
                <View style={{left: 10, justifyContent: 'center',width:'60%'}}>
                    <Text style={{fontSize: 18 }}>
                        Добро пожаловать,
                    </Text>
                    <Text style={{fontSize: 18, color: 'blue'}}>
                        Иосиф
                    </Text>

                </View>

                <View style={{justifyContent: 'center',width:'40%',alignItems:'center',flexDirection:'column'}}>
                    <Text style={{fontSize: 18, alignSelf: 'center'}}>
                        Villa 1
                    </Text>
                
                    <Image source ={require('../../../assets/crm/icons/villa1.jpg')} style={{
                                            alignSelf: 'center',
                                            width: '100%',
                                            height: `${windowWidth}`/5,
                                            margin: 10
                    }}/>
                </View>

            </View>

            <Text style={{alignSelf: 'center',fontSize: 18}}>
                Журнал посещений
            </Text>


            <View style={{flexDirection: 'row'}}>
                <View style={{width: '20%',alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightgrey',borderBottomWidth:1,borderTopWidth: 1, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 18}}>
                        06.04 
                    </Text>
                </View>
                <View style={{width: '20%',alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightgrey',borderBottomWidth:1,borderTopWidth: 1, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 18}}>
                        07.04 
                    </Text>
                </View>
                <View style={{width: '20%',alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightgrey',borderBottomWidth:1,borderTopWidth: 1, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 18}}>
                        08.04 
                    </Text>
                </View>
                <View style={{width: '20%',alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightblue',borderTopWidth: 1, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 18}}>
                        09.04 
                    </Text>
                </View>
                <View style={{width: '20%',alignItems: 'center', justifyContent: 'center',backgroundColor: 'lightgrey',borderBottomWidth:1,borderTopWidth: 1, borderLeftWidth: 1}}>
                    <Text style={{fontSize: 18}}>
                        10.04 
                    </Text>
                </View>
            </View>

            <View  style={{backgroundColor: 'lightblue',minHeight:'100%'}}>
                
                <Text style={{fontSize: 18,borderBottomWidth:1}}>
                    Бригада 1
                </Text>
                
                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18}}>
                            Бригадир:
                        </Text>
                        <Text style={{fontSize: 18,color:'blue'}}>
                            Романенко С.М.
                        </Text>
                    </View>
                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 18,width:'50%'}}>
                            Наименование
                        </Text>
                        <View style={{flexDirection:'column',width:'25%'}}>
                            <Text style={{fontSize: 14}}>
                                Отработано ч.
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Факт/План
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%'}}>
                            <Text style={{fontSize: 14}}>
                                Произведено
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Факт/План
                            </Text>
                        </View>
                    </View>
                
                </View>

                <View style={{borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between'}}>
                    <View style={{width: '50%'}}>
                        <Text style={{fontSize: 16}}>
                            Мастера:
                        </Text>
                    </View>

                    <TouchableOpacity style={{width: '50%',backgroundColor: 'lightgrey'}} onPress={routeCheckInWorker}>
                        <Text style={{fontSize: 16,alignSelf: 'center'}}>
                            Добавить +
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Мастер 1
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                0ч./10ч.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                0м2/10м2
                            </Text>
                        </View>
                    </View>
                </View>
                    

                <View style={{borderBottomWidth:1}}>
                        <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                            <Text style={{fontSize: 17,width:'50%'}}>
                                Итого
                            </Text>
                            <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                                <Text style={{fontSize: 15}}>
                                    64ч./70ч.
                                </Text>
                            </View>
                            <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                                <Text style={{fontSize: 15,color:'green'}}>
                                    93м2/91м2
                                </Text>
                            </View>
                        </View>
                    </View>

                <View style={{borderBottomWidth: 1, flexDirection: 'row', paddingHorizontal: 5, justifyContent: 'space-between'}}>
                    <View style={{width: '50%'}}>
                        <Text style={{fontSize: 16}}>
                            Подсобные рабочие:
                        </Text>
                    </View>

                    <TouchableOpacity style={{width: '50%',backgroundColor: 'lightgrey'}} onPress={routeWastedMaterials}>
                        <Text style={{fontSize: 16,alignSelf: 'center'}}>
                            Добавить +
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Подсобный 1
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                0ч./10ч.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                0%
                            </Text>
                        </View>
                    </View>
                    
                
                </View>
                <View style={{borderBottomWidth:1}}>
                        <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                            <Text style={{fontSize: 17,width:'50%'}}>
                                Итого
                            </Text>
                            <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                                <Text style={{fontSize: 15}}>
                                    45ч./50ч.
                                </Text>
                            </View>
                            <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                                <Text style={{fontSize: 15,color:'red'}}>
                                    90%
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{borderBottomWidth:1,alignItems:'center'}}>
                        <View style={{width:'100%',minHeight:40,backgroundColor:'green', alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize: 18,color:'white'}}>
                                Оплатить счет
                            </Text>
                        </View>
                        <Text style={{fontSize: 15,color:'blue'}}>
                            Скачать счет
                        </Text>
                        <Image source ={require('../../../assets/crm/icons/pdfIcon.png')} style={{
                                    width: 110,
                                    height: 110,
                                    
                                }}/>
            </View>

            </View>

           
            
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
        flexDirection:'row',
        width: '100%',
        minHeight: 80,
        backgroundColor: 'white',
        justifyContent: 'space-between',
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
    }
});

