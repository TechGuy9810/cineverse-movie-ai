
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Movie } from "@/types/movie";
import { CalendarIcon, ClockIcon, Star, X } from "lucide-react";

interface MovieDetailProps {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
}

const MovieDetail = ({ movie, open, onClose }: MovieDetailProps) => {
  if (!movie) return null;
  
  const backdropUrl = movie.backdrop_path.startsWith('http') 
    ? movie.backdrop_path 
    : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
  const posterUrl = movie.poster_path.startsWith('http') 
    ? movie.poster_path 
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-cinema-card border-cinema-border text-cinema-foreground overflow-hidden p-0">
        <div className="relative h-64 overflow-hidden">
          <img
            src={backdropUrl}
            alt={`${movie.title} backdrop`}
            className="w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-card to-transparent" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 rounded-full text-white hover:bg-black/20"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6 pt-0">
          <div className="flex flex-col md:flex-row gap-6 -mt-20 relative">
            <div className="w-40 h-60 rounded-lg overflow-hidden shadow-lg flex-shrink-0 border border-cinema-border">
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
            
            <div className="flex-1">
              <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold">{movie.title}</DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{releaseYear}</span>
                </div>
                
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <ClockIcon className="h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  {movie.genres?.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}{index < (movie.genres?.length || 0) - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <div className="flex flex-col items-center justify-center bg-cinema-accent/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1 text-cinema-accent">
                    <Star className="h-5 w-5 fill-cinema-accent" />
                    <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">User Rating</span>
                </div>
                
                {movie.critic_score && (
                  <div className="flex flex-col items-center justify-center bg-cinema-highlight/10 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-1 text-cinema-highlight">
                      <Star className="h-5 w-5 fill-cinema-highlight" />
                      <span className="font-bold text-lg">{movie.critic_score.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Critic Rating</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-muted-foreground">{movie.overview}</p>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button className="bg-cinema-accent hover:bg-cinema-accent/80">
                  Add to Watchlist
                </Button>
                <Button variant="outline" className="border-cinema-border">
                  Rate This Movie
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetail;
