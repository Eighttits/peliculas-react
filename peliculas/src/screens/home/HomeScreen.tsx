import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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

const HomeScreen = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://18.222.23.206:8000/movies/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Movie[] = await response.json();
        setMovies(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
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
        <StatusBar style="auto" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieContainer}
            onPress={() => navigation.navigate('Details', { movie: item })}
          >
            {item.poster_url && (
              <Image
                source={{ uri: item.poster_url }}
                style={styles.poster}
              />
            )}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.releaseDate}>Fecha de lanzamiento: {item.release_date}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieContainer: {
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#808080',
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
    color: '#fff',
  },
  releaseDate: {
    fontSize: 12,
    // color: '#888',
  },
});

export default HomeScreen;
