
import { cn } from "@/lib/utils";
import { Movie, RatingType } from "@/types/movie";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RatingChartProps {
  movies: Movie[];
  className?: string;
  type: RatingType;
}

interface ChartData {
  name: string;
  user: number;
  critic: number;
  difference: number;
}

const RatingChart = ({ movies, className, type }: RatingChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Transform movie data for the chart
    const transformedData = movies.slice(0, 10).map(movie => ({
      name: movie.title.length > 15 ? `${movie.title.substring(0, 15)}...` : movie.title,
      user: parseFloat(movie.vote_average.toFixed(1)),
      critic: movie.critic_score ? parseFloat(movie.critic_score.toFixed(1)) : 0,
      difference: movie.critic_score 
        ? parseFloat((movie.critic_score - movie.vote_average).toFixed(1)) 
        : 0
    }));
    
    setChartData(transformedData);
  }, [movies]);

  const renderChart = () => {
    switch (type) {
      case 'user':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="user" name="User Rating" fill="#8B5CF6">
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#8B5CF6" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'critic':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="critic" name="Critic Rating" fill="#0EA5E9">
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill="#0EA5E9" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'both':
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="user" name="User Rating" fill="#8B5CF6" />
              <Bar dataKey="critic" name="Critic Rating" fill="#0EA5E9" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={cn("p-6 bg-cinema-card rounded-lg border border-cinema-border", className)}>
      <h2 className="text-xl font-bold mb-6">Rating Analysis</h2>
      {renderChart()}
    </div>
  );
};

export default RatingChart;
