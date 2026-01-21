import { TableBody } from './TableBody.tsx';
import { TableCaption } from './TableCaption.tsx';
import { TableCell } from './TableCell.tsx';
import { TableFooter } from './TableFooter.tsx';
import { TableHead } from './TableHead.tsx';
import { TableHeader } from './TableHeader.tsx';
import { TableRoot } from './TableRoot.tsx';
import { TableRow } from './TableRow.tsx';

export const Table = Object.assign(TableRoot, {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow
});
