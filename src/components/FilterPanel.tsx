
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { genres, yearRange } from "@/data/mockMovies";
import { MovieFilter, RatingType } from "@/types/movie";
import { FilterIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FilterPanelProps {
  onFilterChange: (filters: MovieFilter) => void;
  onRatingTypeChange: (type: RatingType) => void;
  onMoodSelect: (moods: string[]) => void;
}

const moods = [
  { id: "happy", name: "Happy", emoji: "😊" },
  { id: "crying", name: "Crying", emoji: "😢" },
  { id: "excited", name: "Excited", emoji: "🤩" },
  { id: "dark", name: "Dark", emoji: "🌑" },
  { id: "feel-good", name: "Feel-good", emoji: "🥰" },
];

const FilterPanel = ({ onFilterChange, onRatingTypeChange, onMoodSelect }: FilterPanelProps) => {
  const [genre, setGenre] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [rating, setRating] = useState<[number, number]>([0, 10]);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [sortDirection, setSortDirection] = useState<string>("desc");
  const [ratingType, setRatingType] = useState<RatingType>("both");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  const handleFilterApply = () => {
    onFilterChange({
      genre: genre && genre !== "all" ? parseInt(genre) : null,
      year: year && year !== "all" ? parseInt(year) : null,
      rating: rating,
      sortBy: sortBy as "popularity" | "vote_average" | "release_date",
      sortDirection: sortDirection as "asc" | "desc",
      moods: selectedMoods.length > 0 ? selectedMoods : null
    });
    onRatingTypeChange(ratingType);
    
    if (selectedMoods.length > 0) {
      const moodNames = selectedMoods.map(id => 
        moods.find(m => m.id === id)?.name
      ).join(", ");
      
      toast({
        title: "Moods Selected",
        description: `Finding movies to match your mood: ${moodNames}`,
      });
    }
    
    // Send selected moods to parent component for search functionality
    onMoodSelect(selectedMoods);
  };

  const handleReset = () => {
    setGenre(null);
    setYear(null);
    setRating([0, 10]);
    setSortBy("popularity");
    setSortDirection("desc");
    setRatingType("both");
    setSelectedMoods([]);
    
    onFilterChange({
      genre: null,
      year: null,
      rating: [0, 10],
      sortBy: "popularity",
      sortDirection: "desc",
      moods: null
    });
    onRatingTypeChange("both");
    onMoodSelect([]);
  };

  const years = Array.from(
    { length: yearRange[1] - yearRange[0] + 1 },
    (_, i) => yearRange[0] + i
  ).reverse();

  const handleMoodsChange = (value: string[]) => {
    setSelectedMoods(value);
  };

  return (
    <div className="p-4 space-y-6 bg-cinema-card rounded-lg border border-cinema-border">
      <div className="flex items-center gap-2">
        <FilterIcon className="h-5 w-5 text-cinema-accent" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Select value={genre || undefined} onValueChange={setGenre}>
            <SelectTrigger id="genre">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Release Year</Label>
          <Select value={year || undefined} onValueChange={setYear}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Rating Range</Label>
            <span className="text-sm font-medium">
              {rating[0]} - {rating[1]}
            </span>
          </div>
          <Slider
            min={0}
            max={10}
            step={0.5}
            value={rating}
            onValueChange={(value) => setRating(value as [number, number])}
            className="py-4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ratingType">Rating Type</Label>
          <Select value={ratingType} onValueChange={(value) => setRatingType(value as RatingType)}>
            <SelectTrigger id="ratingType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User Ratings</SelectItem>
              <SelectItem value="critic">Critic Ratings</SelectItem>
              <SelectItem value="both">Compare Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort" className="flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="vote_average">Rating</SelectItem>
                <SelectItem value="release_date">Release Date</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortDirection} onValueChange={setSortDirection}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">DESC</SelectItem>
                <SelectItem value="asc">ASC</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label>Moods</Label>
          <ToggleGroup 
            type="multiple" 
            value={selectedMoods}
            onValueChange={handleMoodsChange}
            className="flex flex-wrap gap-2"
          >
            {moods.map((moodItem) => (
              <ToggleGroupItem
                key={moodItem.id}
                value={moodItem.id}
                className="flex items-center gap-1 px-3 py-2 data-[state=on]:bg-cinema-accent data-[state=on]:text-white"
              >
                <span>{moodItem.emoji}</span>
                <span>{moodItem.name}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button className="flex-1 bg-cinema-accent hover:bg-cinema-accent/80" onClick={handleFilterApply}>
          Apply
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
