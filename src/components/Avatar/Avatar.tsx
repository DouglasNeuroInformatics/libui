import { AvatarFallback } from './AvatarFallback';
import { AvatarImage } from './AvatarImage';
import { AvatarRoot } from './AvatarRoot';

export const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Image: AvatarImage
});
