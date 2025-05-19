
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilmIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface HeaderProps {
  onSearch?: (query: string) => void;
  selectedMoods?: string[];
}

const moods = [
  { id: "happy", name: "Happy", emoji: "😊" },
  { id: "crying", name: "Crying", emoji: "😢" },
  { id: "excited", name: "Excited", emoji: "🤩" },
  { id: "dark", name: "Dark", emoji: "🌑" },
  { id: "feel-good", name: "Feel-good", emoji: "🥰" },
];

const Header = ({ onSearch, selectedMoods = [] }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Update search query when selected moods change
  useEffect(() => {
    if (selectedMoods.length > 0) {
      const moodNames = selectedMoods.map(id => 
        moods.find(m => m.id === id)?.name
      ).join(", ");
      
      setSearchQuery(`Mood: ${moodNames}`);
      if (onSearch) {
        onSearch(`Mood: ${moodNames}`);
      }
    }
  }, [selectedMoods, onSearch]);

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
          
          <form onSubmit={handleSearch} className="flex w-full md:w-1/2 flex-col gap-2">
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
            <Button type="submit" variant="secondary" className="md:hidden">Search</Button>
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
