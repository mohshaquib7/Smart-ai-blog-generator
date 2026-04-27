import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const client = axios.create({
    baseURL: API,
    timeout: 120000,
    headers: { "Content-Type": "application/json" },
});

/**
 * Generate a blog post from a topic, tone, and length.
 * @param {{topic: string, tone: 'professional'|'casual'|'technical', length: 'short'|'medium'|'long'}} params
 */
export async function generateBlog({ topic, tone, length }) {
    const { data } = await client.post("/blogs/generate", { topic, tone, length });
    return data;
}

export async function listBlogs() {
    const { data } = await client.get("/blogs");
    return data;
}

export async function getBlog(id) {
    const { data } = await client.get(`/blogs/${id}`);
    return data;
}

export async function deleteBlog(id) {
    const { data } = await client.delete(`/blogs/${id}`);
    return data;
}
