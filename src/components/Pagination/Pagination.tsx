import { PaginationContent } from './PaginationContent';
import { PaginationEllipsis } from './PaginationEllipsis';
import { PaginationItem } from './PaginationItem';
import { PaginationLink } from './PaginationLink';
import { PaginationNext } from './PaginationNext';
import { PaginationPrevious } from './PaginationPrevious';
import { PaginationRoot } from './PaginationRoot';

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious
});
