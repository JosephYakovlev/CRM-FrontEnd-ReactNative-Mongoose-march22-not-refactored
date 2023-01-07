import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { WorkFlowCard } from '../fetchedcards/WorkFlowCard';
import { ProcessesFetch } from '../components/ProcessesFetch';




const windowWidth = Dimensions.get('window').width;

const ObjectPage = (object) => {
      
    const navigation = useNavigation();

    const currentObject = object.route.params
    ;

    
    
        const routeRegisterProcessPage = () =>{
            navigation.navigate('RegisterProcessPage',currentObject)
        }

        const routeCRMMainPage = () =>{
            navigation.navigate('CRMMainPage')
        }

        const routeProjectPage = () =>{
            navigation.navigate('ProjectPage',workflow);
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
                        <Image source ={require('../../../assets/crm/logo.png')} style={{
                            height: 70,
                            width: 50,
                            marginVertical: 10,
                        }} />
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.projectPlace} onPress={routeCRMMainPage} >
                <Image source ={require('../../../assets/crm/icons/villa1.jpg')} style={{
                                        alignSelf: 'center',
                                        width: `${windowWidth}`/3,
                                        height: `${windowWidth}`/5,
                                        margin: 10
                }}/>

                <View style={styles.projectDescription}>
                    <Text style={{alignSelf: 'center', fontSize: 18}}>
                        {currentObject.mainTitle || '----'}
                    </Text>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Адрес:
                        </Text>

                        <Text style={{color: 'blue'}}>
                            {currentObject.adress || '----'}
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Бюджет:
                        </Text>

                        <Text style={{color: 'green'}}>
                            {currentObject.budget || '----'}
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Начало работ:
                        </Text>

                        <Text style={{color: 'blue'}}>
                            {currentObject.start || '----'}
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Финал работ:
                        </Text>

                        <Text style={{color: 'blue'}}>
                            {currentObject.end || '----'}
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Процессов:
                        </Text>

                        <Text style={{color: 'blue'}}>
                            {currentObject.processes.length}
                        </Text>
                    </View>

                    <View style={styles.projectDescElement}>
                        <Text>
                            Выполнено работ:
                        </Text>

                        <Text style={{color: 'red'}}>
                            0%
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>



           <ProcessesFetch  object = {object} /> 

           <View style={{ alignSelf: 'center', marginVertical: 40, alignItems: 'center'}}>
                <Text style={{fontSize: 18, fontWeight: '500'}}>
                    Здесь выведены 
                </Text>

                <Text style={{fontSize: 20, fontWeight: '600', color: 'blue'}}>
                    планируемые процессы
                </Text>

                <Text style={{fontSize: 18, fontWeight: '500'}}>
                    на вашем объекте
                </Text>

            </View>

            <View style={{backgroundColor: 'grey', minHeight: 1, marginBottom: 10}}>

            </View>


           <TouchableOpacity onPress={routeRegisterProcessPage} style={styles.addButton}>

                <Text style={{fontSize: 18,color: 'black'}}>
                    Добавить Процесс
                </Text>

            </TouchableOpacity>

            <View style={{bottom: 0, position: 'absolute'}}>
            
            
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

export default ObjectPage

const styles = StyleSheet.create({
   container: {
        height: '100%',
   },
   profilebar: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    projectPlace: {
        width: '100%',
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    addButton:{
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width:'80%',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        minHeight: 60,
        backgroundColor: 'lightgrey',
    },
    projectDescription:{
        width: '60%',
        left: 10
    },
    projectDescElement:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    image:{
        width: 140,
        height: 100,
        borderRadius: 5,
    },
});

