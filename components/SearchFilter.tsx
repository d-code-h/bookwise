import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchFilter = ({ value, onChange }: Props) => {
  return (
    <Select
      defaultValue="All"
      value={value}
      onValueChange={(value) => onChange(value)}
    >
      <SelectTrigger className="w-auto flex gap-1 text-light-100 px-2 py-1 bg-dark-300 border-none">
        <p>Filter by:</p>
        <div className="text-primary">
          <SelectValue placeholder="All Genre" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All Genre</SelectItem>
        <SelectItem value="Web Development">Web Development</SelectItem>
        <SelectItem value="System Design">System Design</SelectItem>
        <SelectItem value="Computer Science">Computer Science</SelectItem>
        <SelectItem value="Programming">Programming</SelectItem>
        <SelectItem value="Software">Software</SelectItem>
        <SelectItem value="Self Help">Self Help</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SearchFilter;
