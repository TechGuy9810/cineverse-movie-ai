
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilmIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="w-full py-4 px-6 bg-cinema border-b border-cinema-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <FilmIcon className="h-8 w-8 text-cinema-accent" />
            <h1 className="text-2xl font-bold text-white">
              Reel<span className="text-cinema-accent">Stats</span>
            </h1>
          </div>
          
          <form onSubmit={handleSearch} className="flex w-full md:w-1/2 items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for movies..."
                className="pl-10 bg-cinema-muted border-cinema-border text-cinema-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary">Search</Button>
          </form>

          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-cinema-foreground hover:text-cinema-accent">
              My Ratings
            </Button>
            <Button className="bg-cinema-accent hover:bg-cinema-accent/90 text-white">
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
