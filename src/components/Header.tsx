// src/components/Header.tsx
import { Search } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery, handleSearch, setShowForm }) => {
    return (
        <div className="mb-6 flex justify-between items-center">
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" onClick={handleSearch} />
                </div>
            </div>

            <button
                onClick={() => setShowForm(true)}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
                Add New Tour
            </button>
        </div>
    );
};

export default Header;
