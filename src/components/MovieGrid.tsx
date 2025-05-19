
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/movie";
import { motion } from "framer-motion";

interface MovieGridProps {
  movies: Movie[];
  onSelectMovie?: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelectMovie }: MovieGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <MovieCard 
            movie={movie} 
            onClick={() => onSelectMovie?.(movie)}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MovieGrid;
