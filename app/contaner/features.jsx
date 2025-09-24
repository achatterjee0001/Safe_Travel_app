import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { f1, f2, f3, f4, f5, f6, f7 } from '../../assets/index.js';
// Get screen dimensions
const {width, height} = Dimensions.get('window');

// Define the data for each onboarding slide
const slides = [
  {
    id: '1',
    title: 'Digital Tourist ID',
    description: 'secure, tamper-proof ID for safe travel.',
    image: f1,
  },
  {
    id: '2',
    title: 'Safety Score',
    description: 'personalized safety rating for your trip/location.',
    image: f2,
  },
  {
    id: '3',
    title: 'Geo-fencing Alerts',
    description: 'notifications when entering/exiting risky or restricted zones.',
    image: f3,
  },
  {
    id: '4',
    title: 'Live Tracking',
    description: 'share your live location with trusted contacts or authorities.',
    image: f4,
  },
  {
    id: '5',
    title: 'Panic/SOS Button',
    description: 'one-tap emergency alert to police/tourism authority.',
    image: f5,
  },
  {
    id: '6',
    title: 'Multilingual SOS Support',
    description: 'chat bubble with globe/language icon.',
    image: f6,
  },
  {
    id: '7',
    title: 'AI Safety Monitoring',
    description:
      'background detection of unusual activity (route deviation, inactivity, distress)',
    image: f7,
  },
];

// Component for a single slide
const Slide = ({item}) => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageOuterCircle}>
        <View style={styles.imageInnerCircle}>
          <Image source={item.image} style={styles.image} />
        </View>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

// Main Onboarding Screen Component
const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef(null);
  const navigation = useNavigation();

  // Function to update the current slide index when user swipes
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // Function to go to the next slide
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  // Function to go to the previous slide
  const goToPrevSlide = () => {
    const prevSlideIndex = currentSlideIndex - 1;
     if (prevSlideIndex >= 0) {
      const offset = prevSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentSlideIndex(prevSlideIndex);
    }
  };

  // Function to skip to the last slide
  const skip = () => {
    navigation.navigate('MainApp');
  };

  // Footer component with pagination and navigation buttons
  const Footer = () => {
    return (
      <View style={styles.footerContainer}>
         <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToPrevSlide}
          style={[styles.arrowBtn, currentSlideIndex === 0 && {opacity: 0}]}>
          <Text style={styles.arrowText}>←</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentSlideIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={currentSlideIndex === slides.length - 1 ? () => navigation.navigate('MainApp') : goToNextSlide}
          style={styles.arrowBtn}>
          <Text style={styles.arrowText}>
            {currentSlideIndex === slides.length - 1 ? 'Get Started' : '→'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeTitle}>
        Welcome to{'\n'}Save Travel App
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={skip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.7}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
        keyExtractor={item => item.id}
        scrollEnabled={false} // Make the image container not scrollable by user
      />
      <TouchableOpacity activeOpacity={0.8} onPress={skip} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A5A9D',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 80,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    
  },
  slideContainer: {
    width: width,
    alignItems: 'center',
    // Remove position: 'fixed', top: '-40' for better layout
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -100,
  },
  imageOuterCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageInnerCircle: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 10,
  },
  description: {
    color: '#E0E0E0',
    fontSize: 16,
    marginTop: 10,
    maxWidth: '80%',
    textAlign: 'center',
    lineHeight: 23,
  },
  footerContainer: {
    height: height * 0.1,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
    marginHorizontal: 5,
    opacity: 0.4
  },
  paginationDotActive: {
    backgroundColor: '#4A90E2',
    opacity: 1
  },
  arrowBtn: {
    padding: 10,
  },
  arrowText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    top: height * 0.68 + 120, // Move skip button a bit further down
    alignSelf: 'center',
    zIndex: 1,
  },
  skipText: {
      color: '#E0E0E0',
      fontSize: 18,
      fontWeight: 'bold',
  }
});

export default OnboardingScreen;
