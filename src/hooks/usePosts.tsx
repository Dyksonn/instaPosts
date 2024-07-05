import { useContext } from 'react';

import { PostsContext } from '@/contexts/PostsContext';

export function usePosts() {
  const context = useContext(PostsContext);

  return context;
}