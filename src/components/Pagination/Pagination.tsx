import { PaginationContent } from './PaginationContent.js';
import { PaginationEllipsis } from './PaginationEllipsis.js';
import { PaginationItem } from './PaginationItem.js';
import { PaginationLink } from './PaginationLink.js';
import { PaginationNext } from './PaginationNext.js';
import { PaginationPrevious } from './PaginationPrevious.js';
import { PaginationRoot } from './PaginationRoot.js';

export const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious
});
