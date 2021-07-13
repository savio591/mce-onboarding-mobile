import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../pages/Home";
import { EditProfile } from "../pages/EditProfile";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="EditProfile" component={EditProfile} />
    </Navigator>
  );
}
