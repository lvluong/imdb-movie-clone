import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container } from 'bloomer';
import "bulma/css/bulma.css";
import MovieList from "./MovieList"
import spinner from './Spinner.svg';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      loading: true,
      page: 1,
      endPoint: "now_playing"
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async loadMovieEndPoint(endPoint){
    this.setState({
      loading:true
    });
    const apiURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=52e814a73ad425fbb4e9090f0dfb8650'
    const results = await fetch(apiURL)
    const data = await results.json();
    this.movies = data.results;
    await this.sleep(3000);
    this.setState({
      movies: this.movies,
      loading: false
    });
  }

  async componentDidMount(){
    this.loadMovieEndPoint();
  }
  render() {
    let content;
    if(this.state.loading){
      content = <img src={spinner} className="loading-Spinner" alt="spinner" />
    } else {
      content = <MovieList movies = {this.state.movies}/>
    }

    

    const handleRefresh = () => {
      this.setState({
        movies: [],
        loading: true,
        page: 1,
        endPoint: "now_playing"
      });
      this.loadMovieEndPoint("now_playing");
    }

    return (
      <Container>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Very Amateur IMDB</h1>
          </header>
          <Container>
          <button onClick ={handleRefresh}>
            Refresh
          </button>  
          </Container>  
          <Container>
            {content}
          </Container>
        </div>
      </Container>
    );
  }
}

export default App;
