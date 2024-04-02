import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationProp } from "../routes/auth.routes";
import Toast from "react-native-toast-message";

type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
};

type AuthContextData = {
  SingIn: (
    email: string,
    password: string,
    toggleCheckBox: boolean
  ) => Promise<void>;
  registerAccount: (
    email: string,
    password: string,
    name: string,
    imageUrl: string
  ) => Promise<void>;
  SingOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updatePassword: (
    newPassword: string,
    currentPassword: string
  ) => Promise<void>;
  updateUser: (
    userId: string,
    newName: string,
    newImageUrl: string
  ) => Promise<void>;
  islogin: boolean;
  isLoading: boolean;
  User: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const USER_COLLETION = "@IcetFlix:users";

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [islogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [User, setUser] = useState<User | null>(null);

  async function SingIn(
    email: string,
    password: string,
    toggleCheckBox: boolean
  ) {
    setIsLogin(true);

    try {
      const account = await auth().signInWithEmailAndPassword(email, password);

      const profile = await firestore()
        .collection("users")
        .doc(account.user.uid)
        .get();

      if (profile.exists) {
        const { name, email, imageUrl } = profile.data() as User;

        const userData = {
          id: account.user.uid,
          name,
          email,
          imageUrl,
        };

        if (toggleCheckBox) {
          await AsyncStorage.setItem(USER_COLLETION, JSON.stringify(userData));
        }
        setUser(userData);
      } else {
        Alert.alert("Login", "Perfil de usuário não encontrado no Firestore");
      }
    } catch (error: any) {
      const { code } = error;

      console.log("aqui", code);
      console.log("aqui2", error);

      if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        Toast.show({
          type: "error",
          text1: "Login",
          text2: "E-mail e/ou senha inválida.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Login",
          text2: "Não foi possível realizar o Login.",
        });
      }
    } finally {
      setIsLogin(false);
    }
  }

  async function registerAccount(
    email: string,
    password: string,
    name: string,
    imageUrl: string
  ) {
    try {
      setIsLoading(true);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const userId = userCredential.user.uid;

      await firestore().collection("users").doc(userId).set({
        email,
        name,
        imageUrl,
      });

      setIsLoading(false);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: "Seu perfil foi criado com sucesso.",
        visibilityTime: 3000,
        autoHide: true,
        onHide: () => {
          navigation.navigate("SignIn");
        },
      });
    } catch (error: any) {
      setIsLoading(false);
      console.error("Erro ao criar conta:", error);

      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          text1: "Erro ao criar conta",
          text2: "O endereço de e-mail já está sendo usado por outra conta.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao criar conta",
          text2: "Ocorreu um erro ao criar a conta.",
        });
      }
      throw error;
    }
  }

  async function loadUserStorageData() {
    setIsLogin(true);

    const storedUser = await AsyncStorage.getItem(USER_COLLETION);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);
    }

    setIsLogin(false);
  }

  async function SingOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLETION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    try {
      const userSnapshot = await firestore()
        .collection("users")
        .where("email", "==", email)
        .get();
      if (userSnapshot.empty) {
        Toast.show({
          type: "error",
          text1: "Redefinir Senha",
          text2:
            "O e-mail fornecido não está associado a uma conta. Por favor, verifique o e-mail e tente novamente.",
        });
        return;
      }
      await auth().sendPasswordResetEmail(email);
      Toast.show({
        type: "success",
        text1: "Redefinir Senha",
        text2: "Enviamos um link no seu e-mail para redefinir sua senha.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Redefinir Senha",
        text2:
          "Não foi possível enviar o e-mail para redefinir sua senha. Por favor, tente novamente mais tarde.",
      });
    }
  }

  async function updatePassword(newPassword: string, currentPassword: string) {
    try {
      setIsLoading(true);
      const user = auth().currentUser;

      if (user) {
        const credentials = auth.EmailAuthProvider.credential(
          user?.email!,
          currentPassword
        );
        await user.reauthenticateWithCredential(credentials);

        await user.updatePassword(newPassword);

        setIsLoading(false);
        Toast.show({
          type: "success",
          text1: "Senha Atualizada",
          text2: "Sua senha foi atualizada com sucesso.",
        });
      } else {
        throw new Error("Usuário não encontrado.");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Erro ao atualizar a senha:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar a senha",
        text2:
          "Ocorreu um erro ao atualizar sua senha. Por favor, tente novamente mais tarde.",
      });
      throw error;
    }
  }

  async function updateUser(
    userId: string,
    newName: string,
    newImageUrl: string
  ) {
    try {
      setIsLoading(true);
  
      await firestore().collection("users").doc(userId).update({
        name: newName,
        imageUrl: newImageUrl,
      });
  
      setUser((prevUser: User | null) => ({
        ...prevUser!,
        name: newName,
        imageUrl: newImageUrl,
      }));
  
      await loadUserStorageData();
  
      Toast.show({
        type: "success",
        text1: "Dados Atualizados",
        text2: "Seu nome e imagem de perfil foram atualizados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
      Toast.show({
        type: "error",
        text1: "Erro ao atualizar os dados",
        text2:
          "Ocorreu um erro ao atualizar seus dados. Por favor, tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        User,
        isLoading,
        registerAccount,
        SingIn,
        islogin,
        SingOut,
        forgotPassword,
        updatePassword,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
