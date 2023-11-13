import { Media } from 'src/core/api';

export interface ProfileHeaderProps {
  coverImage?: Media;
  profileImage?: Media;
  name?: string;
  username?: string;
}
