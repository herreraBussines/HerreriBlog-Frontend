import { useEffect, useState } from "react";
import { fetchPosts } from "../services/blogServices";
import { PostCard } from "../components/PostCard";
import { Filter } from "../components/Filter";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                if (!Array.isArray(data)) {
                    throw new Error("invalid data format");
                }
                setPosts(data);
                setError(null);
            } catch (error) {
                console.error("Error loading posts:", error);
                setError("Error loading posts");
                setPosts([]); 
            } finally {
                setLoading(false);
            }
        };
        loadPosts();
    }, []);

    const filteredPosts = filter === "all" 
        ? posts 
        : posts.filter(post => post?.course === filter);

    if (loading) return <div className="loading">Charging posts...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <h1>Explore our Posts</h1>
            <Filter currentFilter={filter} onFilterChange={setFilter} />

            <div className="posts-grid">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
};