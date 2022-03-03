import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import NativeDialogManagerAndroid from 'react-native/Libraries/NativeModules/specs/NativeDialogManagerAndroid';
import CommanImage from './src/CommanImage';

const App = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getFoodList();
  }, [page]);

  const getFoodList = () => {
    axios
      .get(
        'https://food2fork.ca/api/recipe/search/?query=beef carrot potato onion&page=' +
          page,
        {
          headers: {
            Authorization: 'Token 9c8b06d329136da358c2d00e76946b0111ce2c48',
          },
        },
      )
      .then(response => {
        setMovie([...movie, ...response.data.results]);
        setLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <CommanImage
          style={styles.images}
          source={{
            uri: item.featured_image,
            priority: FastImage.priority.low,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.containerItem}>
          <Text style={styles.itemTitle}>{item.title} </Text>
          <Text style={styles.itemText}>Auther: {item.publisher} </Text>
          <Text style={styles.itemTextSmall}>Rating: {item.rating} </Text>
        </View>
      </View>
    );
  };

  const separator = () => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'grey',
          marginVertical: 3,
          height: 1,
        }}
      />
    );
  };

  const loadMoreData = () => {
    setPage(page + 1);
    console.log(page);
  };

  const loader = () => {
    return (
      <View>
        <ActivityIndicator size="large" color="primary" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeaderStyle}>Recipes</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.listStyle}
          data={movie}
          ItemSeparatorComponent={separator}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          onEndReached={loadMoreData}
          ListFooterComponent={loader}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'column',
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'column',
  },
  textHeaderStyle: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '500',
  },
  itemTitle: {
    paddingHorizontal: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  itemText: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '300',
  },
  itemTextSmall: {
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: '300',
  },
  images: {
    height: 150,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  listStyle: {
    marginTop: 10,
    width: '100%',
  },
});

export default App;
