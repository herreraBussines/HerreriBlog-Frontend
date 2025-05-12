import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 10000,
});

API.interceptors.response.use(
    response => {
        if (!response.data) {
            throw new Error("The response does not contain data");
        }
        return response;
    },
    error => {
        console.error("Request error:", error);
        throw error;
    }
);

export const fetchPosts = async () => {
    try {
        const response = await API.get("/posts");
        console.log("API Response:", response.data);
        return Array.isArray(response.data) ? response.data : 
               Array.isArray(response.data.posts) ? response.data.posts : [];
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; 
    }
};

export const fetchPostById = async (id) => {
    try {
        const response = await API.get(`/posts/${id}`);
        if (!response.data) {
            throw new Error("Post not found");
        }
        return response.data;
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw new Error("Failed to load the post");
    }
};

export const createComment = async (postId, commentData) => {
    try {
        const response = await API.post(`/comments`, { 
            postId,
            userName: commentData.userName,
            content: commentData.content
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create the comment");
    }
};