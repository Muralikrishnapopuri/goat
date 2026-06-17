import { useState, useEffect, useRef } from 'react';
import './App.css';

// Generating initial pool of mock articles
const ARTICLE_POOL = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const categories = ['Tech', 'Design', 'MERN', 'AI', 'System Design'];
  const titles = [
    'Exploring React 19 Server Components',
    'Understanding NodeJS Event Loop Execution Phases',
    'MongoDB Aggregation Best Practices for Production',
    'Designing Low-Latency Distributed Caching Systems',
    'How We Fixed a Multi-Tab JWT Token Synchronization Leak',
    'Mastering CSS Grid Layouts for Glassmorphism Dashboards',
    'A Deep Dive into Mongoose Populate vs Aggregate $lookup',
    'Dockerizing Node App with Multi-Stage Build Configurations',
    'Understanding Redis Pub/Sub Architecture Patterns',
    'Writing Reusable Table Components in Clean React Code'
  ];

  return {
    id,
    title: `${titles[id % titles.length]} #${id}`,
    category: categories[id % categories.length],
    readTime: `${2 + (id % 8)} min read`,
    likes: Math.round(10 + Math.random() * 980),
    description: 'A comprehensive engineering guide detailing design decisions, production issues resolved, and performance benchmarks.',
    author: `Author Dev #${(id % 12) + 1}`,
    imageUrl: `https://images.unsplash.com/photo-${1500000000000 + (id * 100000)}?w=400&auto=format&fit=crop&q=60`
  };
});

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const loaderRef = useRef(null);

  // Load items simulating network lag
  const loadMoreItems = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      const pageSize = 8;
      const startIndex = (page - 1) * pageSize;
      const nextBatch = ARTICLE_POOL.slice(startIndex, startIndex + pageSize);

      if (nextBatch.length > 0) {
        setItems(prev => [...prev, ...nextBatch]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 1200); // 1.2s delay for professional async simulator feel
  };

  // Initial load
  useEffect(() => {
    loadMoreItems();
  }, []);

  // KEY PLACEMENT: Intersection Observer to detect scroll threshold & load more (Reference: topics-points.txt)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadMoreItems();
      }
    }, { threshold: 1.0 });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, hasMore, page]);

  // Monitor scroll for back-to-top display
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePullToRefresh = () => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    // Timeout to load initial batch
    setTimeout(() => {
      const initialBatch = ARTICLE_POOL.slice(0, 8);
      setItems(initialBatch);
      setPage(2);
    }, 500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scroll-container">
      <header className="scroll-header">
        <div className="brand">
          <span className="logo-icon">♾️</span>
          <div>
            <h1>ScrollFeed</h1>
            <p className="subtitle">MERN Level - Infinite Scroll IntersectionObserver & Performance Optimization</p>
          </div>
        </div>
        <button className="btn btn-secondary btn-sm" onClick={handlePullToRefresh}>
          🔄 Refresh Feed
        </button>
      </header>

      {/* Item Feed */}
      <div className="article-feed">
        {items.map(item => (
          <article key={item.id} className="article-card card">
            <div className="article-image-wrapper">
              {/* Fallback image style since unsplash URLs are mocks */}
              <div className="placeholder-image-bg">
                <span>{item.category}</span>
              </div>
            </div>
            <div className="article-content">
              <div className="article-meta">
                <span className="badge-cat">{item.category}</span>
                <span className="read-time">⏱️ {item.readTime}</span>
              </div>
              <h3 className="article-title">{item.title}</h3>
              <p className="article-desc">{item.description}</p>
              <div className="article-footer">
                <span className="author-name">✍️ {item.author}</span>
                <span className="likes-count">❤️ {item.likes}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* KEY PLACEMENT: Loading Trigger Element / Sentinel DOM ref (Reference: topics-points.txt) */}
      <div ref={loaderRef} className="loader-trigger">
        {loading && (
          <div className="spinner-wrapper">
            <div className="loading-spinner"></div>
            <span>Fetching more architecture articles...</span>
          </div>
        )}
        {!hasMore && (
          <p className="end-message">☕ You have fully resolved all 100 expert articles. End of dataset.</p>
        )}
      </div>

      {/* Scroll Top Button */}
      {showScrollTop && (
        <button className="scroll-top-btn" onClick={scrollToTop} title="Scroll to top">
          ▲
        </button>
      )}
    </div>
  );
}

export default App;
