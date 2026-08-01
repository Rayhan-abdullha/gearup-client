import { SearchBar } from "./search-bar";

const Header = ({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>
    </header>
  );
};

export default Header;
