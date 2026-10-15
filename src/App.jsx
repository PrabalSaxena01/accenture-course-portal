import React, { useState, useEffect, useMemo, useRef } from 'react';
import './App.css';
import courseData from './data/course_data.json';
import {
  Search, Moon, Sun, ChevronDown, ChevronUp, ExternalLink,
  CheckCircle2, Circle, Eye, EyeOff, BookOpen, HelpCircle,
  Image, Sparkles, Layers, Filter, Check, X, Code2, Compass
} from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' | 'curriculum' | 'visuals' | 'plan'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('ALL');
  const [questionFilter, setQuestionFilter] = useState('ALL'); // 'ALL' | 'VISUAL' | 'CODING'
  const [displayLimit, setDisplayLimit] = useState(30);

  // User responses & revealed solutions
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedSolutions, setRevealedSolutions] = useState(new Set());

  // Completed curriculum lessons
  const [completedItems, setCompletedItems] = useState(() => {
    const saved = localStorage.getItem('accenture_completed_items');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        console.error(e);
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

  // Expanded curriculum modules
  const [expandedModules, setExpandedModules] = useState(() => new Set([1, 4, 5, 6, 7, 9, 13]));
  const [moduleViewMode, setModuleViewMode] = useState({}); // { [modId]: 'lessons' | 'questions' }

  const searchInputRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist completed items
  useEffect(() => {
    localStorage.setItem('accenture_completed_items', JSON.stringify(Array.from(completedItems)));
  }, [completedItems]);

  // Keyboard shortcut '/' to search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleItemCompletion = (id) => {
    setCompletedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSolution = (qId) => {
    setRevealedSolutions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handleSelectOption = (qId, option) => {
    setUserAnswers(prev => ({ ...prev, [qId]: option }));
    setRevealedSolutions(prev => new Set(prev).add(qId));
  };

  const toggleModuleAccordion = (idx) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Flattened all questions with module context
  const allFlattenedQuestions = useMemo(() => {
    const list = [];
    courseData.modules.forEach(m => {
      const qs = m.allQuestions && m.allQuestions.length > 0 ? m.allQuestions : (m.questions || []);
      qs.forEach(q => {
        list.push({
          ...q,
          moduleIndex: m.moduleIndex,
          moduleTitle: m.title
        });
      });
    });
    return list;
  }, []);

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allFlattenedQuestions.filter(item => {
      // Module filter
      if (selectedModule !== 'ALL' && item.moduleIndex !== Number(selectedModule)) {
        return false;
      }
      // Type filter
      if (questionFilter === 'VISUAL' && !item.hasVisual) return false;
      if (questionFilter === 'CODING') {
        const isCodeType = item.type === 'coding' || item.type === 'coding_lab';
        const txt = (item.question + ' ' + (item.title || '')).toLowerCase();
        const hasCodeKeyword = txt.includes('sql') || txt.includes('select ') || txt.includes('javascript') || txt.includes('function') || txt.includes('array');
        if (!isCodeType && !hasCodeKeyword) return false;
      }

      // Search query
      if (!q) return true;
      const questionText = (item.question || '').toLowerCase();
      const titleText = (item.title || '').toLowerCase();
      const ansText = (item.correctAnswer || '').toLowerCase();
      const expText = (item.explanation || '').toLowerCase();
      const modText = (item.moduleTitle || '').toLowerCase();
      return questionText.includes(q) || titleText.includes(q) || ansText.includes(q) || expText.includes(q) || modText.includes(q);
    });
  }, [allFlattenedQuestions, searchQuery, selectedModule, questionFilter]);

  // Statistics
  const totalQuestions = allFlattenedQuestions.length;
  const completedCount = completedItems.size;
  const totalLessons = courseData.totalItems;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const visualQuestionsCount = allFlattenedQuestions.filter(q => q.hasVisual).length;

  // Unique visual blueprints count (25 blueprints + 2 simulators)
  const uniqueVisualsCount = useMemo(() => {
    const set = new Set();
    allFlattenedQuestions.forEach(q => {
      if (q.hasVisual && q.imageSrc) set.add(q.imageSrc);
    });
    return set.size + 2; // +2 for Path Finder and Memory Matrix
  }, [allFlattenedQuestions]);

  // Format question text cleanly (avoid unnecessary code fence boxes for simple text)
  const renderQuestionBody = (text) => {
    if (!text) return null;
    const clean = text.trim();
    if (clean.startsWith('```') && clean.endsWith('```')) {
      const inner = clean.slice(3, -3).trim();
      // If simple one-liner text, render as plain prose
      if (!inner.includes('\n') && !inner.includes('{') && !inner.includes(';') && !inner.includes('SELECT') && !inner.includes('class ')) {
        return <p className="question-prose">{inner}</p>;
      }
      return <pre className="question-code-block"><code>{inner}</code></pre>;
    }
    if (clean.includes('```')) {
      const parts = clean.split(/(```[\s\S]*?```)/g);
      return parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const codeContent = part.replace(/^```\w*\n?/, '').replace(/```$/, '');
          return <pre key={i} className="question-code-block"><code>{codeContent}</code></pre>;
        }
        return part.trim() ? <p key={i} className="question-prose">{part}</p> : null;
      });
    }
    return <p className="question-prose">{clean}</p>;
  };

  // Render question card
  const renderQuestion = (q, index) => {
    const isRevealed = revealedSolutions.has(q.id);
    const chosen = userAnswers[q.id];

    return (
      <article key={q.id} className="q-card">
        {/* Meta Header */}
        <div className="q-meta">
          <div className="q-meta-left">
            <span className="q-num">#{index + 1}</span>
            <span className="q-badge mod-badge">Mod {String(q.moduleIndex).padStart(2, '0')}</span>
            {q.quizTitle && <span className="q-badge set-badge">{q.quizTitle}</span>}
            {q.hasVisual && <span className="q-badge visual-badge">📸 Diagram</span>}
          </div>
          <span className="q-topic">{q.moduleTitle}</span>
        </div>

        {/* Question Statement */}
        <div className="q-body">
          {renderQuestionBody(q.question)}
        </div>

        {/* Embedded Vector Diagram Blueprint */}
        {q.imageSvg ? (
          <div className="q-visual-wrapper" dangerouslySetInnerHTML={{ __html: q.imageSvg }} />
        ) : q.imageSrc ? (
          <div className="q-visual-wrapper">
            <img src={q.imageSrc} alt={q.title || 'Question Diagram'} />
          </div>
        ) : null}

        {/* Options */}
        {q.options && q.options.length > 0 && (
          <div className="q-options">
            {q.options.map((opt, oIdx) => {
              const letter = String.fromCharCode(65 + oIdx);
              const cleanText = opt.replace(/^[A-D]\)\s*/, '');
              const isSelected = chosen === opt;
              const isCorrect = q.correctAnswer && (
                opt === q.correctAnswer ||
                opt.startsWith(q.correctAnswer.substring(0, 2)) ||
                q.correctAnswer.startsWith(`${letter})`) ||
                q.correctAnswer.includes(cleanText)
              );

              let optClass = 'opt-btn';
              if (isSelected && isCorrect) optClass += ' is-correct';
              else if (isSelected && !isCorrect) optClass += ' is-wrong';
              else if (isRevealed && isCorrect) optClass += ' is-hint';

              return (
                <button
                  key={oIdx}
                  type="button"
                  className={optClass}
                  onClick={() => handleSelectOption(q.id, opt)}
                >
                  <span className="opt-key">{letter}</span>
                  <span className="opt-val">{cleanText}</span>
                  {isSelected && isCorrect && <span className="opt-status correct">✓ Correct</span>}
                  {isSelected && !isCorrect && <span className="opt-status wrong">✕ Incorrect</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Action Toggle */}
        <div className="q-footer">
          <button
            type="button"
            className="btn-toggle-answer"
            onClick={() => toggleSolution(q.id)}
          >
            {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
            <span>{isRevealed ? 'Hide Explanation' : 'View Answer & Explanation'}</span>
          </button>
        </div>

        {/* Solution Drawer */}
        {isRevealed && (
          <div className="q-solution">
            <div className="sol-answer">
              <span className="sol-tag">Correct Answer</span>
              <strong>{q.correctAnswer}</strong>
            </div>
            {q.explanation && (
              <div className="sol-explanation">
                {q.explanation.trim()}
              </div>
            )}
          </div>
        )}
      </article>
    );
  };

  // 5x5 Maze Simulator
  const renderPathFinder = () => {
    const obstacles = new Set(['1,1', '2,3', '3,1', '3,2']);
    const path = new Set(['0,0', '1,0', '2,0', '2,1', '2,2', '3,2', '3,3', '4,3', '4,4']);
    const cells = [];
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const key = `${r},${c}`;
        let status = 'normal';
        let label = '';
        if (r === 0 && c === 0) { status = 'start'; label = 'IN'; }
        else if (r === 4 && c === 4) { status = 'exit'; label = 'OUT'; }
        else if (obstacles.has(key)) { status = 'wall'; label = '✕'; }
        else if (path.has(key)) { status = 'path'; label = '•'; }
        cells.push(
          <div key={key} className={`maze-cell ${status}`}>{label}</div>
        );
      }
    }
    return (
      <div className="maze-wrap">
        <div className="maze-grid">{cells}</div>
        <div className="maze-caption">
          <span className="dot dot-start" /> Start (0,0) &nbsp;
          <span className="dot dot-exit" /> Exit (4,4) &nbsp;
          <span className="dot dot-path" /> Solution Path &nbsp;
          <span className="dot dot-wall" /> Obstacle
        </div>
      </div>
    );
  };

  // 4x4 Memory Grid Simulator
  const renderMemoryGrid = () => {
    const lit = new Set(['0,1', '1,3', '2,2', '3,0', '3,3']);
    const cells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const isLit = lit.has(`${r},${c}`);
        cells.push(
          <div key={`${r},${c}`} className={`mem-cell ${isLit ? 'lit' : ''}`}>
            {isLit ? '★' : ''}
          </div>
        );
      }
    }
    return (
      <div className="maze-wrap">
        <div className="mem-grid">{cells}</div>
        <div className="maze-caption">
          <span className="dot dot-lit" /> Target positions to recall within 3 seconds
        </div>
      </div>
    );
  };

  return (
    <div className="site-wrapper">
      {/* Top Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => { setActiveTab('questions'); setSelectedModule('ALL'); }}>
            <span className="brand-logo">⚡</span>
            <div className="brand-titles">
              <span className="brand-name">Accenture Prep</span>
              <span className="brand-badge">{totalQuestions.toLocaleString()} Questions</span>
            </div>
          </div>

          {/* Navigation Segments */}
          <nav className="nav-tabs">
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              <HelpCircle size={15} />
              <span>Question Bank</span>
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveTab('curriculum')}
            >
              <BookOpen size={15} />
              <span>Curriculum</span>
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'visuals' ? 'active' : ''}`}
              onClick={() => setActiveTab('visuals')}
            >
              <Image size={15} />
              <span>Visuals ({uniqueVisualsCount})</span>
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${activeTab === 'plan' ? 'active' : ''}`}
              onClick={() => setActiveTab('plan')}
            >
              <Sparkles size={15} />
              <span>14-Day Plan</span>
            </button>
          </nav>

          {/* Utilities */}
          <div className="nav-actions">
            <div className="progress-pill" title={`${completedCount} of ${totalLessons} lessons marked done`}>
              <span className="progress-bar-inline" style={{ width: `${progressPercent}%` }} />
              <span className="progress-text">{progressPercent}% Done</span>
            </div>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="https://github.com/PrabalSaxena01/accenture-course-portal"
              target="_blank"
              rel="noreferrer"
              className="icon-btn"
              title="GitHub Repository"
            >
              <Code2 size={17} />
            </a>
          </div>
        </div>
      </header>

      {/* Quick Search & Filter Header */}
      {(activeTab === 'questions' || activeTab === 'curriculum') && (
        <section className="filter-strip">
          <div className="filter-inner">
            {/* Search Input */}
            <div className="search-bar">
              <Search size={16} className="search-ico" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search questions, SQL queries, code, or press / to focus..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="clear-btn" onClick={() => setSearchQuery('')}>
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter Chips & Module Selector */}
            <div className="filter-controls">
              {activeTab === 'questions' && (
                <div className="filter-chips">
                  <button
                    type="button"
                    className={`chip ${questionFilter === 'ALL' ? 'active' : ''}`}
                    onClick={() => setQuestionFilter('ALL')}
                  >
                    All ({totalQuestions})
                  </button>
                  <button
                    type="button"
                    className={`chip ${questionFilter === 'VISUAL' ? 'active' : ''}`}
                    onClick={() => setQuestionFilter('VISUAL')}
                  >
                    📸 Diagrams ({visualQuestionsCount})
                  </button>
                  <button
                    type="button"
                    className={`chip ${questionFilter === 'CODING' ? 'active' : ''}`}
                    onClick={() => setQuestionFilter('CODING')}
                  >
                    💻 Coding &amp; SQL
                  </button>
                </div>
              )}

              {/* Module Dropdown */}
              <select
                className="mod-select"
                value={selectedModule}
                onChange={e => setSelectedModule(e.target.value)}
              >
                <option value="ALL">All 21 Modules</option>
                {courseData.modules.map(m => (
                  <option key={m.moduleIndex} value={m.moduleIndex}>
                    Mod {String(m.moduleIndex).padStart(2, '0')}: {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Surfaces */}
      <main className="content-container">
        {/* TAB 1: QUESTION BANK */}
        {activeTab === 'questions' && (
          <div className="q-feed">
            <div className="q-count-bar">
              <span>Showing {Math.min(filteredQuestions.length, displayLimit)} of {filteredQuestions.length} matching questions</span>
              {selectedModule !== 'ALL' && (
                <button type="button" className="text-link" onClick={() => setSelectedModule('ALL')}>
                  Reset module filter
                </button>
              )}
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="empty-state">
                <p>No questions matched your search criteria.</p>
                <button type="button" className="btn-clean" onClick={() => { setSearchQuery(''); setQuestionFilter('ALL'); setSelectedModule('ALL'); }}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="q-list">
                  {filteredQuestions.slice(0, displayLimit).map((q, idx) => renderQuestion(q, idx))}
                </div>

                {filteredQuestions.length > displayLimit && (
                  <div className="load-more-wrap">
                    <button
                      type="button"
                      className="btn-load-more"
                      onClick={() => setDisplayLimit(prev => prev + 30)}
                    >
                      Load More Questions ({filteredQuestions.length - displayLimit} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 2: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="curriculum-view">
            <div className="curriculum-list">
              {courseData.modules
                .filter(m => selectedModule === 'ALL' || m.moduleIndex === Number(selectedModule))
                .filter(m => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return m.title.toLowerCase().includes(q) || m.lessons.some(l => l.title.toLowerCase().includes(q));
                })
                .map(mod => {
                  const isExpanded = expandedModules.has(mod.moduleIndex);
                  const subMode = moduleViewMode[mod.moduleIndex] || 'lessons';
                  const modQs = mod.allQuestions && mod.allQuestions.length > 0 ? mod.allQuestions : (mod.questions || []);

                  return (
                    <div key={mod.id} className="module-panel">
                      <div className="module-head" onClick={() => toggleModuleAccordion(mod.moduleIndex)}>
                        <div className="module-head-left">
                          <span className="mod-idx">{String(mod.moduleIndex).padStart(2, '0')}</span>
                          <div>
                            <h3 className="mod-title">{mod.title}</h3>
                            <span className="mod-sub">
                              {mod.lessons.length} lessons • {modQs.length} questions
                            </span>
                          </div>
                        </div>
                        <button type="button" className="icon-btn-sm">
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="module-content">
                          <div className="sub-toggle">
                            <button
                              type="button"
                              className={`sub-btn ${subMode === 'lessons' ? 'active' : ''}`}
                              onClick={() => setModuleViewMode(prev => ({ ...prev, [mod.moduleIndex]: 'lessons' }))}
                            >
                              Lessons ({mod.lessons.length})
                            </button>
                            <button
                              type="button"
                              className={`sub-btn ${subMode === 'questions' ? 'active' : ''}`}
                              onClick={() => setModuleViewMode(prev => ({ ...prev, [mod.moduleIndex]: 'questions' }))}
                            >
                              Questions ({modQs.length})
                            </button>
                          </div>

                          {subMode === 'lessons' ? (
                            <div className="lesson-stack">
                              {mod.lessons.map(l => {
                                const isDone = completedItems.has(l.id);
                                return (
                                  <div
                                    key={l.id}
                                    className={`lesson-row ${isDone ? 'done' : ''}`}
                                    onClick={() => toggleItemCompletion(l.id)}
                                  >
                                    <button type="button" className="check-ico">
                                      {isDone ? <CheckCircle2 size={18} className="check-done" /> : <Circle size={18} />}
                                    </button>
                                    <div className="lesson-info">
                                      <span className="lesson-label">{l.title}</span>
                                      {l.note && <span className="lesson-sub-note">{l.note}</span>}
                                    </div>
                                    <span className="lesson-type-badge">{l.type}</span>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="module-qs">
                              {modQs.map((q, qIdx) => renderQuestion(q, qIdx))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 3: VISUAL BLUEPRINTS */}
        {activeTab === 'visuals' && (
          <div className="visuals-gallery">
            {/* Interactive Maze Simulators */}
            <div className="gallery-card">
              <div className="gallery-header">
                <h3>Cognitive Path Finder Maze (Module 04)</h3>
                <span className="q-badge">Interactive Simulation</span>
              </div>
              <p className="gallery-desc">Calculates obstacle avoidance and optimal coordinates from (0,0) to exit (4,4).</p>
              {renderPathFinder()}
            </div>

            <div className="gallery-card">
              <div className="gallery-header">
                <h3>Cognitive Memory Matrix (Module 04)</h3>
                <span className="q-badge">Interactive Simulation</span>
              </div>
              <p className="gallery-desc">Rapid visual pattern retention grid tested in Accenture game-based assessment.</p>
              {renderMemoryGrid()}
            </div>

            {/* Dynamic Diagrams from Questions */}
            {allFlattenedQuestions
              .filter(q => q.hasVisual && q.imageSvg)
              .filter((q, i, arr) => arr.findIndex(t => t.imageSrc === q.imageSrc) === i) // Unique diagrams
              .map((q, idx) => (
                <div key={idx} className="gallery-card">
                  <div className="gallery-header">
                    <h3>{q.title || `Visual Blueprint ${idx + 1}`}</h3>
                    <span className="q-badge mod-badge">Mod {String(q.moduleIndex).padStart(2, '0')}</span>
                  </div>
                  <div className="gallery-svg" dangerouslySetInnerHTML={{ __html: q.imageSvg }} />
                  <div className="gallery-context">
                    <span className="sol-tag">Related Concept</span>
                    <p>{q.question}</p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* TAB 4: 14-DAY STUDY PLAN */}
        {activeTab === 'plan' && (
          <div className="plan-view">
            <div className="plan-grid">
              <div className="plan-card">
                <span className="plan-days">Days 1 – 3</span>
                <h4>Pattern &amp; Cognitive Games</h4>
                <p>Study Module 01 &amp; Module 03 patterns. Practice Module 04 Path Finder and Memory Matrix simulators.</p>
              </div>

              <div className="plan-card">
                <span className="plan-days">Days 4 – 6</span>
                <h4>Technical Core &amp; Pseudocode</h4>
                <p>Work through Module 05, 07, and 09. Focus on bitwise shifts, loop traces, and SQL relational joins.</p>
              </div>

              <div className="plan-card">
                <span className="plan-days">Days 7 – 9</span>
                <h4>Coding &amp; Algorithm Labs</h4>
                <p>Master Module 06, 12, and 13. Practice array transformations, prime sieves, and string uniformity checks.</p>
              </div>

              <div className="plan-card">
                <span className="plan-days">Days 10 – 12</span>
                <h4>Cloud, Security &amp; Full Mocks</h4>
                <p>Review Module 11 (Security/Cloud) and take timed mock tests in Module 15 &amp; 16.</p>
              </div>

              <div className="plan-card">
                <span className="plan-days">Days 13 – 14</span>
                <h4>Communication &amp; Final Review</h4>
                <p>Practice reading aloud, sentence repetition, and revision sheets in Module 19 &amp; 21.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="footer-strip">
        <p>Accenture Placement Practice Portal • {totalQuestions.toLocaleString()} Questions across {courseData.modules.length} Modules</p>
      </footer>
    </div>
  );
}
