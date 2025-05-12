import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, createComment } from '../services/blogServices';
import { CommentForm } from '../components/CommentForm';
import styled from '@emotion/styled';

const CommentsList = styled.div`
  margin-top: 3rem;
`;

const CommentItem = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.accent};
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

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-detail">
      <article>
        <h1>{post.title}</h1>
        <span className="course-badge">{post.course}</span>
        <div className="post-content">{post.content}</div>
      </article>

      <CommentForm onSubmit={handleCommentSubmit} />

      <CommentsList>
        <h2>Comments ({comments.length})</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment._id}>
              <strong>{comment.userName}</strong>
              <p>{comment.content}</p>
              <small>
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </small>
            </CommentItem>
          ))
        ) : (
          <p>No comments yet. Be the first!</p>
        )}
      </CommentsList>
    </div>
  );
};