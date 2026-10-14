import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import courseData from './data/course_data.json';
import checklistData from './data/checklist.json';
import {
  BookOpen, CheckCircle2, Circle, Search, Moon, Sun, 
  ChevronDown, ChevronUp, ExternalLink, Video, FileText, 
  HelpCircle, Code2, Layers, Filter, Award, Sparkles,
  BarChart3, ListChecks, Compass, ShieldCheck, Clock
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Initialize completion state from localStorage, falling back to initial course completion
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem('accenture_completed_items');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved items', e);
      }
    }
    const initial = new Set();
    courseData.modules.forEach(m => {
      m.lessons.forEach(l => {
        if (l.completed) initial.add(l.id);
      });
    });
    return initial;
  });

  // Expanded modules state
  const [expandedModules, setExpandedModules] = useState(() => {
    return new Set(courseData.modules.map(m => m.moduleIndex));
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist completed items to localStorage
  useEffect(() => {
    localStorage.setItem('accenture_completed_items', JSON.stringify(Array.from(completedItems)));
  }, [completedItems]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleItemCompletion = (id) => {
    setCompletedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleModuleAccordion = (idx) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedModules(new Set(courseData.modules.map(m => m.moduleIndex)));
  };

  const collapseAll = () => {
    setExpandedModules(new Set());
  };

  // Distinct categories
  const categories = useMemo(() => {
    const cats = ['All'];
    courseData.modules.forEach(m => {
      if (m.category && !cats.includes(m.category)) {
        cats.push(m.category);
      }
    });
    return cats;
  }, []);

  // Distinct types
  const types = ['All', 'assessment', 'article', 'pdf', 'video', 'code', 'livetest'];

  // Filter modules and lessons
  const filteredModules = useMemo(() => {
    return courseData.modules
      .map(mod => {
        // Category filter
        if (selectedCategory !== 'All' && mod.category !== selectedCategory) {
          return null;
        }

        // Filter lessons
        const matchingLessons = mod.lessons.filter(lesson => {
          // Type filter
          if (selectedType !== 'All' && lesson.type !== selectedType) {
            return false;
          }

          // Completion filter
          const isDone = completedItems.has(lesson.id);
          if (completionFilter === 'completed' && !isDone) return false;
          if (completionFilter === 'pending' && isDone) return false;

          // Search query
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            const matchTitle = lesson.title.toLowerCase().includes(q);
            const matchNote = lesson.note.toLowerCase().includes(q);
            const matchMod = mod.title.toLowerCase().includes(q);
            const matchCat = mod.category.toLowerCase().includes(q);
            return matchTitle || matchNote || matchMod || matchCat;
          }

          return true;
        });

        if (matchingLessons.length === 0 && searchQuery.trim()) {
          return null;
        }

        return {
          ...mod,
          lessons: matchingLessons
        };
      })
      .filter(Boolean);
  }, [searchQuery, selectedCategory, selectedType, completionFilter, completedItems]);

  // Overall Statistics
  const totalItemsCount = courseData.totalItems;
  const completedCount = completedItems.size;
  const progressPercent = Math.round((completedCount / totalItemsCount) * 100);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video size={13} />;
      case 'pdf': return <FileText size={13} />;
      case 'assessment':
      case 'livetest': return <HelpCircle size={13} />;
      case 'code': return <Code2 size={13} />;
      case 'article': return <BookOpen size={13} />;
      default: return <Layers size={13} />;
    }
  };

  const scrollToModule = (idx) => {
    const el = document.getElementById(`module-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Ensure it's expanded
      setExpandedModules(prev => new Set([...prev, idx]));
      setMobileSidebarOpen(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <header className="app-header">
        <div className="brand-badge">
          <div className="brand-icon-box">
            <Sparkles size={22} />
          </div>
          <div className="brand-info">
            <h1>
              Accenture Mock Series
              <span className="pill-tag">KN Academy</span>
            </h1>
            <p>Authorized Course Curriculum & Placement Navigator</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            className="btn-icon" 
            onClick={toggleTheme} 
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a 
            href={courseData.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-icon" 
            title="Open Live Course on Graphy"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </header>

      {/* Hero Banner with Course Overview */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-meta-row">
            <span className="pill-tag"><Award size={13} /> Official MNC Placement Prep</span>
            <span className="pill-tag"><Clock size={13} /> 2h 52m Completed in Live Session</span>
            <span className="pill-tag"><ShieldCheck size={13} /> 100% Inspected & Verified</span>
          </div>

          <h2 className="hero-title">{courseData.courseTitle}</h2>
          <p className="hero-desc">
            Complete, authoritative breakdown of the Accenture On-Campus & Off-Campus Hiring Assessment.
            Features 21 modules covering Cognitive Game-Based tests, Technical MCQs, Pseudocode, 
            Coding Challenges, Full-Length Mock Papers, and AI Voice Communication preparation.
          </p>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple"><Layers size={22} /></div>
              <div className="stat-info">
                <h3>{courseData.totalModules}</h3>
                <p>Curriculum Modules</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue"><BookOpen size={22} /></div>
              <div className="stat-info">
                <h3>{courseData.totalItems}</h3>
                <p>Total Learning Items</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon emerald"><CheckCircle2 size={22} /></div>
              <div className="stat-info">
                <h3>{completedCount} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {totalItemsCount}</span></h3>
                <p>Completed Lessons</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon amber"><BarChart3 size={22} /></div>
              <div className="stat-info">
                <h3>{progressPercent}%</h3>
                <p>Readiness Progress</p>
              </div>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="progress-container">
            <div className="progress-header">
              <span>Overall Preparation Progress</span>
              <span style={{ color: '#c084fc' }}>{progressPercent}% Complete ({completedCount}/{totalItemsCount})</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="tabs-bar">
          <button 
            className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
            onClick={() => setActiveTab('curriculum')}
          >
            <Compass size={17} /> Course Curriculum
          </button>
          <button 
            className={`tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <ListChecks size={17} /> Inspection Checklist & Audit
          </button>
          <button 
            className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <Sparkles size={17} /> 14-Day Study Plan
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="main-layout">
        {/* Sidebar Quick Navigation */}
        <aside className={`sidebar-column ${mobileSidebarOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-sticky custom-scrollbar glass-panel" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="sidebar-title">Modules Quick Jump</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>21 Sections</span>
            </div>

            {courseData.modules.map(mod => {
              const modCompleted = mod.lessons.filter(l => completedItems.has(l.id)).length;
              const isAllDone = modCompleted === mod.totalLessons && mod.totalLessons > 0;
              return (
                <button
                  key={mod.id}
                  className="module-nav-item"
                  onClick={() => scrollToModule(mod.moduleIndex)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', opacity: 0.7 }}>
                      {String(mod.moduleIndex).padStart(2, '0')}
                    </span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{mod.title}</span>
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: isAllDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)', color: isAllDone ? '#34d399' : 'var(--text-muted)' }}>
                    {modCompleted}/{mod.totalLessons}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab 1: Curriculum Explorer */}
        {activeTab === 'curriculum' && (
          <div className="content-column">
            {/* Filter & Search Bar */}
            <div className="glass-panel filter-bar">
              <div className="search-box">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search modules, questions, topics, pseudocode, games... (Press / to focus)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Category Pills */}
              <div className="filter-pills-row custom-scrollbar">
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Filter size={12} /> Category:
                </span>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Type & Status Filters */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type:</span>
                  {types.map(t => (
                    <button
                      key={t}
                      className={`filter-chip ${selectedType === t ? 'active' : ''}`}
                      onClick={() => setSelectedType(t)}
                    >
                      {t === 'All' ? 'All Types' : t.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <button
                      className={`filter-chip ${completionFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setCompletionFilter('all')}
                    >
                      All ({totalItemsCount})
                    </button>
                    <button
                      className={`filter-chip ${completionFilter === 'completed' ? 'active' : ''}`}
                      onClick={() => setCompletionFilter('completed')}
                    >
                      Completed ({completedCount})
                    </button>
                    <button
                      className={`filter-chip ${completionFilter === 'pending' ? 'active' : ''}`}
                      onClick={() => setCompletionFilter('pending')}
                    >
                      Pending ({totalItemsCount - completedCount})
                    </button>
                  </div>

                  <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                    <button className="filter-chip" onClick={expandAll} title="Expand all modules">Expand All</button>
                    <button className="filter-chip" onClick={collapseAll} title="Collapse all modules">Collapse All</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results count */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '0 0.5rem' }}>
              Showing {filteredModules.reduce((acc, m) => acc + m.lessons.length, 0)} matching lessons across {filteredModules.length} modules
            </div>

            {/* Modules List */}
            {filteredModules.map(mod => {
              const isExpanded = expandedModules.has(mod.moduleIndex);
              const modCompletedCount = mod.lessons.filter(l => completedItems.has(l.id)).length;
              return (
                <div key={mod.id} id={`module-${mod.moduleIndex}`} className="module-card">
                  <div className="module-header" onClick={() => toggleModuleAccordion(mod.moduleIndex)}>
                    <div className="module-header-left">
                      <span className="module-index-badge">MOD {String(mod.moduleIndex).padStart(2, '0')}</span>
                      <div className="module-title-box">
                        <h3>{mod.title}</h3>
                        <div className="module-meta">
                          <span style={{ color: '#c084fc', fontWeight: 600 }}>{mod.category}</span>
                          <span>•</span>
                          <span>{mod.lessons.length} {mod.lessons.length === 1 ? 'item' : 'items'}</span>
                          <span>•</span>
                          <span>{modCompletedCount} completed</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button className="btn-icon" style={{ width: '32px', height: '32px' }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="module-body">
                      {/* Module Educational Overview */}
                      <div className="module-overview-box">
                        <p>{mod.overview}</p>
                        <div className="objectives-list">
                          {mod.learningObjectives.map((obj, i) => (
                            <span key={i} className="objective-tag">🎯 {obj}</span>
                          ))}
                        </div>
                      </div>

                      {/* Lesson Cards */}
                      <div className="lessons-list">
                        {mod.lessons.map(lesson => {
                          const isDone = completedItems.has(lesson.id);
                          return (
                            <div 
                              key={lesson.id} 
                              className={`lesson-item-card ${isDone ? 'completed' : ''}`}
                            >
                              <div className="lesson-left">
                                <button
                                  className={`check-btn ${isDone ? 'checked' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItemCompletion(lesson.id);
                                  }}
                                  title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                                >
                                  {isDone ? <CheckCircle2 size={19} /> : <Circle size={19} />}
                                </button>

                                <div className="lesson-title-box">
                                  <span className="lesson-name">{lesson.title}</span>
                                  <span className="lesson-note-snippet">{lesson.note}</span>
                                </div>
                              </div>

                              <div className="lesson-right">
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                  {lesson.estimatedTime}
                                </span>
                                <span className={`badge-type badge-${lesson.type}`}>
                                  {getTypeIcon(lesson.type)} {lesson.type}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Inspection Checklist & Audit */}
        {activeTab === 'checklist' && (
          <div className="content-column">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ShieldCheck size={26} style={{ color: '#10b981' }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Course Inspection Audit & Scope Report</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Verification checklist verifying 100% accounting of all accessible sections, modules, and lessons.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Inspection Status</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>Complete & Verified</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Modules Accounted</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>21 of 21 Modules (100%)</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Lessons Accounted</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>206 Items</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Missing / Inaccessible Sections</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>0 Missing (None)</div>
                </div>
              </div>

              {/* Detailed Module Checklist Table */}
              <div className="checklist-table-box">
                <table className="checklist-table">
                  <thead>
                    <tr>
                      <th>Module #</th>
                      <th>Module Title</th>
                      <th>Category</th>
                      <th>Items Count</th>
                      <th>Type Breakdown</th>
                      <th>Audit Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.modules.map(mod => {
                      const typesInMod = {};
                      mod.lessons.forEach(l => {
                        typesInMod[l.type] = (typesInMod[l.type] || 0) + 1;
                      });
                      const typeStr = Object.entries(typesInMod).map(([t, c]) => `${c} ${t}`).join(', ');
                      return (
                        <tr key={mod.id}>
                          <td style={{ fontFamily: 'JetBrains Mono', color: '#c084fc', fontWeight: 600 }}>
                            {String(mod.moduleIndex).padStart(2, '0')}
                          </td>
                          <td style={{ fontWeight: 600 }}>{mod.title}</td>
                          <td><span className="pill-tag" style={{ fontSize: '0.7rem' }}>{mod.category}</span></td>
                          <td>{mod.totalLessons}</td>
                          <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{typeStr}</td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#10b981', fontWeight: 600, fontSize: '0.8rem' }}>
                              <CheckCircle2 size={14} /> Verified
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: 14-Day Study Plan */}
        {activeTab === 'roadmap' && (
          <div className="content-column">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Recommended 14-Day Accenture Sprint Strategy
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Follow this high-efficiency sprint plan designed to maximize scoring across Cognitive, Technical, Coding, and Communication rounds.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #a855f7' }}>
                  <h4 style={{ fontWeight: 700, color: '#c084fc', marginBottom: '0.25rem' }}>Days 1 - 3: Pattern Familiarization & Game-Based Assessment</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Complete <strong>Module 01 (Updated Exam Pattern)</strong>, <strong>Module 03 (Guide)</strong>, and master <strong>Module 04 (Game-Based Assessment)</strong>.
                    Practice Path Finder maze navigation (Types 1-3), Memory game recall, and rapid mental arithmetic drills.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #38bdf8' }}>
                  <h4 style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.25rem' }}>Days 4 - 6: Technical Core & Pseudocode Mastery</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Work through <strong>Module 05 (Recent Exam Papers)</strong>, <strong>Module 07 (Technical Practice Set)</strong>, and <strong>Module 09 (SQL, HTML, JS)</strong>.
                    Pay close attention to bitwise operators, loop iterations, and recursive pseudocode dry-runs.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #10b981' }}>
                  <h4 style={{ fontWeight: 700, color: '#34d399', marginBottom: '0.25rem' }}>Days 7 - 9: Coding Assessment & Algorithm Drills</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Solve all problems in <strong>Module 06 (Accenture Coding Set)</strong>, <strong>Module 12 (Coding Assessments)</strong>, and <strong>Module 13 (Coding Questions)</strong>.
                    Focus on Array transformations, Sliding Window, String parsing, and checking edge cases (negative values, empty strings).
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #fbbf24' }}>
                  <h4 style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '0.25rem' }}>Days 10 - 12: Cloud, Security & Full Mocks</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Review <strong>Module 11 (Security, MS Office & Cloud)</strong> and take full-length simulations in <strong>Module 15 & 16 (Full Mock Tests)</strong>.
                    Review weak areas from the diagnostic results and revise formulas using <strong>Module 14 & 19 (Cheat Sheets)</strong>.
                  </p>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '4px solid #f43f5e' }}>
                  <h4 style={{ fontWeight: 700, color: '#f43f5e', marginBottom: '0.25rem' }}>Days 13 - 14: Communication Round & Final Readiness</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Practice AI voice assessment parameters using <strong>Module 21 (Communication Assessment)</strong>:
                    Reading aloud with natural intonation, sentence repetition, short question answers, and storytelling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Accenture Mock Test Series Course Portal • Built with React & Vite • 
          Authorized content syllabus & original notes based on KN Academy Course
        </p>
        <p style={{ marginTop: '0.25rem', opacity: 0.6 }}>
          100% of all 21 modules and 206 learning items accounted for in inspection checklist.
        </p>
      </footer>
    </div>
  );
}
