import React from 'react'
import Registration from './src/pages/Registration';
import Main from './src/pages/MainPage'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MainTicket from './src/pages/MainTicket';
import  FirmInfo  from './src/pages/FirmInfo';
import UserPage from './src/pages/UserPage';
import TicketPage from './src/pages/TicketPage';
import CreateTicket from './src/pages/CreateTicket';
import OpenedCase from './src/pages/OpenedCase';
import {OpenedCasePage} from './src/pages/OpenedCasePage';
import CreateFirm from './src/pages/CreateFirm';
import {Knowledge} from './src/pages/Knowledge';
import TablezTop from './src/pages/TablezTop';
import MainContractor from './src/pages/MainContractor';
import CRMMainPage from './src/crm/pages/CRMMainPage';
import ObjectPage from './src/crm/pages/ObjectPage';
import ProjectPage from './src/crm/pages/ProjectPage';
import WorkersSchedule from './src/crm/pages/WorkersSchedule';
import MaterialsSchedule from './src/crm/pages/MaterialsSchedule';
import RegisterObjectPage from './src/crm/registerpages/RegisterObjectPage';
import RegisterProcessPage from './src/crm/registerpages/RegisterProcessPage';
import CheckInWorker from './src/crm/registerpages/CheckInWorker';
import WastedMatierals from './src/crm/registerpages/WastedMaterials';
import ContractsPage from './src/crm/pages/ContractsPage';
import CurrentContractPage from './src/crm/pages/CurrentContractPage';
import ConnectToProcess from './src/crm/registerpages/ConnectToProcess';
import GreetingsPage from './src/crm/pages/GreetingsPage';
import LoginPage  from './src/pages/LoginPage';
import RoleChoicePage  from './src/pages/RoleChoicePage';
import YourBrigadesPage from './src/crm/pages/YourBrigadesPeoplePage';
import YourContractsPage from './src/crm/pages/YourContractsPage';
import BuildingObjectsPage from './src/crm/pages/yourobjectpages/BuildingObjectsPage';
import ContractObjectsPage from './src/crm/pages/yourobjectpages/ContractObjectsPage';
import FutureObjectsPage from './src/crm/pages/yourobjectpages/FutureObjectsPage';
import SkladsPage from './src/crm/pages/yourobjectpages/SkladsPage';
import YourBrigadesPeoplePage from './src/crm/pages/YourBrigadesPeoplePage';
import RequestBrigadePage from './src/crm/pages/RequestBrigadePage';
import YourBrigadesTechnicsPage from './src/crm/pages/YourBrigadesTechnicsPage';
import YourRunningContractsPage from './src/crm/pages/yourcontractpages/YourRunningContractsPage';
import YourFutureContractsPage from './src/crm/pages/yourcontractpages/YourFutureContractsPage';
import YourFinishedContractsPage from './src/crm/pages/yourcontractpages/YourFinishedContractsPage';
import YourOutgoingContractsPage from './src/crm/pages/yourcontractpages/YourOutgoingContractsPage';
import YourIncomingContractsPage from './src/crm/pages/yourcontractpages/YourIncomingContractsPage';
import YourInProgressContractsPage from './src/crm/pages/yourcontractpages/YourInProgressContractsPage';
import RegisterTicketPage from './src/pages/RegisterTicketPage';
import MainAddReg from './src/pages/MainAddReg';
import MainMarketPlace from './src/pages/MainMarketPlace';
import MainMPlaceContr from './src/pages/MainMPlaceContr';
import DialogPage from './src/pages/DialogPage';
import ConnectToProcessPage from './src/crm/pages/ConnectToProcessPage';
import AddMoneyPage from './src/pages/AddMoneyPage';
import WalletPage from './src/pages/WalletPage';
import CurrentDialogPage from './src/pages/CurrentDialogPage';
import ClosedDialogPage from './src/pages/ClosedDialogPage';
import { ClosedCasePage } from './src/pages/ClosedCasePage';


const Stack = createStackNavigator();


export default function Navigate() {
    return <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
        

                <Stack.Screen 
                    name="GreetingsPage"
                    component={GreetingsPage}
                />

                <Stack.Screen 
                    name="Main"
                    component={Main}
                />

                <Stack.Screen 
                    name="RoleChoicePage"
                    component={RoleChoicePage}
                />

                <Stack.Screen 
                    name="MainMarketPlacePage"
                    component={MainMarketPlace}
                />

                <Stack.Screen 
                    name="MainMPlaceContrPage"
                    component={MainMPlaceContr}
                />

                <Stack.Screen 
                    name="RegisterTicketPage"
                    component={RegisterTicketPage}
                />

                <Stack.Screen 
                    name="MainAddReg"
                    component={MainAddReg}
                />

                <Stack.Screen 
                    name="CRMMainPage"
                    component={CRMMainPage}
                />

                <Stack.Screen 
                    name="DialogPage"
                    component={DialogPage}
                />

                {/* Страницы Объектов */}

                <Stack.Screen 
                    name="BuildingObjectsPage"
                    component={BuildingObjectsPage}
                />
                <Stack.Screen 
                    name="ContractObjectsPage"
                    component={ContractObjectsPage}
                />
                <Stack.Screen 
                    name="FutureObjectsPage"
                    component={FutureObjectsPage}
                />

                <Stack.Screen 
                    name="SkladsPage"
                    component={SkladsPage}
                />
                <Stack.Screen 
                    name="ObjectPage"
                    component={ObjectPage}
                />

                <Stack.Screen 
                    name="ClosedCasePage"
                    component={ClosedCasePage}
                />


                <Stack.Screen 
                    name="ClosedDialogPage"
                    component={ClosedDialogPage}
                />



                <Stack.Screen 
                    name="YourBrigadesPeoplePage"
                    component={YourBrigadesPeoplePage}
                />
                <Stack.Screen 
                    name="YourBrigadesTechnicsPage"
                    component={YourBrigadesTechnicsPage}
                />

                <Stack.Screen 
                    name="WalletPage"
                    component={WalletPage}
                />



                <Stack.Screen 
                    name="CurrentDialogPage"
                    component={CurrentDialogPage}
                />
                <Stack.Screen 
                    name="YourOutgoingContractsPage"
                    component={YourOutgoingContractsPage}
                />
                <Stack.Screen 
                    name="YourIncomingContractsPage"
                    component={YourIncomingContractsPage}
                />
                <Stack.Screen 
                    name="YourInProgressContractsPage"
                    component={YourInProgressContractsPage}
                />
                <Stack.Screen 
                    name="YourRunningContractsPage"
                    component={YourRunningContractsPage}
                />
                <Stack.Screen 
                    name="YourFutureContractsPage"
                    component={YourFutureContractsPage}
                />
                <Stack.Screen 
                    name="YourFinishedContractsPage"
                    component={YourFinishedContractsPage}
                />




                <Stack.Screen 
                    name="ContractsPage"
                    component={ContractsPage}
                />

                <Stack.Screen 
                    name="RequestBrigadePage"
                    component={RequestBrigadePage}
                />

                <Stack.Screen 
                    name="ConnectToProcessPage"
                    component={ConnectToProcessPage}
                />

                <Stack.Screen 
                    name="AddMoneyPage"
                    component={AddMoneyPage}
                />


                <Stack.Screen 
                    name="ProjectPage"
                    component={ProjectPage}
                />
                <Stack.Screen 
                    name="CurrentContractPage"
                    component={CurrentContractPage}
                />
                <Stack.Screen 
                    name="ConnectToProcess"
                    component={ConnectToProcess}
                />
                <Stack.Screen 
                    name="WorkersSchedule"
                    component={WorkersSchedule}
                />
                <Stack.Screen 
                    name="MaterialsSchedule"
                    component={MaterialsSchedule}
                />
                <Stack.Screen 
                    name="HHMain"
                    component={Main}
                />
                <Stack.Screen 
                    name="RegistrationPage"
                    component={Registration}
                />
                <Stack.Screen 
                    name="LoginPage"
                    component={LoginPage}
                />
                <Stack.Screen 
                    name="RegisterObjectPage"
                    component={RegisterObjectPage}
                />
                <Stack.Screen 
                    name="RegisterProcessPage"
                    component={RegisterProcessPage}
                />
                <Stack.Screen 
                    name="CheckInWorker"
                    component={CheckInWorker}
                />
                <Stack.Screen 
                    name="WastedMaterials"
                    component={WastedMatierals}
                />
                <Stack.Screen 
                    name="UserPage"
                    component={UserPage}
                />
                <Stack.Screen 
                    name="MainTicket"
                    component={MainTicket}
                />
                <Stack.Screen 
                    name="MainContractor"
                    component={MainContractor}
                />
                <Stack.Screen 
                    name="FirmInfo"
                    component={FirmInfo}
                />
                <Stack.Screen 
                    name="TicketPage"
                    component={TicketPage}
                />
                <Stack.Screen 
                    name="OpenedCase"
                    component={OpenedCase}
                />
                <Stack.Screen 
                    name="CreateTicket"
                    component={CreateTicket}
                />
                <Stack.Screen 
                    name="OpenedCasePage"
                    component={OpenedCasePage}
                />
                <Stack.Screen 
                    name="CreateFirm"
                    component={CreateFirm}
                />
                <Stack.Screen 
                    name="Knowledge"
                    component={Knowledge}
                />
                <Stack.Screen 
                    name="TablezTop"
                    component={TablezTop}
                />
            </Stack.Navigator>
        

    </NavigationContainer>
}


