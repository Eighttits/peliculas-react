import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Video } from 'expo-av';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch('http://18.222.23.206:8000/trailers/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const trailer = data.find((item: any) => item.movie === movie.id);
        if (trailer) {
          // Eliminar "image/upload/" de la URL del tráiler
          const cleanedUrl = trailer.trailer_url.replace("image/upload/", "");
          setTrailerUrl(cleanedUrl);
        } else {
          setError('Trailer not found');
        }
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

    fetchTrailer();
  }, [movie.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {trailerUrl && (
        <Video
          source={{ uri: trailerUrl }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          useNativeControls
          style={styles.video}
        />
      )}
      <View style={styles.text_container}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.description}</Text>
        <Text style={styles.releaseDate}>Fecha de lanzamiento: {movie.release_date}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#000',
  },
  text_container:{
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  poster: {
    width: '100%',
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
    color: "#fff",
  },
  releaseDate: {
    fontSize: 14,
    color: '#888',
  },
});

export default MovieDetailsScreen;
