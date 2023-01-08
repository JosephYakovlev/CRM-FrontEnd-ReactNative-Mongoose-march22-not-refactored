import { StyleSheet, Text, View, Image, TouchableOpacity,ImageBackground, Modal, Dimensions } from 'react-native';
import React, {useState} from 'react';

const windowWidth = Dimensions.get('window').width;


    const MenuModal = () => {
    return ( 
    
    <View style={styles.modalInner}>
            








        <Text style={{fontSize: 25, fontWeight: 'bold', paddingVertical: 5, alignSelf: 'center'}}>
            МЕНЮ
        </Text>













        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            
            
            <View style={{flexDirection: 'column', width: '23%', padding: 5}}>
                <Text style={{alignSelf: 'center'}}>
                    Знания
                </Text>

                <Image source ={require('../../../assets/categories/znan1.jpg')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '23%', padding: 5}}>
                <Text>
                    Оператор
                </Text>

                <Image source ={require('../../../assets/categories/tele.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 5,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '23%', padding: 5}}>
                <Text>
                    ТОП 100
                </Text>
                
                <Image source ={require('../../../assets/chosen.jpg')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 14,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '23%', padding: 5}}>
                <Text > 
                    Главная
                </Text>

                <Image source ={require('../../../assets/main.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                                    margin: 2
                }}/>
            </View>


        </View>


















        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{alignSelf: 'center', fontSize: 12}}>
                    Подписки
                </Text>

                <Image source ={require('../../../assets/podpis.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 5,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text>
                    Диалоги
                </Text>

                <Image source ={require('../../../assets/message.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 5,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text>
                    Профиль
                </Text>
                
                <Image source ={require('../../../assets/profile.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 14,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{fontSize: 13, alignSelf: 'center'}}> 
                    Достиж.
                </Text>

                <Image source ={require('../../../assets/ach1.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                                    margin: 2
                }}/>
            </View>
        </View>


















        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{alignSelf: 'center', }}>
                    Фирмы
                </Text>

                <Image source ={require('../../../assets/ologo.jpg')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{alignSelf: 'center', }}>
                    Сделки
                </Text>

                <Image source ={require('../../../assets/handshake.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{alignSelf: 'center', }}>
                    Форум
                </Text>

                <Image source ={require('../../../assets/forum.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 5,
                                    margin: 2
                }}/>
            </View>

            <View style={{flexDirection: 'column', width: '20%', padding: 5}}>
                <Text style={{alignSelf: 'center', fontSize: 12}}>
                    Настройки
                </Text>

                <Image source ={require('../../../assets/nastr.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: 5,
                                    margin: 2
                }}/>
            </View>  
        </View>

















        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flexDirection: 'column', padding: 5, alignItems: 'center'}}>
                <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: 'bold'}}>
                    Дать объявление
                </Text>

                <Image source ={require('../../../assets/create.png')} style={{
                                    width: `${windowWidth}` / 7,
                                    height: `${windowWidth}` / 7,
                                    borderRadius: `${windowWidth}` / 14,
                }}/>
            </View>    
        </View>












    </View>
    );
    };

export default MenuModal;

const styles = StyleSheet.create({
    modalInner:{
        width: '90%',
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10
    },
});
