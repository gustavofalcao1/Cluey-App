import React from 'react';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { isAndroid } from '@freakycoder/react-native-helpers';
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocaleContext } from '../../components/locale';
import { ThemeContext } from '../../components/theme';
import { MainTitle, ChatsMenuButton, ContactsMenuButton, HomeButton, CloseMenuButton, LogoutButton, LanguageSelector, SettingsButton, CloseModal } from '../../components/tools';

import Home from './Home';
// Menu
import Chats from './Chats';
import Contacts from './Contacts';
// Settings
import Settings from './Settings';
import Preferences from './Settings/Preferences';
import ChangeEmail from './Settings/Preferences/Components/changeEmail';
import ChangePassword from './Settings/Preferences/Components/changePassword';

import About from '../Utils/About';
import Rules from '../Utils/Rules';

const AppStack = createStackNavigator();

const App = () => {
  const {locale} = React.useContext(LocaleContext);
  const {theme} = React.useContext(ThemeContext);

  return (
    <AppStack.Navigator screenOptions={{
      gestureEnabled: true,
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity:  0.10,
        shadowRadius: 1.51,
        elevation: 4
      },
      headerBackTitleVisible: true,
      headerTitleAlign: 'center',
      headerBackImage: () => <Ionicons name="chevron-back" size={28} color={theme.primary}/>,
      headerTintColor: theme.primary,
    }}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => <ChatsMenuButton navigation={navigation} />,
          headerTitle: () => <MainTitle />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      {/* Menu */}
      <AppStack.Screen
        name="Chats"
        component={Chats}
        options={({ navigation }) => ({
          headerLeft: () => <ContactsMenuButton navigation={navigation} />,
          headerTitle: () => <MainTitle />,
          headerRight: () => <CloseMenuButton navigation={navigation} />,
        })}
      />
      {/* Menu */}
      <AppStack.Screen
        name="Contacts"
        component={Contacts}
        options={({ navigation }) => ({
          headerLeft: () => <HomeButton navigation={navigation} />,
          headerTitle: () => <MainTitle />,
          headerRight: () => <CloseMenuButton navigation={navigation} />,
        })}
      />
      {/* Settings */}
      <AppStack.Screen 
        name="Settings" 
        component={Settings}
        options={{
          headerTitle: locale.settings.title,
          headerRight: () => <LanguageSelector/>,
          headerRightContainerStyle: {
            marginTop: 5,
          },
          headerTintColor: theme.primary,
          headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 24,
          },
        }}
      />
      <AppStack.Screen
        name="Preferences"
        component={Preferences}
        options={({navigation}) => ({
          headerTitle: locale.preferences_config.title,
          headerRight: () => <LogoutButton navigation={navigation}/>,
          headerTintColor: theme.primary,
          headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 24,
          },
          headerBackTitleVisible: false,
        })}
      />
      <AppStack.Group screenOptions={{
        headerLeft: null,
        headerTitle: () => <CloseModal/>,
        headerStyle: {
          height: 40,
          shadowColor: "#000",
          shadowOffset: {width: 0, height: 1},
          shadowOpacity:  0.10,
          shadowRadius: 1.51,
          elevation: 4
        },
        headerTitleAlign: 'center',
        presentation: 'modal',
        ...( isAndroid && TransitionPresets.ModalPresentationIOS )
      }}>
        <AppStack.Screen name="ChangeEmail" component={ChangeEmail}/>
        <AppStack.Screen name="ChangePassword" component={ChangePassword}/>
        <AppStack.Screen name="About" component={About}/>
        <AppStack.Screen name="Rules" component={Rules}/>
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default App;