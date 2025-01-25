import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ThumbsUp, Share2, Bookmark, Search, MapPin, Bus } from 'lucide-react';

const BlogPage = ({ isHindi }) => {
  const translations = {
    en: {
      title: "Haryana Roadways Blog",
      subtitle: "Your Journey, Our Pride",
      subscribeButton: "Subscribe to Updates",
      searchPlaceholder: "Search posts...",
      categories: [
        'all',
        'Service Updates',
        'Travel Guide',
        'Safety Tips',
        'News',
        'Route Updates'
      ],
      sortBy: {
        latest: "Latest",
        popular: "Most Popular"
      },
      addNewPost: "Add New Post",
      titlePlaceholder: "Title",
      contentPlaceholder: "Content",
      categoryPlaceholder: "Select Category",
      tagsPlaceholder: "Tags (comma-separated)",
      routePlaceholder: "Related Route (optional)",
      publishButton: "Publish Post",
      popularRoutes: "Popular Routes",
      postBy: "By",
      saved: "Saved",
      save: "Save",
      share: "Share",
      posts: [
        {
          id: 1,
          title: "Why Choose Haryana Roadways for Your Next Journey?",
          content: "Planning a trip? Haryana Roadways offers a safe, reliable, and cost-effective way to travel across the state and beyond. Our buses are equipped with modern amenities like GPS tracking, comfortable seating, and more.",
          date: "2025-01-18",
          author: "Transport Department",
          category: "Service Updates",
          tags: ["Travel", "Safety", "Comfort"],
          likes: 45,
          route: "Delhi-Chandigarh",
          readTime: "3 min"
        },
        {
          id: 2,
          title: "Explore the Best of Haryana: Top 5 Destinations",
          content: "Haryana is home to some incredible destinations that are perfect for weekend getaways or short trips. Here are our top five picks: \n\n1. Sultanpur National Park: A paradise for bird watchers.\n2. Kurukshetra: A historical and spiritual destination.\n3. Pinjore Gardens: Beautifully landscaped gardens.\n4. Morni Hills: A serene hill station.\n5. Surajkund: Known for its annual crafts fair.",
          date: "2025-01-17",
          author: "Tourism Department",
          category: "Travel Guide",
          tags: ["Tourism", "Destinations", "Weekend Getaway"],
          likes: 72,
          route: "Multiple Routes",
          readTime: "5 min"
        }
      ]
    },
    hi: {
      title: "हरियाणा रोडवेज ब्लॉग",
      subtitle: "आपकी यात्रा, हमारी शान",
      subscribeButton: "अपडेट्स के लिए सदस्यता लें",
      searchPlaceholder: "पोस्ट खोजें...",
      categories: [
        'सभी',
        'सेवा अपडेट',
        'यात्रा गाइड',
        'सुरक्षा टिप्स',
        'समाचार',
        'मार्ग अपडेट'
      ],
      sortBy: {
        latest: "नवीनतम",
        popular: "सबसे लोकप्रिय"
      },
      addNewPost: "नई पोस्ट जोड़ें",
      titlePlaceholder: "शीर्षक",
      contentPlaceholder: "सामग्री",
      categoryPlaceholder: "श्रेणी चुनें",
      tagsPlaceholder: "टैग (अल्पविराम से अलग करें)",
      routePlaceholder: "संबंधित मार्ग (वैकल्पिक)",
      publishButton: "पोस्ट प्रकाशित करें",
      popularRoutes: "लोकप्रिय मार्ग",
      postBy: "द्वारा",
      saved: "सहेजा गया",
      save: "सहेजें",
      share: "साझा करें",
      posts: [
        {
          id: 1,
          title: "अपनी अगली यात्रा के लिए हरियाणा रोडवेज क्यों चुनें?",
          content: "यात्रा की योजना बना रहे हैं? हरियाणा रोडवेज राज्य भर में और उससे आगे यात्रा करने का एक सुरक्षित, विश्वसनीय और किफायती तरीका प्रदान करता है। हमारी बसें जीपीएस ट्रैकिंग, आरामदायक सीटिंग और अन्य आधुनिक सुविधाओं से सुसज्जित हैं।",
          date: "2025-01-18",
          author: "परिवहन विभाग",
          category: "सेवा अपडेट",
          tags: ["यात्रा", "सुरक्षा", "आराम"],
          likes: 45,
          route: "दिल्ली-चंडीगढ़",
          readTime: "3 मिनट"
        },
        {
          id: 2,
          title: "हरियाणा का सर्वश्रेष्ठ अन्वेषण करें: शीर्ष 5 गंतव्य",
          content: "हरियाणा कुछ अविश्वसनीय गंतव्यों का घर है जो सप्ताहांत की छुट्टियों या छोटी यात्राओं के लिए एकदम सही हैं। यहां हमारे शीर्ष पांच चयन हैं: \n\n1. सुल्तानपुर नेशनल पार्क: पक्षी प्रेमियों के लिए स्वर्ग।\n2. कुरुक्षेत्र: एक ऐतिहासिक और आध्यात्मिक गंतव्य।\n3. पिंजौर गार्डन: खूबसूरती से सजाए गए बगीचे।\n4. मोरनी हिल्स: एक शांत पहाड़ी स्टेशन।\n5. सूरजकुंड: अपने वार्षिक शिल्प मेले के लिए जाना जाता है।",
          date: "2025-01-17",
          author: "पर्यटन विभाग",
          category: "यात्रा गाइड",
          tags: ["पर्यटन", "गंतव्य", "सप्ताहांत छुट्टी"],
          likes: 72,
          route: "एकाधिक मार्ग",
          readTime: "5 मिनट"
        }
      ]
    },
  };

  const [currentLanguage, setCurrentLanguage] = useState(translations.en);
  const [posts, setPosts] = useState(currentLanguage.posts);

  const [formData, setFormData] = useState({ title: '', content: '', category: '', tags: '', route: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPosts, setSavedPosts] = useState(new Set());
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    setCurrentLanguage(isHindi ? translations.hi : translations.en);
    setPosts(isHindi ? translations.hi.posts : translations.en.posts);
  }, [isHindi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.content) {
      const newPost = {
        id: posts.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        tags: formData.tags.split(',').map(tag => tag.trim()),
        likes: 0,
        readTime: `${Math.max(1, Math.ceil(formData.content.length / 1000))} min`,
        author: 'Admin'
      };
      setPosts([newPost, ...posts]);
      setFormData({ title: '', content: '', category: '', tags: '', route: '' });
    }
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = posts
    .filter(post =>
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
       post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'popular') return b.likes - a.likes;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Bus size={32} />
                {currentLanguage.title}
              </h1>
              <p className="mt-2 text-blue-100">{currentLanguage.subtitle}</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                {currentLanguage.subscribeButton}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder={currentLanguage.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="latest">{currentLanguage.sortBy.latest}</option>
                  <option value="popular">{currentLanguage.sortBy.popular}</option>
                </select>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {currentLanguage.categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime}
                      </span>
                      {post.route && (
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {post.route}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                    <p className="text-gray-600 mb-4 whitespace-pre-line">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                        >
                          <ThumbsUp size={18} />
                          {post.likes}
                        </button>
                        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                          <Share2 size={18} />
                          {currentLanguage.share}
                        </button>
                        <button
                          onClick={() => toggleSave(post.id)}
                          className={`flex items-center gap-1 ${
                            savedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                          }`}
                        >
                          <Bookmark size={18} />
                          {savedPosts.has(post.id) ? currentLanguage.saved : currentLanguage.save}
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">{currentLanguage.postBy} {post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 shrink-0">
            {/* Add New Post Form */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">{currentLanguage.addNewPost}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder={currentLanguage.titlePlaceholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="content"
                  placeholder={currentLanguage.contentPlaceholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  value={formData.content}
                  onChange={handleChange}
                  required
                ></textarea>
                <select
                  name="category"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">{currentLanguage.categoryPlaceholder}</option>
                  {currentLanguage.categories.filter(cat => cat !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="tags"
                  placeholder={currentLanguage.tagsPlaceholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="route"
                  placeholder={currentLanguage.routePlaceholder}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.route}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {currentLanguage.publishButton}
                </button>
              </form>
            </div>

            {/* Popular Routes */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-4">{currentLanguage.popularRoutes}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Delhi - Chandigarh
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Gurugram - Panipat
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                  <Bus size={16} />
                  Faridabad - Hisar
                </li>
                <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
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