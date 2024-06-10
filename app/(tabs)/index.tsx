import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Button } from 'react-native';

export default function TabOneScreen() {
  const [dogImages, setDogImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchDogImages();
  }, []);

  const fetchDogImages = async () => {
    try {
      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "DEMO-API-KEY"
      });

      const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
      };

      const response = await fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=5", requestOptions);
      const data = await response.json();

      setDogImages(data.map(image => image.url));
    } catch (error) {
      console.error('Error fetching dog images:', error);
    }
  };

  const handleNextImage = () => {
    if (dogImages.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dogImages.length);
    }
  };

  return (
    <View style={styles.container}>
      {dogImages.length > 0 && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: dogImages[currentImageIndex] }} style={styles.dogImage} />
          <Button title="Próxima Imagem" onPress={handleNextImage} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  dogImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

