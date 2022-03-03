import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type CommanImageProps = FastImageProps;

const CommanImage: React.FC<CommanImageProps> = ({
  style,
  onLoad,
  onLoadStart,
  source,
  ...props
}) => {
  const [isLoading, setLoading] = React.useState(false);

  const AnimatedFastImage = Reanimated.createAnimatedComponent(
    FastImage as React.FC<FastImageProps>,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opecity: withTiming(isLoading ? 1 : 0, { duration: 500 }),
      transform: [{ scale: withTiming(isLoading ? 1 : 0.7, { duration: 400 }) }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <AnimatedFastImage
        onLoad={evt => {
          onLoad?.(evt);
          setLoading(true);
        }}

        style={[...(Array.isArray(style) ? style : [style]), style]}
        source={isLoading ? source : require('./asset/images/placeholder.png')}
        {...props}
      >
        {!isLoading && (
          <View style={(StyleSheet.absoluteFillObject, styles.loader)}>
            <ActivityIndicator color="black" />
          </View>
        )}
      </AnimatedFastImage>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default CommanImage;
