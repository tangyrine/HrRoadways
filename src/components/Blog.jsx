import React, { useState } from 'react';
import '../assets/Blog.css'; // Assuming you have a separate CSS file for styling

const BlogPage = () => {
    const [posts, setPosts] = useState([
        { title: "Why Choose Haryana Roadways for Your Next Journey?", content: "Planning a trip? Haryana Roadways offers a safe, reliable, and cost-effective way to travel across the state and beyond. Our buses are equipped with modern amenities like GPS tracking, comfortable seating, and punctual schedules, ensuring you reach your destination on time. Whether you're traveling for work or leisure, we prioritize your safety and comfort. Book your next journey with us and experience the difference!", date: "2025-01-18" },
        { title: "Explore the Best of Haryana: Top 5 Destinations", content: "Haryana is home to some incredible destinations that are perfect for weekend getaways or short trips. Here are our top five picks: \nSultanpur National Park: A paradise for bird watchers and nature enthusiasts. \nKurukshetra: A historical city known for its significance in the Mahabharata.\nPinjore Gardens: Beautifully maintained Mughal gardens that are perfect for a day out.\nMorni Hills: Ideal for adventure lovers and nature seekers.\nSurajkund: Famous for its annual crafts fair and rich cultural heritage. \nPack your bags and hop on a Haryana Roadways bus to explore these amazing destinations!", date: "2025-01-17" },
    ]);

    const [formData, setFormData] = useState({ title: '', content: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.content) {
            const newPost = { ...formData, date: new Date().toISOString().split('T')[0] };
            setPosts([newPost, ...posts]);
            setFormData({ title: '', content: '' }); // Reset form
        } else {
            alert('Please fill out both fields.');
        }
    };

    return (
        <div className="blog-page">
            <header className="navbar">
                <h1>Haryana Roadways</h1>
                <p>Your Journey, Our Pride</p>
            </header>

            <div className="blog-content">
                <h2>Blog</h2>
                <form className="blog-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="content"
                        placeholder="Content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <button type="submit">Add Post</button>
                </form>

                <div className="blog-list">
                    {posts.map((post, index) => (
                        <div key={index} className="blog-post">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <small>{post.date}</small>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
