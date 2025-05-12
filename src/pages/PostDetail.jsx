import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, createComment } from '../services/blogServices';
import { CommentForm } from '../components/CommentForm';
import styled from '@emotion/styled';

const Container = styled.div`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Article = styled.article`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  font-size: 2.25rem;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Badge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const Content = styled.div`
  margin-top: 1.5rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const CommentsList = styled.div`
  margin-top: 3rem;
`;

const CommentItem = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const Small = styled.small`
  display: block;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostAndComments = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data.post);
        setComments(data.post.comments || []);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (commentData) => {
    try {
      const newComment = await createComment(id, commentData);
      setComments([newComment, ...comments]);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  if (loading) return <Container>Loading...</Container>;
  if (!post) return <Container>Post not found</Container>;

  return (
    <Container>
      <Article>
        <Title>{post.title}</Title>
        <Badge>{post.course}</Badge>
        <Content>{post.content}</Content>
      </Article>

      <CommentForm onSubmit={handleCommentSubmit} />

      <CommentsList>
        <h2>🗨️ Comments ({comments.length})</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment._id}>
              <strong>{comment.userName}</strong>
              <p>{comment.content}</p>
              <Small>
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Small>
            </CommentItem>
          ))
        ) : (
          <p>No comments yet. Be the first!</p>
        )}
      </CommentsList>
    </Container>
  );
};
