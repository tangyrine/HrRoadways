import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Clock, ThumbsUp, Share2, Bookmark, Search, MapPin, Bus } from 'lucide-react';
import '../styles/Blog.css';
import Loading from './Loading';

const BlogPage = ({ isHindi }) => {
  // State to store fetched translations
  const [translations, setTranslations] = useState(null);
  // Holds the selected language based on the isHindi prop
  const [currentLanguage, setCurrentLanguage] = useState(null);
  // Posts state, form state and other UI states
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', category: '', tags: '', route: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your hosted JSON blob URL
  const translationsUrl = 'https://jsonblob.com/api/jsonBlob/1336703432563810304';

  const fetchTranslations = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(translationsUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!data || (!data.hi && !data.en)) {
        throw new Error('Invalid data structure received');
      }
      
      setTranslations(data);
      
      // Set the current language and posts based on the isHindi prop
      const languageData = isHindi ? data.hi : data.en;
      setCurrentLanguage(languageData);
      setPosts(languageData?.posts || []);
      
    } catch (error) {
      console.error('Error fetching translations:', error);
      setError(error.message);
      
      // Fallback data in case of fetch failure
      const fallbackData = {
        title: isHindi ? 'बस ब्लॉग' : 'Bus Blog',
        subtitle: isHindi ? 'यात्रा की जानकारी और अपडेट' : 'Travel Information and Updates',
        posts: [],
        categories: ['all'],
        searchPlaceholder: isHindi ? 'खोजें...' : 'Search...',
        subscribeButton: isHindi ? 'सब्सक्राइब करें' : 'Subscribe',
        addNewPost: isHindi ? 'नई पोस्ट जोड़ें' : 'Add New Post',
        titlePlaceholder: isHindi ? 'शीर्षक' : 'Title',
        contentPlaceholder: isHindi ? 'सामग्री' : 'Content',
        categoryPlaceholder: isHindi ? 'श्रेणी चुनें' : 'Select Category',
        tagsPlaceholder: isHindi ? 'टैग (कॉमा से अलग करें)' : 'Tags (comma separated)',
        routePlaceholder: isHindi ? 'रूट' : 'Route',
        publishButton: isHindi ? 'प्रकाशित करें' : 'Publish',
        popularRoutes: isHindi ? 'लोकप्रिय रूट' : 'Popular Routes',
        share: isHindi ? 'साझा करें' : 'Share',
        save: isHindi ? 'सेव करें' : 'Save',
        saved: isHindi ? 'सेव किया गया' : 'Saved',
        postBy: isHindi ? 'द्वारा:' : 'By:',
        sortBy: {
          latest: isHindi ? 'नवीनतम' : 'Latest',
          popular: isHindi ? 'लोकप्रिय' : 'Popular'
        }
      };
      
      setCurrentLanguage(fallbackData);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [translationsUrl, isHindi]);

  // Fetch the translations when the component mounts or isHindi changes
  useEffect(() => {
    fetchTranslations();
  }, [fetchTranslations]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      const newPost = {
        id: Date.now(), // Use timestamp for unique ID
        ...formData,
        date: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        likes: 0,
        readTime: `${Math.max(1, Math.ceil(formData.content.length / 1000))} min`,
        author: 'Admin'
      };
      setPosts(prev => [newPost, ...prev]);
      setFormData({ title: '', content: '', category: '', tags: '', route: '' });
    }
  }, [formData]);

  // Toggle save state for posts
  const toggleSave = useCallback((postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }, []);

  // Handle post likes
  const handleLike = useCallback((postId) => {
    setPosts(prev => prev.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  }, []);

  // Filter and sort posts
  const filteredPosts = React.useMemo(() => {
    if (!posts || posts.length === 0) return [];
    
    return posts
      .filter(post => {
        if (!post) return false;
        
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
          (post.title && post.title.toLowerCase().includes(searchLower)) ||
          (post.content && post.content.toLowerCase().includes(searchLower)) ||
          (post.tags && post.tags.some(tag => tag && tag.toLowerCase().includes(searchLower)));
        
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'popular') return (b.likes || 0) - (a.likes || 0);
        return 0;
      });
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // Error state
  if (error && !currentLanguage) {
    return (
      <div className="blog-page-container">
        <div className="error-message">
          <h2>Error loading content</h2>
          <p>{error}</p>
          <button onClick={fetchTranslations} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading || !currentLanguage) {
    return <Loading />;
  }

  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <div className="header-content">
          <div className="header-title-container">
            <div>
              <h1 className="header-title">
                <Bus size={32} />
                {currentLanguage.title}
              </h1>
              <p className="header-subtitle">{currentLanguage.subtitle}</p>
            </div>
            <div className="subscribe-button-container">
              <button className="subscribe-button">
                {currentLanguage.subscribeButton}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-container">
          {/* Main Content */}
          <div className="main-content-left">
            {/* Search and Filters */}
            <div className="search-filters">
              <div className="search-bar">
                <div className="search-input-container">
                  <Search className="search-icon" size={20} />
                  <input
                    type="text"
                    placeholder={currentLanguage.searchPlaceholder}
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">{currentLanguage.sortBy?.latest || 'Latest'}</option>
                  <option value="popular">{currentLanguage.sortBy?.popular || 'Popular'}</option>
                </select>
              </div>

              <div className="category-filters">
                {currentLanguage.categories?.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-button ${
                      selectedCategory === category ? 'active-category' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className="blog-posts">
              {filteredPosts.length === 0 ? (
                <div className="no-posts">
                  <p>{isHindi ? 'कोई पोस्ट नहीं मिली' : 'No posts found'}</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article key={post.id} className="blog-post">
                    <div className="post-content">
                      <div className="post-meta">
                        <span className="post-meta-item">
                          <Calendar size={16} />
                          {post.date}
                        </span>
                        <span className="post-meta-item">
                          <Clock size={16} />
                          {post.readTime}
                        </span>
                        {post.route && (
                          <span className="post-meta-item">
                            <MapPin size={16} />
                            {post.route}
                          </span>
                        )}
                      </div>

                      <h2 className="post-title">{post.title}</h2>
                      <p className="post-description">{post.content}</p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="post-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="post-actions">
                        <div className="post-actions-left">
                          <button
                            onClick={() => handleLike(post.id)}
                            className="post-action-button"
                          >
                            <ThumbsUp size={18} />
                            {post.likes || 0}
                          </button>
                          <button className="post-action-button">
                            <Share2 size={18} />
                            {currentLanguage.share}
                          </button>
                          <button
                            onClick={() => toggleSave(post.id)}
                            className={`post-action-button ${savedPosts.has(post.id) ? 'saved' : ''}`}
                          >
                            <Bookmark size={18} />
                            {savedPosts.has(post.id) ? currentLanguage.saved : currentLanguage.save}
                          </button>
                        </div>
                        <span className="post-author">{currentLanguage.postBy} {post.author}</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            {/* Add New Post Form */}
            <div className="new-post-form">
              <h3 className="form-title">{currentLanguage.addNewPost}</h3>
              <form onSubmit={handleSubmit} className="form">
                <input
                  type="text"
                  name="title"
                  placeholder={currentLanguage.titlePlaceholder}
                  className="form-input"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder={currentLanguage.contentPlaceholder}
                  className="form-textarea"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">{currentLanguage.categoryPlaceholder}</option>
                  {currentLanguage.categories?.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="tags"
                  placeholder={currentLanguage.tagsPlaceholder}
                  className="form-input"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="route"
                  placeholder={currentLanguage.routePlaceholder}
                  className="form-input"
                  value={formData.route}
                  onChange={handleChange}
                />
                <button type="submit" className="form-submit-button">
                  {currentLanguage.publishButton}
                </button>
              </form>
            </div>

            {/* Popular Routes */}
            <div className="popular-routes">
              <h3 className="popular-routes-title">{currentLanguage.popularRoutes}</h3>
              <ul className="popular-routes-list">
                <li className="popular-route-item">
                  <Bus size={16} />
                  Delhi - Chandigarh
                </li>
                <li className="popular-route-item">
                  <Bus size={16} />
                  Gurugram - Panipat
                </li>
                <li className="popular-route-item">
                  <Bus size={16} />
                  Faridabad - Hisar
                </li>
                <li className="popular-route-item">
                  <Bus size={16} />
                  Ambala - Rohtak
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPage;