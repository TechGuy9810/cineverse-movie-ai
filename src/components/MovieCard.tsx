
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Movie } from "@/types/movie";
import { StarIcon } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  className?: string;
}

const MovieCard = ({ movie, onClick, className }: MovieCardProps) => {
  const posterUrl = movie.poster_path.startsWith('http') 
    ? movie.poster_path 
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "overflow-hidden relative cursor-pointer movie-card-hover card-gradient",
        className
      )}
    >
      <div className="aspect-[2/3] w-full">
        <img 
          src={posterUrl} 
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=300";
          }}
        />
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-sm truncate flex-1">{movie.title}</h3>
          <div className="flex items-center gap-1 text-cinema-accent">
            <StarIcon className="h-4 w-4 fill-cinema-accent" />
            <span className="text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
          <span>{releaseYear}</span>
          <span>
            {movie.genres && movie.genres.length > 0
              ? movie.genres[0].name
              : "Unknown"}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
