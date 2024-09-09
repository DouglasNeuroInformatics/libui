import { BreadcrumbEllipsis } from './BreadcrumbEllipsis';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { BreadcrumbList } from './BreadcrumbList';
import { BreadcrumbPage } from './BreadcrumbPage';
import { BreadcrumbRoot } from './BreadcrumbRoot';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  List: BreadcrumbList,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator
});
