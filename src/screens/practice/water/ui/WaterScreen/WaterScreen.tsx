import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './WaterScreenStyle';

type WaterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.WATER
>;

export const WaterScreen = ({ navigation }: WaterScreenProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  const onPressNextHandler = () => {
    navigation.navigate(AppNavigation.BREATHE);
  };

  const onPressBacktHandler = () => {
    navigation.navigate(AppNavigation.MORNING);
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        automaticallyAdjustContentInsets={true}
        bounces={false}
        bouncesZoom={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.header}>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'black') }}>
            {t('breathe.2.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('green.500', 'green.600') }}>
            {t('breathe.2.description')}
          </CustomText>
        </View>
        <View style={[styles.content]}>
          <Lottie
            style={[styles.animation]}
            resizeMode={'cover'}
            source={Anims.Water}
            loop={true}
            autoPlay={true}
          />
          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('slate.200', 'slate.800') }]}>
            {t('breathe.2.info')}
          </CustomText>
        </View>

        <View style={styles.footer}>
          <NavigationSplash
            onPressBack={onPressBacktHandler}
            onPressNext={onPressNextHandler}
          />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
