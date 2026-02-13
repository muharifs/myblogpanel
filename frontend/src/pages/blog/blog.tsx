import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import api from "@/lib/axios";

type Post = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  content: string;
};
type ApiPost = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category?: {
    id: number;
    name: string;
  };
  author?: {
    id: number;
    name: string;
    username: string;
  };
};

function Navbar() {
  const nav = useNavigate();
  const { user } = useAuth();

  return (
    <div className="w-full border-b bg-background">
      <div className="max-w-screen-2xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="font-semibold text-lg">My Blog</div>
        <div className="flex gap-2">
          {user ? (
            <Button onClick={() => nav("/dashboard")}>{user.username}</Button>
          ) : (
            <>
              <Button onClick={() => nav("/login")}>Login</Button>
              <Button onClick={() => nav("/register")}>Register</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogList({
  posts,
  search,
  setSearch,
  onOpen,
}: {
  posts: Post[];
  search: string;
  setSearch: (v: string) => void;
  onOpen: (post: Post) => void;
}) {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">My Blog</h1>

      <div className="max-w-2xl mx-auto mb-10">
        <Input
          placeholder="Search posts..."
          className="h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {posts.length === 0 && (
        <div className="text-center text-muted-foreground">No posts found</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="rounded-2xl shadow-sm">
            <img
              src={post.image}
              className="h-40 w-full object-cover rounded-t-2xl"
            />

            <CardHeader>
              <CardTitle className="text-base">{post.title}</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground">
              {post.description}
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => onOpen(post)}
                className="w-full text-white bg-black hover:bg-black/90"
              >
                View Post
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BlogDetail({ post, onBack }: { post: Post; onBack: () => void }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <Button onClick={onBack} className="mb-6 bg-black text-white">
        ← Back
      </Button>

      <img
        src={post.image}
        className="w-full h-72 object-cover rounded-2xl mb-6"
      />

      <div className="flex gap-2 mb-3">
        <Badge>{post.category}</Badge>
      </div>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

      <div className="text-sm text-muted-foreground mb-6">
        By <span className="font-medium">{post.author}</span> • {post.date}
      </div>

      <Separator className="mb-6" />

      <div className="leading-7 text-lg">{post.content}</div>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await api.get<ApiPost[]>("/posts/all");

        const formatted: Post[] = res.data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.content.slice(0, 100) + "...",
          image: `https://picsum.photos/seed/${p.id}/800/400`,
          category: p.category?.name ?? "General",
          author: p.author?.name ?? "Unknown",
          date: new Date(p.createdAt).toLocaleDateString(),
          content: p.content,
        }));

        setPosts(formatted);
      } catch (err) {
        console.error("Gagal load posts:", err);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const q = search.toLowerCase();

    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q),
    );
  }, [posts, search]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {selectedPost ? (
        <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogList
          posts={filteredPosts}
          search={search}
          setSearch={setSearch}
          onOpen={setSelectedPost}
        />
      )}
    </div>
  );
}
