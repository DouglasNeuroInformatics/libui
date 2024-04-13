import { AvatarFallback } from './AvatarFallback.js';
import { AvatarImage } from './AvatarImage.js';
import { AvatarRoot } from './AvatarRoot.js';

export const Avatar = Object.assign(AvatarRoot, {
  Fallback: AvatarFallback,
  Image: AvatarImage
});
