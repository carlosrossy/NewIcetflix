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
  
  type User = {
    id: string;
    name: string;
    peso: string;
    altura: string;
    birthDate: string;
    imageUrl: string;
    email: string;
    sexo: string;
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
      peso: string,
      altura: string,
      birthDate: string,
      imageUrl: string,
      sexo: string
    ) => Promise<void>;
    SingOut: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    islogin: boolean;
    isLoading: boolean;
    User: User | null;
  };
  
  type AuthProviderProps = {
    children: ReactNode;
  };
  
  const USER_COLLETION = "@Mymeals:users";
  
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
          const { name, altura, birthDate, email, imageUrl, peso, sexo } =
            profile.data() as User;
  
          const userData = {
            id: account.user.uid,
            name,
            altura,
            birthDate,
            email,
            imageUrl,
            peso,
            sexo,
          };
  
          if (toggleCheckBox) {
            await AsyncStorage.setItem(USER_COLLETION, JSON.stringify(userData));
          }
          setUser(userData);
        } else {
          Alert.alert("Login", "Perfil de usuário não encontrado no Firestore");
        }
      } catch (error) {
        const { code } = error;
  
        console.log(code);
  
        if (
          code === "auth/user-not-found" ||
          code === "auth/wrong-password" ||
          code === "auth/invalid-login"
        ) {
          Alert.alert("Login", "E-mail e/ou senha inválida.");
        } else {
          Alert.alert("Login", "Não foi possível realizar o Login.");
        }
      } finally {
        setIsLogin(false);
      }
    }
  
    async function registerAccount(
      email: string,
      password: string,
      name: string,
      peso: string,
      altura: string,
      birthDate: string,
      imageUrl: string,
      sexo: string
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
          peso,
          altura,
          birthDate,
          imageUrl,
          sexo,
        });
  
        setIsLoading(false);
  
        Alert.alert("Sucesso", "Seu perfil foi criado com sucesso.", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("SingIn");
            },
          },
        ]);
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao criar conta:", error);
  
        if (error.code === "auth/email-already-in-use") {
          Alert.alert(
            "Erro ao criar conta",
            "O endereço de e-mail já está sendo usado por outra conta."
          );
        } else {
          Alert.alert("Erro ao criar conta", "Ocorreu um erro ao criar a conta.");
        }
        throw error;
      }
    }
  
    async function loadUserStorageData() {
      setIsLogin(true);
  
      const storedUser = await AsyncStorage.getItem(USER_COLLETION);
  
      if (storedUser) {
        const userData = JSON.parse(storedUser) as User;
        console.log(userData);
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
      if (!email) {
        return Alert.alert("Redefinir senha", "Informe o e-mail.");
      }
  
      auth()
        .sendPasswordResetEmail(email)
        .then(() =>
          Alert.alert(
            "Redefinir Senha",
            "Enviamos um link no seu e-mail para redefinir sua senha."
          )
        )
        .catch(() =>
          Alert.alert(
            "Redefinir Senha",
            "Não foi possível enviar o e-mail para redefinir sua senha."
          )
        );
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