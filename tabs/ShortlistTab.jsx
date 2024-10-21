import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

const ShortlistTab = () => {
  const shortlisted = useSelector(state => state.movies.shortlisted);

  const renderMovieItem = ({item}) => (
    <View style={styles.movieItem}>
      <Image source={{uri: item.Poster}} style={styles.poster} />
      <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
        {item.Title} -({item.Year})
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {shortlisted.length > 0 ? (
        <>
          <Text
            style={{
              color: '#6256CA',
              textAlign: 'center',
              fontSize: 20,
              marginTop: 20,
              fontFamily: 'Roboto-BoldItalic',
            }}>
            Shortlisted Movies
          </Text>
          <FlatList
            data={shortlisted}
            keyExtractor={item => item.imdbID}
            renderItem={renderMovieItem}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <Text style={styles.emptyText}>No movies shortlisted yet.</Text>
      )}
    </View>
  );
};

export default ShortlistTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  movieItem: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F7',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
  },
  poster: {
    width: 50,
    height: 70,
    marginRight: 10,
  },
  listContainer: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
});
