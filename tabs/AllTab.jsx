import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, ActivityIndicator, Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {addMovie, removeMovie} from '../redux/moviesSlice';
import {API_KEY} from '@env';

const AllTab = () => {
  const [text, setText] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const shortlisted = useSelector(state => state.movies.shortlisted);

  const searchMovie = async query => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
      );
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (error) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchMovie(text);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  const handleShortlistToggle = movie => {
    const isShortlisted = shortlisted.some(
      item => item.imdbID === movie.imdbID,
    );
    if (isShortlisted) {
      dispatch(removeMovie(movie));
    } else {
      dispatch(addMovie(movie));
    }
  };

  const renderMovieItem = ({item}) => {
    const isShortlisted = shortlisted.some(
      movie => movie.imdbID === item.imdbID,
    );
    return (
      <View style={styles.movieItem}>
        <Image source={{uri: item.Poster}} style={styles.poster} />
        <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode="tail">
          {item.Title} -({item.Year})
        </Text>
        <Checkbox
          status={isShortlisted ? 'checked' : 'unchecked'}
          onPress={() => handleShortlistToggle(item)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '80%',
          marginTop: '10%',
          alignSelf: 'center',
          flex: 0.5,
        }}>
        <TextInput
          label="Search movie"
          value={text}
          mode="outlined"
          onChangeText={setText}
          outlineColor="indigo"
        />
      </View>
      <View style={{flex: 2}}>
        {loading ? (
          <ActivityIndicator size="small" style={styles.loader} />
        ) : (
          <>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <FlatList
                data={movies}
                keyExtractor={item => item.imdbID}
                renderItem={renderMovieItem}
                contentContainerStyle={styles.listContainer}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default AllTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loader: {
    marginTop: 20,
  },
  listContainer: {
    padding: 10,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
