import { createContext, ReactNode, useEffect, useState } from "react";

import service from "@/service";
import { useToast } from "@/components/Toast";

export type TPostsContextDataProps = {
  posts: IPosts[];
  onDeletePost: (id: number) => void;
  onCreatePost: (post: TPostCreate) => void;
  isLoadingPosts: boolean;
};

type TPostCreate = {
  title: string;
  body: string;
};


type TPostsContextProviderProps = {
  children: ReactNode;
};

export const PostsContext = createContext<TPostsContextDataProps>(
  {} as TPostsContextDataProps
);

export function PostsContextProvider({ children }: TPostsContextProviderProps) {
  const {toast} = useToast();
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  async function getPosts() {
    setIsLoadingPosts(true);
    try {
      const response = await service.get<IPosts[]>("posts");
      console.log("CHAMADA API");
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function onDeletePost(id: number) {
    try {
      const response = await service.delete(`posts/${id}`);

      if (response.status === 200) {
        setPosts(prevState => prevState.filter(post => post.id !== id));
        toast("Post-It deletado com sucesso", "success");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function onCreatePost(post: TPostCreate) {
    try {
      const response = await service.post<IPosts>("posts", post);

      if (response.status === 201) {
        setPosts([...posts, response.data]);
        toast("Post-It Criado com sucesso ", "success");
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        onDeletePost,
        onCreatePost,
        isLoadingPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
