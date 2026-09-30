import React, { useRef } from 'react'
import HTMLFlipBook from 'react-pageflip'

// @ts-ignore - react-pageflip doesn't export perfect types
const FlipBook = HTMLFlipBook as any

const PageCover = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="bg-[#300d02] h-full w-full shadow-2xl rounded-sm overflow-hidden border-2 border-[#1c0701]" ref={ref} data-density="hard">
      {props.children}
    </div>
  )
})
PageCover.displayName = 'PageCover'

const PageContent = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="bg-[#fdfaf0] h-full w-full relative overflow-hidden" ref={ref} 
         style={{
           backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
           boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
         }}>
      
      {/* Binding shadow */}
      <div className={`absolute top-0 bottom-0 ${props.side === 'left' ? 'right-0 w-8 bg-gradient-to-l' : 'left-0 w-8 bg-gradient-to-r'} from-black/10 to-transparent pointer-events-none z-10`}></div>
      
      <div className="p-10 h-full flex flex-col">
        {props.children}
      </div>
      
      {/* Page number */}
      <div className={`absolute bottom-4 ${props.side === 'left' ? 'left-6' : 'right-6'} text-xs font-serif text-amber-900/40`}>
        {props.number}
      </div>
    </div>
  )
})
PageContent.displayName = 'PageContent'

export function Book({ bookId = 1 }: { bookId?: number }) {
  const bookRef = useRef<any>(null)

  // A helper mapping to grab the title based on ID
  const levelTitles: Record<number, string> = {
    1: 'Python Foundations',
    2: 'Data Structures',
    3: 'Math for ML',
    4: 'Data Manipulation',
    5: 'ML Fundamentals',
    6: 'Advanced ML',
    7: 'Deep Learning',
    8: 'Computer Vision',
    9: 'NLP',
    10: 'Transformers',
    11: 'RAG',
    12: 'Reinforcement Learning',
    13: 'MLOps',
    14: 'Autonomous Agents'
  }
  
  const bookTitle = levelTitles[bookId] || 'Retrieval-Augmented Generation'

  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh] px-10">
      
      {/* The Flipbook Component */}
      <div className="relative w-full h-full max-w-5xl flex justify-center items-center">
        <FlipBook
          width={450}
          height={650}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book drop-shadow-2xl"
          ref={bookRef}
        >
          
          {/* Page 1: Front Cover */}
          <PageCover>
            <div className="relative flex flex-col items-center justify-center h-full border-[8px] border-double border-amber-500/30 p-10 m-4 bg-[#2b0c02] overflow-hidden">
              <img src="/leather.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-100 pointer-events-none" />
              <div className="text-center relative z-10">
                <h1 className="text-5xl font-cinzel text-amber-500 mb-4 uppercase tracking-[0.2em] font-bold drop-shadow-sm">NEXORIA</h1>
                <div className="h-px w-32 bg-amber-500/50 mx-auto mb-4"></div>
                <p className="text-lg italic text-amber-400 font-serif">{bookTitle}</p>
              </div>
            </div>
          </PageCover>

          {/* Page 2: Inside Front Cover */}
          <PageContent side="left" number=""></PageContent>

          {/* Page 3: Table of Contents */}
          <PageContent side="right" number="1">
            <h2 className="text-xl font-cinzel mb-8 text-center text-amber-900 uppercase tracking-[0.2em] border-b border-amber-900/30 pb-4">Table of Contents</h2>
            <ul className="text-lg space-y-6 font-serif text-amber-950 font-medium">
              <li className="flex justify-between border-b border-dashed border-amber-900/20 pb-1"><span>01. Vector Databases</span><span>3</span></li>
              <li className="flex justify-between border-b border-dashed border-amber-900/20 pb-1"><span>02. What is RAG?</span><span>5</span></li>
              <li className="flex justify-between border-b border-dashed border-amber-900/20 pb-1"><span>03. Embedding Models</span><span>12</span></li>
              <li className="flex justify-between border-b border-dashed border-amber-900/20 pb-1"><span>04. Context Injection</span><span>18</span></li>
              <li className="flex justify-between border-b border-dashed border-amber-900/20 pb-1"><span>05. Production RAG</span><span>25</span></li>
            </ul>
          </PageContent>

          {/* Page 4: Chapter Title */}
          <PageContent side="left" number="2">
            <div className="flex items-center justify-center mb-10 mt-10">
              <div className="h-px flex-1 bg-amber-900/30"></div>
              <h2 className="text-sm font-cinzel uppercase tracking-[0.25em] text-amber-900/80 mx-6">Level {String(bookId).padStart(2, '0')}</h2>
              <div className="h-px flex-1 bg-amber-900/30"></div>
            </div>
            <h1 className="text-4xl font-cinzel text-center mb-10 text-amber-950 leading-tight drop-shadow-sm">{bookTitle}</h1>
            <div className="relative p-2 bg-white/40 rounded shadow-md mb-8 border border-amber-900/10">
              <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop" className="w-full h-48 object-cover rounded-sm mix-blend-multiply opacity-90 contrast-125 sepia-[.2]" />
            </div>
            <p className="text-lg italic text-center text-amber-900/90 font-serif leading-relaxed px-4">
              "Memory is not just about storing information, it is about retrieving it at the right time."
            </p>
          </PageContent>

          {/* Page 5: What is RAG? */}
          <PageContent side="right" number="3">
            <h2 className="text-4xl font-cinzel mb-8 text-amber-950 border-b border-amber-900/20 pb-4">2.1 What is RAG?</h2>
            <p className="text-lg leading-relaxed mb-6 text-amber-950 font-serif text-justify" style={{ textIndent: '2rem' }}>
              <span className="float-left text-7xl leading-[0.8] mr-3 mt-2 text-amber-900 font-bold font-cinzel drop-shadow-sm">R</span>etrieval-Augmented Generation is a technique that grounds Large Language Models (LLMs) with external, factual knowledge bases. It completely eliminates hallucinations by forcing the model to strictly cite verified context.
            </p>
            <p className="text-lg leading-relaxed mb-8 text-amber-950 font-serif text-justify" style={{ textIndent: '2rem' }}>
              By converting your documents into highly dense vector embeddings, a semantic search can instantly retrieve only the most relevant paragraphs and securely inject them straight into the model's prompt.
            </p>
          </PageContent>

          {/* Page 6: RAG Pipeline Code */}
          <PageContent side="left" number="4">
            <h2 className="text-2xl font-cinzel mb-6 text-amber-950 border-b border-amber-900/20 pb-2">Implementation</h2>
            <div className="bg-amber-900/5 p-6 rounded border border-amber-900/20 font-mono text-sm text-amber-950/90 shadow-inner mt-4">
              <code>
                // The RAG Pipeline<br/>
                const query = "What is Antigravity?";<br/>
                const vector = await embed(query);<br/>
                <br/>
                const docs = await vectorDB.search(vector, 3);<br/>
                const context = docs.map(d =&gt; d.text).join();<br/>
                <br/>
                const answer = await llm.generate(<br/>
                &nbsp;&nbsp;`Context: ${'{context}'}\nQuestion: ${'{query}'}`<br/>
                );
              </code>
            </div>
            <p className="text-lg leading-relaxed text-amber-950 font-serif text-justify mt-8" style={{ textIndent: '2rem' }}>
              The architecture elegantly separates knowledge storage from logical reasoning, unlocking enterprise scalability and factual accuracy.
            </p>
          </PageContent>

          {/* Page 7: Inside Back Cover */}
          <PageContent side="right" number=""></PageContent>

          {/* Page 8: Back Cover */}
          <PageCover>
            <div className="relative flex flex-col h-full items-center justify-center border-[8px] border-double border-amber-500/20 p-10 m-4 bg-[#2b0c02] overflow-hidden">
              <img src="/leather.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-100 pointer-events-none" />
              <div className="w-24 h-24 border-2 border-amber-500/40 rounded-full flex items-center justify-center mb-6 relative z-10">
                <div className="w-16 h-16 border border-amber-500/30 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-500/50 rounded-full"></div>
                </div>
              </div>
              <p className="text-sm font-cinzel uppercase tracking-[0.3em] text-amber-500/80">The End</p>
            </div>
          </PageCover>

        </FlipBook>
      </div>

    </div>
  )
}
