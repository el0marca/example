import { memo } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Entities
import { getIsAuth } from 'entities/auth';
import { getUserIsQuitting } from 'entities/user';

// Features
import { getIsActivation } from 'features/passed-activation';

// Screens
import { AudioScreen } from 'screens/audio/audio';
import { AudioPlayScreen } from 'screens/audio/audio-play';
import { ChangePasswordScreen } from 'screens/auth/change-password';
import { ForgotScreen } from 'screens/auth/forgot';
import { AuthScreen } from 'screens/auth/login';
import { RegistrationScreen } from 'screens/auth/registration';
import { VerifyScreen } from 'screens/auth/verify';
import { AuthorScreen } from 'screens/author';
import { CardsScreen } from 'screens/cards';
import { InputScreen } from 'screens/form/input';
import { PickerScreen } from 'screens/form/picker';
import { FriendQRScreen } from 'screens/friend/friend-QR';
import { FriendAddScreen } from 'screens/friend/friend-add';
import { FriendIdScreen } from 'screens/friend/friend-by-id';
import { FriendScreen } from 'screens/friend/friend-list';
import { FriendPresentScreen } from 'screens/friend/friend-present';
import { NavigationHelpScreen } from 'screens/help-navigation';
import { TrainerHelpScreen } from 'screens/help-trainer';
import { MarketScreen } from 'screens/market';
import { BreatheScreen } from 'screens/practice/breathe';
import { HappyScreen } from 'screens/practice/happy';
import { MindfulnessScreen } from 'screens/practice/mindfulness';
import { MorningScreen } from 'screens/practice/morning';
import { WaterScreen } from 'screens/practice/water';
import { ProfileScreen } from 'screens/profile/profile';
import { ProfileSettingScreen } from 'screens/profile/profile-setting';
import { ProgressScreen } from 'screens/progress';
import { ReadScreen } from 'screens/read/read';
import { ReadDetailsScreen } from 'screens/read/read-details';
import { SubsScreen } from 'screens/subs';
import { ChatScreen } from 'screens/tab-navigation/chat';
import { FeedCreateScreen } from 'screens/tab-navigation/feed/feed-create';
import { FeedDetailsScreen } from 'screens/tab-navigation/feed/feed-details';
import { FeedHelpScreen } from 'screens/tab-navigation/feed/feed-help';
import { FeedsScreen } from 'screens/tab-navigation/feed/feed-list';
import { TaskScreen } from 'screens/task/task';
import { TaskEditScreen } from 'screens/task/task-edit';
import { TrackerScreen } from 'screens/tracker';
import { WelcomeScreen } from 'screens/welcome';
import { WelcomeInfoScreen } from 'screens/welcome-info';

// Shared
import { AppNavigation, NavigationStackLists } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';

// Widgets
import { TabNavigation } from 'widgets/tab-navigation';

const screenObjects = [
  { 
    name: AppNavigation.WELCOME, 
    component: WelcomeScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.MAIN, 
    component: TabNavigation, 
    options: { headerShown: false } 
  },
  { 
    name: AppNavigation.WELCOME_INFO, 
    component: WelcomeInfoScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.AUTH, 
    component: AuthScreen, 
    options: { headerTransparent: true },
    condition: (isAuth: boolean) => !isAuth,
    initialParams: { show: false }
  },
  { 
    name: AppNavigation.REGISTRATION, 
    component: RegistrationScreen, 
    options: { headerTransparent: true },
    condition: (isAuth: boolean) => !isAuth,
    initialParams: { show: false }
  },
  { 
    name: AppNavigation.FORGOT, 
    component: ForgotScreen, 
    options: { headerTransparent: true },
    condition: (isAuth: boolean) => !isAuth,
    initialParams: { show: false }
  },
  { 
    name: AppNavigation.VERIFY, 
    component: VerifyScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.COURSE, 
    component: ReadDetailsScreen, 
    options: { 
      headerTransparent: true, 
      headerBackTitleVisible: false 
    } 
  },
  { 
    name: AppNavigation.READ, 
    component: ReadScreen, 
    options: { 
      headerTransparent: true, 
      headerBackTitleVisible: false 
    } 
  },
  { 
    name: AppNavigation.CARDS, 
    component: CardsScreen, 
    options: { 
      headerTransparent: true, 
      headerBackTitleVisible: false 
    } 
  },
  { 
    name: AppNavigation.TASK, 
    component: TaskScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.TASK_EDIT, 
    component: TaskEditScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.PROGRESS, 
    component: ProgressScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.PROFILE, 
    component: ProfileScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.PROFILE_SETTING, 
    component: ProfileSettingScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.PICKER, 
    component: PickerScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.INPUT, 
    component: InputScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.AUTHOR, 
    component: AuthorScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.SUBS, 
    component: SubsScreen, 
    options: { 
      headerTitleAlign: 'center', 
      headerTransparent: true 
    },
    initialParams: { show: false }
  },
  { 
    name: AppNavigation.MARKET, 
    component: MarketScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.CHANGE_PASSWORD, 
    component: ChangePasswordScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.MORNING, 
    component: MorningScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.WATER, 
    component: WaterScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.BREATHE, 
    component: BreatheScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.HAPPY, 
    component: HappyScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.MINDFULNESS, 
    component: MindfulnessScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FRIEND_ID, 
    component: FriendIdScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.CHAT, 
    component: ChatScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FRIEND, 
    component: FriendScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FRIEND_PRESENT, 
    component: FriendPresentScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FRIEND_QR, 
    component: FriendQRScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FRIEND_ADD, 
    component: FriendAddScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FEED, 
    component: FeedDetailsScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FEED_CREATE, 
    component: FeedCreateScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.FEEDS_ME, 
    component: FeedsScreen 
  },
  { 
    name: AppNavigation.FEED_HELP, 
    component: FeedHelpScreen 
  },
  { 
    name: AppNavigation.AUDIO_PLAY, 
    component: AudioPlayScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.AUDIO, 
    component: AudioScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.TRACKER, 
    component: TrackerScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.TRAINER_HELP, 
    component: TrainerHelpScreen, 
    options: { headerTransparent: true } 
  },
  { 
    name: AppNavigation.NAVIGATION_HELP, 
    component: NavigationHelpScreen, 
    options: { headerTransparent: true } 
  }
];

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  const isActivation = useAppSelector(getIsActivation);
  const isAuth = useAppSelector(getIsAuth);
  const isSmoking = useAppSelector(getUserIsQuitting);

  const { cn } = useTheme();
  const tintColor = cn('white', 'black');

  return (
    <NavigationContainer
      theme={DarkTheme}
      onReady={() => RNBootSplash.hide({ fade: true })}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: tintColor,
          title: '',
          headerBackTitleVisible: false,
        }}
        initialRouteName={
          !isActivation || !isSmoking
            ? AppNavigation.WELCOME
            : AppNavigation.MAIN
        }>
        {screenObjects
          .filter(screen => 
            !screen.condition || screen.condition(isAuth)
          )
          .map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
              options={screen.options}
              initialParams={screen.initialParams}
            />
          ))
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);