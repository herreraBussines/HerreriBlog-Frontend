import styled from '@emotion/styled';
import { useState } from 'react';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  padding: 2rem;
  border-radius: 8px;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputField = styled.input`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  min-height: 120px;
  resize: vertical;
  font-family: ${({ theme }) => theme.fonts.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.ui};
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

export const CommentForm = ({ onSubmit }) => {
  const [commentData, setCommentData] = useState({
    userName: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentData.userName || !commentData.content) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(commentData);
      setCommentData({ userName: '', content: '' });
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <h3>Leave your comment</h3>
      <StyledForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="userName"
          placeholder="Your name *"
          value={commentData.userName}
          onChange={handleChange}
          required
        />
        <TextArea
          name="content"
          placeholder="Write your comment here... *"
          value={commentData.content}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};