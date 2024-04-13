import { TableBody } from './TableBody.js';
import { TableCaption } from './TableCaption.js';
import { TableCell } from './TableCell.js';
import { TableFooter } from './TableFooter.js';
import { TableHead } from './TableHead.js';
import { TableHeader } from './TableHeader.js';
import { TableRoot } from './TableRoot.js';
import { TableRow } from './TableRow.js';

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow
});
