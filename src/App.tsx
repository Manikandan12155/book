import { useState } from 'react'
import { Book } from './components/Book/Book'
import { UploadModal } from './components/UploadModal/UploadModal'

const INITIAL_LIBRARY_BOOKS = [
  { id: 1, title: 'Foundation & Computer Basics', author: 'Manikandan • Level 00', cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop', color: 'from-blue-800 to-blue-950' },
  { id: 2, title: 'Python End-to-End', author: 'Manikandan • Level 01', cover: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=400&auto=format&fit=crop', color: 'from-red-900 to-red-950' },
  { id: 3, title: 'Data Handling (NumPy & Pandas)', author: 'Manikandan • Level 02', cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop', color: 'from-green-800 to-green-950' },
  { id: 4, title: 'Maths for AI & Machine Learning', author: 'Manikandan • Level 03', cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop', color: 'from-purple-800 to-purple-950' },
  { id: 5, title: 'Classical Machine Learning', author: 'Manikandan • Level 04', cover: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop', color: 'from-teal-800 to-teal-950' },
  { id: 6, title: 'Deep Learning & Neural Networks', author: 'Manikandan • Level 05', cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop', color: 'from-fuchsia-800 to-fuchsia-950' },
  { id: 7, title: 'Natural Language Processing', author: 'Manikandan • Level 06', cover: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=400&auto=format&fit=crop', color: 'from-indigo-800 to-indigo-950' },
  { id: 8, title: 'GenAI, RAG & Fine-Tuning', author: 'Manikandan • Level 07', cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop', color: 'from-orange-800 to-orange-950' },
  { id: 9, title: 'Autonomous AI Agents & MCP', author: 'Manikandan • Level 08', cover: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=400&auto=format&fit=crop', color: 'from-emerald-800 to-emerald-950' },
  { id: 10, title: 'AI Application Development', author: 'Manikandan • Level 09', cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop', color: 'from-rose-800 to-rose-950' },
  { id: 11, title: 'Deployment & AI Infrastructure', author: 'Manikandan • Level 10', cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop', color: 'from-cyan-800 to-cyan-950' },
  { id: 12, title: 'Advanced AI & Observability', author: 'Manikandan • Level 11', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop', color: 'from-red-800 to-red-950' },
  { id: 13, title: 'Expert AI Engineer & SaaS', author: 'Manikandan • Level 12', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop', color: 'from-lime-800 to-lime-950' },
  { id: 14, title: 'Production Capstone Projects', author: 'Manikandan • Level 13', cover: 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?q=80&w=400&auto=format&fit=crop', color: 'from-slate-700 to-slate-900' },
]

export default function App() {
  const [libraryBooks, setLibraryBooks] = useState<any[]>(INITIAL_LIBRARY_BOOKS)
  const [selectedBook, setSelectedBook] = useState<number | null>(1)
  const [customBookData, setCustomBookData] = useState<any | null>(null)
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'stack' | 'reader' | 'tutor' | 'explore' | 'bookmarks'>('reader')
  const [desktopNav, setDesktopNav] = useState<'library' | 'tutor' | 'explore' | 'bookmarks'>('library')

  const handleSelectBook = (id: number) => {
    const foundCustom = libraryBooks.find(b => b.id === id && b.isCustom)
    if (foundCustom) {
      setCustomBookData(foundCustom)
    } else {
      setCustomBookData(null)
    }
    setSelectedBook(id)
    setActiveTab('reader')
    setDesktopNav('library')
  }

  const handleBookUploaded = (newBook: any) => {
    setLibraryBooks(prev => [newBook, ...prev])
    setSelectedBook(newBook.id)
    setCustomBookData(newBook)
    setActiveTab('reader')
    setDesktopNav('library')
  }

  return (
    <div className="w-full h-full min-h-screen font-sans relative overflow-x-hidden bg-[#0a0604] flex flex-col pb-16 md:pb-0">
      
      {/* 2D Background Element */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Floating Header Bar */}
      <header className="w-full px-4 sm:px-8 py-3 flex justify-between items-center z-50 text-amber-100/90 border-b border-amber-900/30 bg-black/60 backdrop-blur-md shadow-xl sticky top-0 shrink-0">
        <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => { setDesktopNav('library'); setActiveTab('reader'); }}>
          <div className="w-8 h-8 rounded-full border border-amber-500/50 flex items-center justify-center bg-black/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <span className="text-amber-500 font-cinzel text-lg font-bold">N</span>
          </div>
          <div>
            <h1 className="text-sm sm:text-lg font-cinzel tracking-[0.15em] text-amber-400 font-bold leading-none">NEXORIA</h1>
            <span className="text-[9px] text-amber-200/50 uppercase tracking-widest block font-sans">3D Interactive Library</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="flex items-center space-x-3 sm:space-x-6 lg:space-x-8 text-sm font-sans tracking-wide">
          <button 
            onClick={() => setDesktopNav('library')} 
            className={`hidden md:block transition ${desktopNav === 'library' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'hover:text-amber-300'}`}
          >
            Library
          </button>
          <button 
            onClick={() => setDesktopNav('tutor')} 
            className={`hidden md:block transition ${desktopNav === 'tutor' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'hover:text-amber-300'}`}
          >
            AI Tutor
          </button>
          <button 
            onClick={() => setDesktopNav('explore')} 
            className={`hidden md:block transition ${desktopNav === 'explore' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'hover:text-amber-300'}`}
          >
            Explore
          </button>
          <button 
            onClick={() => setDesktopNav('bookmarks')} 
            className={`hidden md:block transition ${desktopNav === 'bookmarks' ? 'text-amber-400 border-b-2 border-amber-400 pb-0.5' : 'hover:text-amber-300'}`}
          >
            Bookmarks
          </button>

          {/* Custom Book Upload Button */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-cinzel font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)] transition transform active:scale-95 border border-amber-400/50"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Custom Book Upload</span>
            <span className="sm:hidden">Upload PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content Area - Responsive Layout */}
      <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden z-10 relative">
        
        {/* Left Sidebar: Physical Book Stack */}
        <div className={`w-full md:w-[270px] lg:w-[310px] md:h-full overflow-y-auto border-r border-amber-900/30 bg-[#0a0604] p-3 sm:p-4 md:px-5 md:py-4 flex flex-col justify-start items-center custom-scrollbar shadow-[inset_-10px_0_20px_rgba(0,0,0,0.8)] relative ${
          activeTab === 'stack' && desktopNav === 'library' ? 'block flex-1 min-h-[75vh]' : desktopNav === 'library' ? 'hidden md:flex' : 'hidden'
        }`}>
          
          <div className="text-center w-full mb-3 shrink-0">
            <h2 className="text-lg sm:text-xl font-cinzel text-amber-500 mb-0.5 drop-shadow-md">The Curriculum</h2>
            <p className="text-amber-100/50 font-sans text-[9px] sm:text-[10px] uppercase tracking-widest">Select a volume to study</p>
          </div>

          <div className="flex flex-col items-center justify-start w-full pt-1 pb-6 relative">
            {libraryBooks.map((book, index) => {
              const offsetX = (index % 3 === 0) ? '-translate-x-1' : (index % 5 === 0) ? 'translate-x-1' : 'translate-x-0'
              const width = (index % 4 === 0) ? 'w-[96%]' : (index % 3 === 0) ? 'w-[92%]' : 'w-[100%]'
              const height = (index % 2 === 0) ? 'h-8 sm:h-9' : 'h-7 sm:h-8'
              const rotate = (index % 3 === 0) ? '-rotate-1' : (index % 7 === 0) ? 'rotate-1' : 'rotate-0'
              
              const isSelected = selectedBook === book.id
              const computedZIndex = isSelected ? 50 : libraryBooks.length - index

              return (
                <div 
                  key={book.id} 
                  onClick={() => handleSelectBook(book.id)}
                  className={`group relative flex items-center justify-center cursor-pointer transition-all duration-300 ${width} ${height} ${offsetX} ${rotate} ${
                    isSelected ? '-translate-y-1 sm:-translate-y-1.5 scale-[1.02] shadow-xl' : 'hover:-translate-y-0.5 hover:scale-[1.01] active:scale-95'
                  }`}
                  style={{ marginBottom: '-2px', zIndex: computedZIndex }}
                >
                  {/* The Book Spine */}
                  <div className={`w-full h-full bg-gradient-to-r ${book.color} rounded-sm shadow-md border-y border-[#1c0701] border-x sm:border-x-2 border-x-black/40 overflow-hidden relative flex items-center justify-between px-2 sm:px-3`}>
                    
                    {/* Realistic Texture Map */}
                    <img src={index % 2 === 0 ? '/leather.jpg' : '/fabric.jpg'} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 pointer-events-none grayscale-[20%]" />

                    {/* Overall Brightening Wash */}
                    <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

                    {/* Spine Curvature/Highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 left-1.5 sm:left-3 w-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none blur-sm"></div>

                    {/* Book Details on Spine */}
                    <div className="flex flex-col">
                      <span className="text-[7.5px] sm:text-[8.5px] font-cinzel text-amber-500/80 tracking-tight">{book.author.split('•')[1] || book.author}</span>
                    </div>
                    
                    <h4 className={`font-cinzel text-[10px] sm:text-xs font-bold tracking-wide text-center flex-1 mx-1.5 sm:mx-2 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                      isSelected ? 'text-amber-300' : 'text-amber-100/90 group-hover:text-amber-200'
                    }`}>
                      {book.isCustom ? `📄 ${book.title}` : book.title}
                    </h4>

                    {/* Decorative Elements */}
                    <div className="flex flex-col space-y-0.5 opacity-50">
                      <div className="w-1 h-4 sm:h-5 bg-amber-500/50 rounded-full"></div>
                    </div>

                    {/* Active Glow */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-amber-500/10 shadow-[inset_0_0_15px_rgba(245,158,11,0.5)]"></div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Base of the stack (desk shadow) */}
            <div className="w-full h-4 bg-black/60 rounded-[100%] blur-md mt-4"></div>
          </div>
        </div>

        {/* Right Area: Book Preview */}
        {desktopNav === 'library' && (
          <div className={`flex-1 w-full h-[calc(100dvh-116px)] md:h-full flex flex-col items-center justify-start md:justify-center p-1 sm:p-6 md:p-12 bg-black/20 overflow-hidden ${
            activeTab === 'reader' ? 'flex' : activeTab === 'tutor' || activeTab === 'explore' ? 'hidden' : 'hidden md:flex'
          }`}>
            {selectedBook ? (
              <div className="w-full h-full animate-fade-in flex items-center justify-center">
                <Book bookId={selectedBook} customBookData={customBookData} />
              </div>
            ) : (
              <div className="text-center animate-fade-in p-6">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto border border-amber-900/30 rounded-full flex items-center justify-center mb-4 sm:mb-6 bg-black/20">
                  <span className="text-2xl sm:text-4xl text-amber-900/50 font-cinzel">?</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-cinzel text-amber-500/50 mb-2">No Volume Selected</h2>
                <p className="text-xs sm:text-base text-amber-100/30 font-sans">Choose a book from the stack or upload a custom PDF to begin reading.</p>
              </div>
            )}
          </div>
        )}

        {/* AI Tutor View */}
        {(desktopNav === 'tutor' || (activeTab === 'tutor' && desktopNav === 'library')) && (
          <div className="flex-1 w-full h-full p-6 flex flex-col items-center justify-center text-center animate-slide-up bg-black/40">
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/40 bg-black/70 flex items-center justify-center mb-4 text-3xl text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              🤖
            </div>
            <h2 className="text-2xl font-cinzel text-amber-400 mb-2">Nexoria AI Tutor</h2>
            <p className="text-sm text-amber-100/70 max-w-md mb-6 font-serif">Ask any technical questions about ML algorithms, neural architectures, or RAG systems.</p>
            <div className="w-full max-w-lg bg-black/60 border border-amber-900/40 rounded-xl p-6 text-left text-sm text-amber-200/90 shadow-2xl backdrop-blur-md">
              <p className="text-amber-500 font-cinzel text-xs mb-2">PROMPT EXAMPLE:</p>
              "Explain the difference between Multi-Head Self-Attention and Cross-Attention in Transformers."
            </div>
          </div>
        )}

        {/* Explore View */}
        {(desktopNav === 'explore' || (activeTab === 'explore' && desktopNav === 'library')) && (
          <div className="flex-1 w-full h-full p-6 flex flex-col items-center justify-center text-center animate-slide-up bg-black/40">
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/40 bg-black/70 flex items-center justify-center mb-4 text-3xl text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              🧭
            </div>
            <h2 className="text-2xl font-cinzel text-amber-400 mb-2">Explore Curriculum</h2>
            <p className="text-sm text-amber-100/70 max-w-md font-serif">Discover 14 comprehensive Volumes designed for AI Engineers, ML Researchers, and System Architects.</p>
          </div>
        )}

        {/* Bookmarks View */}
        {desktopNav === 'bookmarks' && (
          <div className="flex-1 w-full h-full p-6 flex flex-col items-center justify-center text-center animate-slide-up bg-black/40">
            <div className="w-20 h-20 rounded-full border-2 border-amber-500/40 bg-black/70 flex items-center justify-center mb-4 text-3xl text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              🔖
            </div>
            <h2 className="text-2xl font-cinzel text-amber-400 mb-2">Saved Bookmarks</h2>
            <p className="text-sm text-amber-100/70 max-w-md font-serif">Bookmark key pages and code implementation snippets to access them instantly.</p>
          </div>
        )}
      </div>

      {/* NATIVE MOBILE APPLICATION BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0c0705]/95 border-t border-amber-900/50 backdrop-blur-xl px-2 py-1.5 flex justify-around items-center shadow-[0_-5px_20px_rgba(0,0,0,0.8)] safe-pb">
        <button 
          onClick={() => { setActiveTab('stack'); setDesktopNav('library'); }}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition active:scale-95 ${
            activeTab === 'stack' && desktopNav === 'library' ? 'text-amber-400 bg-amber-950/60 font-bold' : 'text-amber-100/50 hover:text-amber-200'
          }`}
        >
          <span className="text-lg leading-none mb-1">📚</span>
          <span className="text-[10px] font-cinzel tracking-tight">Stack</span>
        </button>

        <button 
          onClick={() => { setActiveTab('reader'); setDesktopNav('library'); }}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition active:scale-95 ${
            activeTab === 'reader' && desktopNav === 'library' ? 'text-amber-400 bg-amber-950/60 font-bold' : 'text-amber-100/50 hover:text-amber-200'
          }`}
        >
          <span className="text-lg leading-none mb-1">📖</span>
          <span className="text-[10px] font-cinzel tracking-tight">Reader</span>
        </button>

        <button 
          onClick={() => { setActiveTab('tutor'); setDesktopNav('tutor'); }}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition active:scale-95 ${
            activeTab === 'tutor' || desktopNav === 'tutor' ? 'text-amber-400 bg-amber-950/60 font-bold' : 'text-amber-100/50 hover:text-amber-200'
          }`}
        >
          <span className="text-lg leading-none mb-1">🤖</span>
          <span className="text-[10px] font-cinzel tracking-tight">AI Tutor</span>
        </button>

        <button 
          onClick={() => { setActiveTab('explore'); setDesktopNav('explore'); }}
          className={`flex flex-col items-center justify-center w-16 py-1 rounded-lg transition active:scale-95 ${
            activeTab === 'explore' || desktopNav === 'explore' ? 'text-amber-400 bg-amber-950/60 font-bold' : 'text-amber-100/50 hover:text-amber-200'
          }`}
        >
          <span className="text-lg leading-none mb-1">🧭</span>
          <span className="text-[10px] font-cinzel tracking-tight">Explore</span>
        </button>
      </nav>

      {/* Upload PDF Modal */}
      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onBookCreated={handleBookUploaded} 
      />

    </div>
  )
}


