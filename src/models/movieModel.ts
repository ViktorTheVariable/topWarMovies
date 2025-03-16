export interface IMovie {
    id: number;
    title: string;
    plot: string;
    releaseYear: number;
    director: string;
    writers: string[];
    actors: string[];
    length: string;
    warType: string;
    imdbRating: {
        userRating: number;
        expertRating: number;
    };
    language: string[];
    country: string[];
    media: {
        imageUrl: string;
        trailerUrl: string;
    };
}

export type newMovie = Omit<IMovie, 'id'>;

export let movies: IMovie[] = [
    {   
        id: 1, 
        title: "Apocalyse Now",
        plot: "One of the best and most important movies ever made.",
        releaseYear: 1979,
        director: "Francis Ford Coppola",
        writers: ['Francis Ford Coppola', 'John Milius', 'Micheal Herr'],
        actors: ['Martin Sheen', 'Marlon Brando', 'Robert Duvall'],
        length: "2h27min",
        warType: "Vietnam",
        imdbRating: {
            userRating: 8.4,
            expertRating: 9.4
        },
        language: ["English", "French", "Filipino"],
        country: ["USA", "Philippines"],
        media: {
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMjA5NTE3NzYwMF5BMl5BanBnXkFtZTgwNzU1NzE2NzM@._V1_.jpg",
            trailerUrl: "https://www.youtube.com/watch?v=VWx6Lj4Xz3o"
        }
    },
    {   id: 2, 
        title: "The Thin Red Line",
        plot: "One of the most spiritual warmovies ever made.",
        releaseYear: 1998,
        director: "Terrence Malick",
        writers: ['Terrence Malick', 'James Jones'],
        actors: ['Jim Caviezel', 'Sean Penn', 'Nick Nolte'],
        length: "2h50min",
        warType: "World War 2",
        imdbRating: {
            userRating: 7.6,
            expertRating: 7.8
        },
        language: ["English", "Japanese", "Greek"],
        country: ["Australia", "Solomon Islands", "USA"],
        media: {
            imageUrl: "https://m.media-amazon.com/images/M/MV5BMTQ1NzM5NjQzM15BMl5BanBnXkFtZTgwNzU1NzE2NzM@._V1_.jpg",
            trailerUrl: "https://www.youtube.com/watch?v=VWx6Lj4Xz3o"
        }
    },
];