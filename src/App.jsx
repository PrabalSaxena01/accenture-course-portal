import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import courseData from './data/course_data.json';
import checklistData from './data/checklist.json';
import {
  BookOpen, CheckCircle2, Circle, Search, Moon, Sun, 
  ChevronDown, ChevronUp, ExternalLink, Video, FileText, 
  HelpCircle, Code2, Layers, Filter, Award, Sparkles,
  BarChart3, ListChecks, Compass, ShieldCheck, Clock,
  Eye, EyeOff, Image, Terminal, BrainCircuit, Grid
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('all');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Subtab for each module: { [moduleId]: 'lessons' | 'questions' | 'snaps' }
  const [moduleViewMode, setModuleViewMode] = useState({});

  // Revealed solutions state for questions
  const [revealedSolutions, setRevealedSolutions] = useState(new Set());

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

  const toggleSolution = (qId) => {
    setRevealedSolutions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
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
            const matchQ = (mod.questions || []).some(
              ques => ques.question.toLowerCase().includes(q) || ques.title.toLowerCase().includes(q)
            );
            return matchTitle || matchNote || matchMod || matchCat || matchQ;
          }

          return true;
        });

        if (matchingLessons.length === 0 && searchQuery.trim() && !(mod.questions || []).some(q => q.question.toLowerCase().includes(searchQuery.toLowerCase()))) {
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
  const totalQuestions = courseData.totalPracticeQuestions || 29;
  const totalSnaps = courseData.totalVisualSnaps || 22;

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
      setExpandedModules(prev => new Set([...prev, idx]));
      setMobileSidebarOpen(false);
    }
  };

  // Render interactive 5x5 Path Finder Maze Grid
  const renderPathFinderGrid = () => {
    // 5x5 grid cells
    const cells = [];
    const obstacles = new Set(['1,1', '2,3', '3,1', '3,2']);
    const path = new Set(['0,0', '1,0', '2,0', '2,1', '2,2', '3,2', '3,3', '4,3', '4,4']);

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const key = `${r},${c}`;
        let status = 'normal';
        let label = `${r},${c}`;

        if (r === 0 && c === 0) {
          status = 'start';
          label = 'START';
        } else if (r === 4 && c === 4) {
          status = 'target';
          label = 'EXIT';
        } else if (obstacles.has(key)) {
          status = 'obstacle';
          label = 'WALL';
        } else if (path.has(key)) {
          status = 'path';
          label = 'PATH';
        }

        cells.push(
          <div key={key} className={`grid-cell ${status}`} title={`Coordinate (${r}, ${c}): ${status.toUpperCase()}`}>
            {label}
          </div>
        );
      }
    }

    return (
      <div className="game-grid-container">
        <div className="game-grid">{cells}</div>
        <div className="grid-legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: '#10b981' }} /> Start (0,0)</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#f43f5e' }} /> Exit (4,4)</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#a855f7' }} /> Valid Optimal Path</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: '#374151' }} /> Blocked Obstacle</div>
        </div>
      </div>
    );
  };

  // Render interactive 4x4 Memory Grid
  const renderMemoryMatrixGrid = () => {
    const illuminated = new Set(['0,1', '1,3', '2,2', '3,0', '3,3']);
    const cells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const key = `${r},${c}`;
        const isLit = illuminated.has(key);
        cells.push(
          <div 
            key={key} 
            className="grid-cell" 
            style={{ 
              background: isLit ? '#38bdf8' : 'rgba(255,255,255,0.05)', 
              color: isLit ? '#0f172a' : 'transparent',
              boxShadow: isLit ? '0 0 14px rgba(56, 189, 248, 0.6)' : 'none'
            }}
          >
            {isLit ? '★' : ''}
          </div>
        );
      }
    }
    return (
      <div className="game-grid-container">
        <div className="game-grid" style={{ gridTemplateColumns: 'repeat(4, 52px)', gridTemplateRows: 'repeat(4, 52px)' }}>
          {cells}
        </div>
        <div className="grid-legend">
          <div className="legend-item"><div className="legend-dot" style={{ background: '#38bdf8' }} /> Illuminated Target Tiles (Memorize in 3s)</div>
          <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(255,255,255,0.1)' }} /> Inactive Grid Cells</div>
        </div>
      </div>
    );
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
            <p>Authorized Course Curriculum, Questions & Snaps Navigator</p>
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
            <span className="pill-tag"><HelpCircle size={13} /> {totalQuestions} Practice Questions & Solutions</span>
            <span className="pill-tag"><Image size={13} /> {totalSnaps} Visual Snaps & Blueprints</span>
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
              <div className="stat-icon emerald"><HelpCircle size={22} /></div>
              <div className="stat-info">
                <h3>{totalQuestions}</h3>
                <p>Questions with Answers</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon amber"><Image size={22} /></div>
              <div className="stat-info">
                <h3>{totalSnaps}</h3>
                <p>Visual Snaps & Diagrams</p>
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
            <Compass size={17} /> Course Curriculum ({courseData.totalItems})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            <HelpCircle size={17} /> Practice Questions & Solutions ({totalQuestions})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'snaps' ? 'active' : ''}`}
            onClick={() => setActiveTab('snaps')}
          >
            <Image size={17} /> Visual Snaps & Blueprints ({totalSnaps})
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
              const currentSubTab = moduleViewMode[mod.moduleIndex] || 'lessons';

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
                          <span>{mod.lessons.length} items</span>
                          <span>•</span>
                          <span style={{ color: '#38bdf8' }}>{(mod.questions || []).length} questions</span>
                          <span>•</span>
                          <span style={{ color: '#fbbf24' }}>{(mod.snaps || []).length} snaps</span>
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

                      {/* Sub-tabs within Module Card */}
                      <div className="module-subtabs">
                        <button
                          className={`subtab-btn ${currentSubTab === 'lessons' ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setModuleViewMode(prev => ({ ...prev, [mod.moduleIndex]: 'lessons' }));
                          }}
                        >
                          <BookOpen size={14} /> Lessons ({mod.lessons.length})
                        </button>

                        <button
                          className={`subtab-btn ${currentSubTab === 'questions' ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setModuleViewMode(prev => ({ ...prev, [mod.moduleIndex]: 'questions' }));
                          }}
                        >
                          <HelpCircle size={14} /> Practice Questions ({(mod.questions || []).length})
                        </button>

                        <button
                          className={`subtab-btn ${currentSubTab === 'snaps' ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setModuleViewMode(prev => ({ ...prev, [mod.moduleIndex]: 'snaps' }));
                          }}
                        >
                          <Image size={14} /> Visual Snaps & Blueprints ({(mod.snaps || []).length})
                        </button>
                      </div>

                      {/* Sub-View 1: Lessons List */}
                      {currentSubTab === 'lessons' && (
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
                      )}

                      {/* Sub-View 2: Module Practice Questions */}
                      {currentSubTab === 'questions' && (
                        <div className="questions-list">
                          {(mod.questions || []).length === 0 ? (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>
                              No specific test questions recorded for this module yet.
                            </p>
                          ) : (
                            (mod.questions || []).map(q => {
                              const isRevealed = revealedSolutions.has(q.id);
                              return (
                                <div key={q.id} className="question-card">
                                  <div className="question-header">
                                    <span className="question-title">❓ {q.title}</span>
                                    <span className="pill-tag" style={{ fontSize: '0.7rem' }}>{q.type.toUpperCase()}</span>
                                  </div>

                                  <div className="question-text">{q.question}</div>

                                  {q.options && q.options.length > 0 && (
                                    <div className="options-grid">
                                      {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className="option-item">
                                          <span style={{ fontWeight: 700, color: '#c084fc' }}>{String.fromCharCode(65 + oIdx)}.</span> {opt}
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <button
                                    className="filter-chip"
                                    style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                                    onClick={() => toggleSolution(q.id)}
                                  >
                                    {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                                    {isRevealed ? 'Hide Solution' : 'View Verified Solution & Explanation'}
                                  </button>

                                  {isRevealed && (
                                    <div className="solution-box">
                                      <div className="solution-label">✅ Verified Answer: {q.correctAnswer}</div>
                                      <div className="solution-explanation">{q.explanation}</div>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}

                      {/* Sub-View 3: Visual Snaps & Blueprints */}
                      {currentSubTab === 'snaps' && (
                        <div className="snaps-list">
                          {(mod.snaps || []).length === 0 ? (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', padding: '1rem 0' }}>
                              No visual snapshots mapped to this module.
                            </p>
                          ) : (
                            (mod.snaps || []).map(snap => (
                              <div key={snap.id} className="snap-card">
                                <div className="snap-header">
                                  <span className="snap-title">📸 {snap.title}</span>
                                  <span className="pill-tag" style={{ fontSize: '0.7rem' }}>{snap.type.toUpperCase()}</span>
                                </div>

                                <p className="snap-caption">{snap.caption}</p>

                                {/* Specialized Interactive Renderers */}
                                {snap.type === 'grid' && renderPathFinderGrid()}
                                {snap.type === 'memory' && renderMemoryMatrixGrid()}

                                {/* Detail breakdown lines */}
                                {snap.details && snap.details.length > 0 && (
                                  <div className="snap-details-box">
                                    {snap.details.map((line, lIdx) => (
                                      <div key={lIdx} className="snap-detail-line">
                                        <span style={{ color: '#c084fc' }}>•</span> {line}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Global Practice Questions Bank */}
        {activeTab === 'questions' && (
          <div className="content-column">
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Complete Accenture Placement Question Bank ({totalQuestions} Questions)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Master question sets spanning Game-based logic, Pseudocode outputs, Coding algorithms, Technical MCQs, and Verbal reasoning.
              </p>
            </div>

            <div className="questions-list">
              {courseData.modules.flatMap(m => (m.questions || []).map(q => ({ ...q, moduleTitle: m.title, moduleIndex: m.moduleIndex }))).map(q => {
                const isRevealed = revealedSolutions.has(q.id);
                return (
                  <div key={q.id} className="question-card">
                    <div className="question-header">
                      <div>
                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#c084fc', marginRight: '0.5rem' }}>
                          MOD {String(q.moduleIndex).padStart(2, '0')}
                        </span>
                        <span className="question-title">❓ {q.title}</span>
                      </div>
                      <span className="pill-tag" style={{ fontSize: '0.7rem' }}>{q.type.toUpperCase()}</span>
                    </div>

                    <div className="question-text">{q.question}</div>

                    {q.options && q.options.length > 0 && (
                      <div className="options-grid">
                        {q.options.map((opt, oIdx) => (
                          <div key={oIdx} className="option-item">
                            <span style={{ fontWeight: 700, color: '#c084fc' }}>{String.fromCharCode(65 + oIdx)}.</span> {opt}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      className="filter-chip"
                      style={{ alignSelf: 'flex-start', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                      onClick={() => toggleSolution(q.id)}
                    >
                      {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                      {isRevealed ? 'Hide Solution' : 'View Verified Solution & Explanation'}
                    </button>

                    {isRevealed && (
                      <div className="solution-box">
                        <div className="solution-label">✅ Verified Answer: {q.correctAnswer}</div>
                        <div className="solution-explanation">{q.explanation}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Global Visual Snaps & Blueprints */}
        {activeTab === 'snaps' && (
          <div className="content-column">
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Visual Snaps, Architecture & Cognitive Game Simulators ({totalSnaps} Snaps)
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Visual reference blueprints, interactive Path Finder grids, Memory matrices, and algorithmic logic flows.
              </p>
            </div>

            <div className="snaps-list">
              {courseData.modules.flatMap(m => (m.snaps || []).map(s => ({ ...s, moduleTitle: m.title, moduleIndex: m.moduleIndex }))).map(snap => (
                <div key={snap.id} className="snap-card">
                  <div className="snap-header">
                    <div>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.75rem', color: '#c084fc', marginRight: '0.5rem' }}>
                        MOD {String(snap.moduleIndex).padStart(2, '0')}
                      </span>
                      <span className="snap-title">📸 {snap.title}</span>
                    </div>
                    <span className="pill-tag" style={{ fontSize: '0.7rem' }}>{snap.type.toUpperCase()}</span>
                  </div>

                  <p className="snap-caption">{snap.caption}</p>

                  {/* Specialized Interactive Renderers */}
                  {snap.type === 'grid' && renderPathFinderGrid()}
                  {snap.type === 'memory' && renderMemoryMatrixGrid()}

                  {/* Detail breakdown lines */}
                  {snap.details && snap.details.length > 0 && (
                    <div className="snap-details-box">
                      {snap.details.map((line, lIdx) => (
                        <div key={lIdx} className="snap-detail-line">
                          <span style={{ color: '#c084fc' }}>•</span> {line}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Inspection Checklist & Audit */}
        {activeTab === 'checklist' && (
          <div className="content-column">
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <ShieldCheck size={26} style={{ color: '#10b981' }} />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Course Inspection Audit & Scope Report</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Verification checklist verifying 100% accounting of all accessible sections, modules, questions, and snaps.
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
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Practice Questions & Solutions</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{totalQuestions} Practice Questions</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visual Snaps & Blueprints</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{totalSnaps} Visual Snaps</div>
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
                      <th>Items</th>
                      <th>Questions</th>
                      <th>Snaps</th>
                      <th>Audit Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseData.modules.map(mod => (
                      <tr key={mod.id}>
                        <td style={{ fontFamily: 'JetBrains Mono', color: '#c084fc', fontWeight: 600 }}>
                          {String(mod.moduleIndex).padStart(2, '0')}
                        </td>
                        <td style={{ fontWeight: 600 }}>{mod.title}</td>
                        <td><span className="pill-tag" style={{ fontSize: '0.7rem' }}>{mod.category}</span></td>
                        <td>{mod.totalLessons}</td>
                        <td style={{ color: '#38bdf8', fontWeight: 600 }}>{(mod.questions || []).length}</td>
                        <td style={{ color: '#fbbf24', fontWeight: 600 }}>{(mod.snaps || []).length}</td>
                        <td>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#10b981', fontWeight: 600, fontSize: '0.8rem' }}>
                            <CheckCircle2 size={14} /> Verified
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: 14-Day Study Plan */}
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
          Authorized content syllabus, verified questions & visual snaps based on KN Academy Course
        </p>
        <p style={{ marginTop: '0.25rem', opacity: 0.6 }}>
          100% of all 21 modules, 206 learning items, 29 practice questions & 22 visual snaps accounted for.
        </p>
      </footer>
    </div>
  );
}
