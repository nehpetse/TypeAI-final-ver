import { AlertBox } from '@components/views/Alert'
import { rawdb } from '@db'
import { Theme } from '@lib/theme/ThemeManager'
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin'
import { SplashScreen, Stack } from 'expo-router'
import { setOptions } from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { KeyboardProvider } from 'react-native-keyboard-controller'
SplashScreen.preventAutoHideAsync()
setOptions({
    fade: true,
    duration: 350,
})

const Layout = () => {
    useDrizzleStudio(rawdb)
    const { color } = Theme.useTheme()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <AlertBox />
                <KeyboardProvider>
                    <Stack
                        screenOptions={{
                            headerBackButtonDisplayMode: 'minimal',
                            headerStyle: { backgroundColor: color.neutral._100 },
                            headerTitleStyle: { color: color.text._100 },
                            headerTintColor: color.text._100,
                            contentStyle: { backgroundColor: color.neutral._100 },
                            headerShadowVisible: false,
                            headerTitleAlign: 'center',
                        }}>
                        <Stack.Screen name="index" options={{ animation: 'fade' }} />
                    </Stack>
                </KeyboardProvider>
            </MenuProvider>
        </GestureHandlerRootView>
    )
}

export default Layout
