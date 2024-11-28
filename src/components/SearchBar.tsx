import React from 'react';
import { Search } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        placeholder={translations[language].search}
        onChange={(e) => onSearch(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
    </div>
  );
}