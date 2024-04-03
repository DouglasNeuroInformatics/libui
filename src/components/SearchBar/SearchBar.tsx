import { SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils';

import { Input } from '../Input';

export type BaseSearchBarProps = {
  /** Additional CSS classes to add to the wrapper form component, potentially overriding default styling */
  className?: string;
  /** An optional callback invoked when the user clicks the search bar */
  onClick?: () => void;
  /** Custom placeholder to use instead of the default */
  placeholder?: string;
};

type ControlledSearchBarProps = BaseSearchBarProps & {
  /** Event handler called when the value changes */
  onValueChange: (value: string) => void;
  /** The controlled value of the search bar, which should be used in conjunction with onValueChange */
  value: string;
};

type UncontrolledSearchBarProps = BaseSearchBarProps & {
  onValueChange?: never;
  value?: never;
};

export type SearchBarProps = ControlledSearchBarProps | UncontrolledSearchBarProps;

export const SearchBar = ({ className, onClick, onValueChange, placeholder, value }: SearchBarProps) => {
  const { t } = useTranslation();
  return (
    <form className={cn('relative', className)}>
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder={placeholder ?? t('searchBar.placeholder')}
        type="search"
        value={value}
        onChange={(event) => {
          onValueChange?.(event.target.value);
        }}
        onClick={() => onClick?.()}
      />
    </form>
  );
};
