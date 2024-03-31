import React from "react";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "@global/context/auth";

export default function Routes() {
  const { User } = useAuth();

  return User ? <AppRoutes /> : <AuthRoutes />;
}
