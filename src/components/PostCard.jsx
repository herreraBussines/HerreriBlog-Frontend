import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Card = styled.article`
    background: ${({ theme }) => theme.colors.cardBg};
    border-radius: 8px;
    padding: 1.5rem;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: ${({ theme }) => theme.shadows.card};
    }
`;

const CourseTag = styled.span`
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    display: inline-block;
    margin-bottom: 0.5rem;
`;

export const PostCard = ({ post }) => {
    if (!post) return null;

    return (
        <Card>
            {post.course && <CourseTag>{post.course}</CourseTag>}
            <h3>{post.title || "Title not available"}</h3>
            <p>{post.content?.substring(0, 150) || "Content not available"}...</p>
            <Link to={`/post/${post._id}`}>Read more</Link>
        </Card>
    );
};