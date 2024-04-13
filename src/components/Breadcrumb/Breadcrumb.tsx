import { BreadcrumbEllipsis } from './BreadcrumbEllipsis.js';
import { BreadcrumbItem } from './BreadcrumbItem.js';
import { BreadcrumbLink } from './BreadcrumbLink.js';
import { BreadcrumbList } from './BreadcrumbList.js';
import { BreadcrumbPage } from './BreadcrumbPage.js';
import { BreadcrumbRoot } from './BreadcrumbRoot.js';
import { BreadcrumbSeparator } from './BreadcrumbSeparator.js';

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  List: BreadcrumbList,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator
});
