import { useState } from 'react'
import { Book } from './components/Book/Book'

const LIBRARY_BOOKS = [
  { id: 1, title: 'Python Foundations', author: 'Level 01', cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=400&auto=format&fit=crop', color: 'from-blue-800 to-blue-950' },
  { id: 2, title: 'Data Structures & Algorithms', author: 'Level 02', cover: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop', color: 'from-red-900 to-red-950' },
  { id: 3, title: 'Math for Machine Learning', author: 'Level 03', cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop', color: 'from-green-800 to-green-950' },
  { id: 4, title: 'Data Manipulation', author: 'Level 04', cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop', color: 'from-purple-800 to-purple-950' },
  { id: 5, title: 'ML Fundamentals', author: 'Level 05', cover: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=400&auto=format&fit=crop', color: 'from-teal-800 to-teal-950' },
  { id: 6, title: 'Advanced Machine Learning', author: 'Level 06', cover: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop', color: 'from-fuchsia-800 to-fuchsia-950' },
  { id: 7, title: 'Deep Learning', author: 'Level 07', cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop', color: 'from-indigo-800 to-indigo-950' },
  { id: 8, title: 'Computer Vision', author: 'Level 08', cover: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=400&auto=format&fit=crop', color: 'from-orange-800 to-orange-950' },
  { id: 9, title: 'Natural Language Processing', author: 'Level 09', cover: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=400&auto=format&fit=crop', color: 'from-emerald-800 to-emerald-950' },
  { id: 10, title: 'Transformers & LLMs', author: 'Level 10', cover: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop', color: 'from-rose-800 to-rose-950' },
  { id: 11, title: 'Retrieval-Augmented Gen', author: 'Level 11', cover: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=400&auto=format&fit=crop', color: 'from-cyan-800 to-cyan-950' },
  { id: 12, title: 'Reinforcement Learning', author: 'Level 12', cover: 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?q=80&w=400&auto=format&fit=crop', color: 'from-red-800 to-red-950' },
  { id: 13, title: 'MLOps & Deployment', author: 'Level 13', cover: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop', color: 'from-lime-800 to-lime-950' },
  { id: 14, title: 'Autonomous AI Agents', author: 'Level 14', cover: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=400&auto=format&fit=crop', color: 'from-slate-700 to-slate-900' },
]

export default function App() {
  const [selectedBook, setSelectedBook] = useState<number | null>(1)
  return (
    <div className="w-screen h-screen font-sans relative overflow-hidden bg-[#0a0604] flex flex-col">
      
      {/* 2D Background Element to look like the reference library */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: 'url(/bg.jpg)' }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Floating UI matching reference */}
      <div className="w-full px-10 py-6 flex justify-between items-center z-50 text-amber-100/90 border-b border-amber-900/30 bg-black/40 backdrop-blur-sm shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border border-amber-500/50 flex items-center justify-center bg-black/50">
            <span className="text-amber-500 font-cinzel text-xl">N</span>
          </div>
          <h1 className="text-xl font-cinzel tracking-[0.15em] text-amber-400 drop-shadow-md">NEXORIA LIBRARY</h1>
        </div>
        <div className="flex space-x-8 text-sm font-sans tracking-wide">
          <button className="hover:text-amber-300 transition">Home</button>
          <button className="text-amber-400 border-b-2 border-amber-400 pb-1">Library</button>
          <button className="hover:text-amber-300 transition">AI Tutor</button>
          <button className="hover:text-amber-300 transition">Explore</button>
          <button className="hover:text-amber-300 transition">Bookmarks</button>
        </div>
      </div>

      {/* Main Content Area - Split Layout */}
      <div className="flex-1 w-full flex overflow-hidden z-10 relative">
        
        {/* Left Sidebar: Physical Book Stack */}
        <div className="w-[450px] h-full overflow-y-auto border-r border-amber-900/30 bg-[#0a0604] p-8 flex flex-col justify-end items-center custom-scrollbar shadow-[inset_-10px_0_20px_rgba(0,0,0,0.8)] relative">
          
          <div className="absolute top-8 text-center w-full">
            <h2 className="text-2xl font-cinzel text-amber-500 mb-1 drop-shadow-md">The Curriculum</h2>
            <p className="text-amber-100/50 font-sans text-xs uppercase tracking-widest">Select a volume to study</p>
          </div>

          <div className="flex flex-col-reverse items-center justify-end w-full mt-24 pb-10">
            {/* Base of the stack (desk/shadow) */}
            <div className="w-full h-4 bg-black/60 rounded-[100%] blur-md mt-2 absolute bottom-6"></div>

            {LIBRARY_BOOKS.map((book, index) => {
              // Create slight random-looking offsets based on index
              const offsetX = (index % 3 === 0) ? '-translate-x-2' : (index % 5 === 0) ? 'translate-x-3' : 'translate-x-0'
              const width = (index % 4 === 0) ? 'w-[95%]' : (index % 3 === 0) ? 'w-[90%]' : 'w-[100%]'
              const height = (index % 2 === 0) ? 'h-14' : 'h-12'
              const rotate = (index % 3 === 0) ? '-rotate-1' : (index % 7 === 0) ? 'rotate-1' : 'rotate-0'
              
              const isSelected = selectedBook === book.id

              return (
                <div 
                  key={book.id} 
                  onClick={() => setSelectedBook(book.id)}
                  className={`group relative flex items-center justify-center cursor-pointer transition-all duration-300 ${width} ${height} ${offsetX} ${rotate} ${
                    isSelected ? '-translate-y-4 scale-105 z-50' : 'hover:-translate-y-1 hover:scale-[1.02] z-10'
                  }`}
                  style={{ marginBottom: '-2px' }}
                >
                  {/* The Book Spine */}
                  <div className={`w-full h-full bg-gradient-to-r ${book.color} rounded-sm shadow-xl border-y border-[#1c0701] border-x-4 border-x-black/40 overflow-hidden relative flex items-center justify-between px-4`}>
                    
                    {/* Realistic Texture Map */}
                    <img src={index % 2 === 0 ? '/leather.jpg' : '/fabric.jpg'} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 pointer-events-none grayscale-[20%]" />

                    {/* Overall Brightening Wash */}
                    <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>

                    {/* Spine Curvature/Highlight */}
                    <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                    <div className="absolute inset-y-0 left-4 w-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none blur-sm"></div>

                    {/* Book Details on Spine */}
                    <div className="flex flex-col">
                      <span className="text-[9px] font-cinzel text-amber-500/70 tracking-widest">{book.author}</span>
                    </div>
                    
                    <h4 className={`font-cinzel text-sm sm:text-base font-bold tracking-wider text-center flex-1 mx-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] ${
                      isSelected ? 'text-amber-300' : 'text-amber-100/90 group-hover:text-amber-200'
                    }`}>
                      {book.title}
                    </h4>

                    {/* Decorative Elements */}
                    <div className="flex flex-col space-y-1 opacity-50">
                      <div className="w-1 h-8 bg-amber-500/50 rounded-full"></div>
                    </div>

                    {/* Active Glow */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-amber-500/10 shadow-[inset_0_0_20px_rgba(245,158,11,0.5)]"></div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Area: Book Preview */}
        <div className="flex-1 h-full flex flex-col items-center justify-center p-12 bg-black/20">
          {selectedBook ? (
            <div className="w-full h-full animate-fade-in flex items-center justify-center">
              {/* Pass the selected book ID to the Book component so it can render the right content */}
              <Book bookId={selectedBook} />
            </div>
          ) : (
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 mx-auto border border-amber-900/30 rounded-full flex items-center justify-center mb-6 bg-black/20">
                <span className="text-4xl text-amber-900/50 font-cinzel">?</span>
              </div>
              <h2 className="text-2xl font-cinzel text-amber-500/50 mb-2">No Volume Selected</h2>
              <p className="text-amber-100/30 font-sans">Choose a book from the stack on the left to begin reading.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
