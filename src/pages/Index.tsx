
import FilterPanel from "@/components/FilterPanel";
import Header from "@/components/Header";
import MovieDetail from "@/components/MovieDetail";
import MovieGrid from "@/components/MovieGrid";
import RatingChart from "@/components/RatingChart";
import { topMovies } from "@/data/mockMovies";
import { Movie, MovieFilter, RatingType } from "@/types/movie";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>(topMovies);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(topMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingType, setRatingType] = useState<RatingType>("both");

  useEffect(() => {
    // Initial load toast
    toast.success("Welcome to ReelStats!", {
      description: "Explore and analyze movie data with powerful filters and charts."
    });
  }, []);

  const handleFilterChange = (filters: MovieFilter) => {
    let filtered = [...movies];

    // Filter by genre
    if (filters.genre) {
      filtered = filtered.filter(movie => 
        movie.genres.some(genre => genre.id === filters.genre)
      );
    }

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter(movie => {
        const movieYear = new Date(movie.release_date).getFullYear();
        return movieYear === filters.year;
      });
    }

    // Filter by rating range
    if (filters.rating) {
      filtered = filtered.filter(movie => 
        movie.vote_average >= filters.rating[0] && 
        movie.vote_average <= filters.rating[1]
      );
    }

    // Sort movies
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let valueA, valueB;

        switch (filters.sortBy) {
          case "popularity":
            valueA = a.popularity;
            valueB = b.popularity;
            break;
          case "vote_average":
            valueA = a.vote_average;
            valueB = b.vote_average;
            break;
          case "release_date":
            valueA = new Date(a.release_date).getTime();
            valueB = new Date(b.release_date).getTime();
            break;
          default:
            valueA = a.popularity;
            valueB = b.popularity;
        }

        return filters.sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

    setFilteredMovies(filtered);
    
    // Show toast with filter results
    toast(`Found ${filtered.length} movies`, {
      description: "Filters applied successfully"
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredMovies(movies);
      return;
    }
    
    const searchResults = movies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredMovies(searchResults);
    toast(`Found ${searchResults.length} movies matching "${query}"`);
  };

  const handleRatingTypeChange = (type: RatingType) => {
    setRatingType(type);
  };

  return (
    <div className="min-h-screen bg-cinema flex flex-col">
      <Header onSearch={handleSearch} />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with filters */}
          <div className="lg:col-span-1">
            <FilterPanel 
              onFilterChange={handleFilterChange} 
              onRatingTypeChange={handleRatingTypeChange}
            />
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-gradient">Top Movies</span>
                {searchQuery && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    Search results for "{searchQuery}"
                  </span>
                )}
              </h2>
              
              <MovieGrid 
                movies={filteredMovies} 
                onSelectMovie={(movie) => setSelectedMovie(movie)} 
              />
            </section>
            
            <section>
              <RatingChart movies={filteredMovies} type={ratingType} />
            </section>
          </div>
        </div>
      </main>
      
      <MovieDetail 
        movie={selectedMovie} 
        open={!!selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </div>
  );
};

export default Index;
