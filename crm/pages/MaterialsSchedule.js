import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ImageBackground,TouchableOpacity, Image } from 'react-native'


const windowWidth = Dimensions.get('window').width;


export default function MaterialsSchedule({navigation}) {

    const routeMyProjectsPage = () =>{
        navigation.navigate('MyProjectsPage')
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
                Журнал Расхода
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
            <View style={{borderBottomWidth:1}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 18,width:'50%'}}>
                            Наименование
                        </Text>
                        <View style={{flexDirection:'column',width:'25%'}}>
                            <Text style={{fontSize: 14}}>
                                Отработано 
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Факт/План
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                Относительно
                            </Text>
                            <Text style={{fontSize: 14}}>
                                работы
                            </Text>
                        </View>
                    </View>
                
                </View>
                
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
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Газоблок
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                140/160шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                90%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Клей
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                80м./100м.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                100%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Шпателя
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                30шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                140%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Уровни
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                1шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                50%
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={routeWastedMaterials} style={{alignSelf:'center', marginVertical: 5,backgroundColor: 'lightgrey',borderRadius: 5,width:'50%',borderWidth: 1}}>
                        <Text style={{fontSize: 18,alignSelf: 'center',marginHorizontal: 5}}>
                            Добавить расход
                        </Text>
                    </TouchableOpacity>
                    

                </View>

                
                    <Text style={{fontSize: 18,borderBottomWidth:1}}>
                    Бригада 2
                </Text>
                
                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize: 18}}>
                            Бригадир:
                        </Text>
                        <Text style={{fontSize: 18,color:'blue'}}>
                            Бригадир 2
                        </Text>
                    </View>
                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Газоблок
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                108/120шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                137%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Клей
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                25м./30м.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                140%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Шпателя
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                10шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                120%
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Уровни
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                2шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'red'}}>
                                200%
                            </Text>
                        </View>
                    </View>
                    

                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 18,width:'50%'}}>
                            Итого
                        </Text>
                        <View style={{flexDirection:'column',width:'25%'}}>
                            <Text style={{fontSize: 14}}>
                                Отработано 
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Факт/План
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                Остаток
                            </Text>
                            <Text style={{fontSize: 14}}>
                                на складе
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{borderBottomWidth:1}}>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Газоблок
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                248/280шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                10 800шт.
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Клей
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                105м./130м.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                5600м.
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Шпателя
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                40шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                12 000шт.
                            </Text>
                        </View>
                    </View>
                    <View style={{width:'90%', marginHorizontal:'5%',flexDirection:'row'}}>
                        <Text style={{fontSize: 15,width:'50%',color:'blue'}}>
                            Уровни
                        </Text>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'center'}}>
                            <Text style={{fontSize: 14}}>
                                3шт.
                            </Text>
                        </View>
                        <View style={{flexDirection:'column',width:'25%',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 14,color:'green'}}>
                                150шт.
                            </Text>
                        </View>
                    </View>
                    

                </View>
                    <View style={{borderBottomWidth:1,alignItems:'center'}}>
                        <View style={{width:'100%',minHeight:40,backgroundColor:'green', alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize: 18,color:'white'}}>
                                Перейти на склад
                            </Text>
                        </View>
                        <View style={{width:'100%',minHeight:40,backgroundColor:'blue', alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize: 18,color:'white'}}>
                                Перейти в маркетплейс
                            </Text>
                        </View>
                        <Text style={{fontSize: 15,color:'blue'}}>
                                Скачать сметный расчет
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

