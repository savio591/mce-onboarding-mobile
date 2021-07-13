import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";
import { colors } from "../styles/colors";

export function Routes() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={Platform.OS === "android" ? 100 : "large"}
          color={colors.purple}
        />
      </View>
    );

  return user ? <AppRoutes /> : <AuthRoutes />;
}
