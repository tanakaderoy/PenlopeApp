import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback } from 'react';

import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

function NarcanScreen() {
  const flip = useSharedValue(0);
  const flipToFrontStyle = useAnimatedStyle(() => {
    let rotation = interpolate(flip.value, [0, 180], [0, 180]);

    return {
      transform: [
        {
          rotateY: `${rotation}deg`,
        },
      ],
    };
  });
  const flipToBackStyle = useAnimatedStyle(() => {
    let rotation = interpolate(flip.value, [0, 180], [180, 360]);

    return {
      transform: [
        {
          rotateY: `${rotation}deg`,
        },
      ],
    };
  });

  const { width, height } = useWindowDimensions();

  // const flipToFrontStyle = {
  //   transform: [
  //     {
  //       rotateY: flipAnimation.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg'],
  //       }),
  //     },
  //   ],
  // };

  // const flipToBackStyle = {
  //   transform: [
  //     {
  //       rotateY: flipAnimation.interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['180deg', '360deg'],
  //       }),
  //     },
  //   ],
  // };

  const flipToFront = useCallback(() => {
    // Animated.timing(flipAnimation, {
    //   toValue: 180,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start();
    flip.value = withTiming(180, { duration: 300 });
  }, []);

  const fliptoBack = useCallback(() => {
    // Animated.timing(flipAnimation, {
    //   toValue: 0,
    //   duration: 300,
    //   useNativeDriver: true,
    // }).start();
    flip.value = withTiming(0, { duration: 300 });
  }, []);

  const onPress = useCallback(() => {
    !!flip.value ? fliptoBack() : flipToFront();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 16,
        }}
      >
        <NarcanImage
          style={[
            {
              width: 400,
              height: 400,
              borderRadius: 16,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            },
            flipToBackStyle,
          ]}
        />
        <Directions
          style={[
            {
              width: 400,
              height: 450,
              backgroundColor: '#FF8787',
              borderRadius: 16,
              backfaceVisibility: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
            },
            flipToFrontStyle,
          ]}
        />
      </View>
      <View style={[{ width: 400, paddingTop: 30, borderRadius: 10 }]}>
        <Button title="Flip" onPress={onPress} />
      </View>
    </View>
  );
}

function Directions(p) {
  const { style, ...props } = p;
  return (
    <Animated.View style={[style]} {...props}>
      <Text style={{ fontSize: 40, fontWeight: '700' }}>Directions:</Text>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 16,
        }}
      >
        <Text>
          Gently insert the Narcan spray into one nostril, positioning your
          pointer and middle finger on either side of the nose leaving your
          thumb avaliable to push the nasal spray. Using your thumb push the
          spray into the nostril and wait 2 minutes. If the patient does not
          respond in 2 minutes open a pack and repeat the steps in the other
          nostril.
        </Text>
      </View>

      <Overdose />
      <Help />
    </Animated.View>
  );
}
function NarcanImage(p) {
  const { style, ...props } = p;
  const img = {
    uri: 'https://cdn.shopify.com/s/files/1/0996/0350/products/narcan_overdose_nasal_spray_1800x1800.jpg?v=1661946912',
  };
  return (
    <Animated.View style={[style]} {...props}>
      <Image style={styles.image} source={img} />
    </Animated.View>
  );
}
function Overdose() {
  return (
    <View style={{ width: '100%', marginTop: 40 }}>
      <Text style={{ alignSelf: 'center', fontSize: 40, fontWeight: '700' }}>
        Signs of:
      </Text>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderBottomColor: 'transparent',
            height: 160,
            width: '50%',
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>Overdose:{'\n'}</Text>
            Blue/Grey Lips Uncouncious person that is unable to be woken up
            Breathing very slow or not at avaliable Make sure to call 911 if you
            suspect that it is an overdose
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderBottomColor: 'transparent',
            height: 160,
            width: '50%',
            padding: 5,
          }}
        >
          <Text style={{ fontSize: 12 }}>
            <Text style={{ fontWeight: 'bold' }}>Substance Abuse:{'\n'}</Text>
            Desire in which to take opioids regardless of the potential social,
            economic or health consequences that could occur. An overpowering
            need that drives the individual to seek out opioids with no care of
            the risks. Withdrawal occurs when not taking
          </Text>
        </View>
      </View>
    </View>
  );
}
function Help() {
  return (
    <View style={{ margin: 10 }}>
      <Text>
        Help line:{' '}
        <Text
          style={{ textDecorationLine: 'underline', color: 'blue' }}
          onPress={() => Linking.openURL('tel:18006624357')}
        >
          1-800-662-HELP
        </Text>
      </Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NarcanScreen"
          component={NarcanScreen}
          options={{
            title: 'Narcan (Narcan)',
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 400,
    width: 400,
  },
});
