import { useEffect, useState } from "react";
import { fetchPosts } from "../services/blogServices";
import { PostCard } from "../components/PostCard";
import { Filter } from "../components/Filter";
import styled from "@emotion/styled";

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primaryText};
  margin-bottom: 2rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        if (!Array.isArray(data)) throw new Error("invalid data format");
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

  if (loading) return <Message>Charging posts...</Message>;
  if (error) return <Message>{error}</Message>;

  return (
    <Container>
      <Heading>Explore our Posts</Heading>
      <Filter currentFilter={filter} onFilterChange={setFilter} />

      <Grid>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <Message>No posts found</Message>
        )}
      </Grid>
    </Container>
  );
};
