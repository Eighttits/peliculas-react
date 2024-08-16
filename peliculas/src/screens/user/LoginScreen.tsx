import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Card } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


interface Movie {
  id: number;
  genres: number[];
  actors: number[];
  director: number;
  user: string;
  title: string;
  release_date: string;
  description: string;
  poster_url: string | null;
}

const LoginScreen = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigation = useNavigation();

  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://18.222.23.206:8000/movies/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Movie[] = await response.json();
        setMovies(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="light" backgroundColor="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <StatusBar style="light" backgroundColor="#000" />
      </View>
    );
  }

  const totalMovies = movies.length;
  const idRandom = getRandomInt(totalMovies);
  const movie = movies.find((m) => m.id === idRandom);
  const image = movie?.poster_url
    ? { uri: movie.poster_url }
    : {
        uri: "https://i.etsystatic.com/18242346/r/il/fd61f8/2933715225/il_570xN.2933715225_a913.jpg",
      };

      const loginUser = async () => {
        try {
          const response = await fetch("http://18.222.23.206:8000/api/token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          });
    
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || "Algo salió mal");
          }
    
          const data = await response.json();
          const { access, refresh } = data;
    
          await AsyncStorage.setItem('access_token', access);
          await AsyncStorage.setItem('refresh_token', refresh);
    
          Alert.alert("Inicio de sesión exitoso", "Bienvenido de nuevo");
          // Redirigir a otra pantalla después del inicio de sesión exitoso
          navigation.navigate("Home");
        } catch (error) {
          if (error instanceof Error) {
            Alert.alert("Error", error.message);
          } else {
            Alert.alert("Error", "Ocurrió un error inesperado");
          }
        }
      }; 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />
      <View style={styles.imageContainer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.overlay} />
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dxw4ovutn/image/upload/v1722885804/muysqexxtiajlt0yhnhs.png",
                  }}
                  style={styles.logoImage}
                />
                <TextInput
                  label="Usuario"
                  selectionColor="#000"
                  cursorColor="#000"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  theme={{
                    colors: {
                      primary: "#000",
                      text: "#000",
                      // surfaceVariant: "#39ff14",
                    },
                  }}
                  style={styles.input}
                />
                <TextInput
                  label="Contraseña"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={loginUser}
                >
                  <Text style={styles.textbutton}>Iniciar Sesion</Text>
                </TouchableOpacity>
              </Card.Content>
              <Text style={styles.textinfo} onPress={() => navigation.navigate('SignIn')}>Registrate aqui</Text>
            </Card>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const styles = StyleSheet.create({
  textinfo: {
    color: "#fff",
    marginTop: 3,
    textDecorationLine: "underline",
    textAlign: "right",
    paddingRight: 16,
  },
  textbutton: {
    color: "#fff",
    marginTop: 2,
    marginBottom: 2,
    fontSize: 16,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#1D49A4",
    padding: 10,
    marginTop: 16,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.0)",
    borderRadius: 8,
    marginBottom: 30,
  },
  cardContent: {
    alignItems: "center",
  },
  logoImage: {
    width: 145,
    height: 87,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: "100%",
  },
  container: {
    flex: 1,
  },
});

export default LoginScreen;
