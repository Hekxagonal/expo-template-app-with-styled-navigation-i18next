import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "~hooks/useAuth";
import React from "react";
import { StatusBar } from "react-native";

import { HomeScreen } from "~pages/Home";

export const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        translucent
        backgroundColor="#304967"
        barStyle="light-content"
      />
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};
