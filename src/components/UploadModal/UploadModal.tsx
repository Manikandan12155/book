import React, { useState } from 'react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onBookCreated: (book: any) => void
}

export function UploadModal({ isOpen, onClose, onBookCreated }: UploadModalProps) {
  const [isExtracting, setIsExtracting] = useState(false)
  const [progressText, setProgressText] = useState('')
  const [dragActive, setDragActive] = useState(false)

  if (!isOpen) return null

  const processFile = async (file: File) => {
    if (!file) return
    setIsExtracting(true)
    setProgressText(`Reading ${file.name}...`)

    try {
      let pages: string[] = []
      let pdfPageImages: string[] = []

      if (file.name.endsWith('.pdf')) {
        // PDF File parsing via PDF.js Canvas Rendering
        if (!(window as any).pdfjsLib) {
          throw new Error('PDF.js library loading... Please try again in a moment.')
        }

        const arrayBuffer = await file.arrayBuffer()
        const pdf = await (window as any).pdfjsLib.getDocument({ data: arrayBuffer }).promise
        
        const numPages = pdf.numPages
        const renderLimit = Math.min(numPages, 30) // Pre-render up to 30 pages HD for zero lag & fast memory
        for (let i = 1; i <= numPages; i++) {
          setProgressText(`Rendering page ${i} of ${numPages} in high quality...`)
          const page = await pdf.getPage(i)
          
          if (i <= renderLimit) {
            // Render page to high-DPI canvas for exact original formatting, colors & ultra-sharp text
            const scale = 2.0
            const viewport = page.getViewport({ scale })
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            canvas.width = viewport.width
            canvas.height = viewport.height

            if (context) {
              await page.render({
                canvasContext: context,
                viewport: viewport
              }).promise

              const imgDataUrl = canvas.toDataURL('image/png')
              pdfPageImages.push(imgDataUrl)

              // Explicit memory release for canvas element
              canvas.width = 0
              canvas.height = 0
            }
          }

          // Extract text for TOC & summary metadata
          const textContent = await page.getTextContent()
          const pageText = textContent.items.map((item: any) => item.str).join(' ')
          if (pageText.trim()) {
            pages.push(pageText.trim())
          }
        }
      } else {
        // Plain text or Markdown file parsing
        const text = await file.text()
        const words = text.split(/\s+/)
        let currentPage = ''
        for (const word of words) {
          if ((currentPage + ' ' + word).length > 550) {
            pages.push(currentPage.trim())
            currentPage = word
          } else {
            currentPage += ' ' + word
          }
        }
        if (currentPage.trim()) {
          pages.push(currentPage.trim())
        }
      }

      if (pages.length === 0 && pdfPageImages.length === 0) {
        pages = ['No readable text found in document.']
      }

      // Generate Table of Contents items from pages
      const toc = pages.slice(0, 6).map((p, idx) => ({
        title: `Section ${idx + 1}: ${p.substring(0, 25)}...`,
        topics: [p.substring(25, 50), p.substring(50, 75)].filter(Boolean),
        page: String(idx + 3).padStart(2, '0')
      }))

      const bookTitle = file.name.replace(/\.[^/.]+$/, '')

      const newCustomBook = {
        id: Date.now(),
        title: bookTitle,
        author: 'Uploaded Document • Manikandan',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
        color: 'from-amber-900 to-amber-950',
        isCustom: true,
        fileName: file.name,
        pdfPages: pages,
        pdfPageImages: pdfPageImages,
        toc: toc,
        subTitle: bookTitle,
        quote: `"${file.name} — Imported custom document into Nexoria 3D Library."`,
        img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
        sectionTitle: '1.1 Document Reader Overview',
        dropCap: bookTitle.charAt(0).toUpperCase() || 'D',
        sectionText1: pages[0] || 'Custom document content loaded into interactive flipbook.',
        sectionText2: pages[1] || 'Turn pages to continue reading extracted document content.',
        codeSnippet: `// Document Metadata\nconst doc = {\n  name: "${file.name}",\n  pagesCount: ${pages.length || pdfPageImages.length},\n  author: "Manikandan"\n};`
      }

      onBookCreated(newCustomBook)
      setIsExtracting(false)
      onClose()
    } catch (err: any) {
      alert(`Error reading file: ${err.message || err}`)
      setIsExtracting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#120a06] border border-amber-500/40 rounded-2xl w-full max-w-lg p-6 text-amber-100 shadow-2xl relative animate-fade-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          disabled={isExtracting}
          className="absolute top-4 right-4 text-amber-400/60 hover:text-amber-300 text-lg w-8 h-8 rounded-full border border-amber-500/20 flex items-center justify-center hover:bg-amber-950/60"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-full border border-amber-500/50 bg-black/50 flex items-center justify-center text-2xl text-amber-400 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            📖
          </div>
          <h2 className="text-xl sm:text-2xl font-cinzel text-amber-400 font-bold">Custom Book Upload</h2>
          <p className="text-xs text-amber-200/60 font-serif mt-1">Upload any PDF, TXT, or Markdown document to read inside 3D FlipBook</p>
        </div>

        {isExtracting ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"></div>
            <p className="text-sm font-cinzel text-amber-300 animate-pulse">{progressText}</p>
          </div>
        ) : (
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer flex flex-col items-center justify-center ${
              dragActive ? 'border-amber-400 bg-amber-950/40' : 'border-amber-900/40 hover:border-amber-500/50 bg-black/30'
            }`}
          >
            <span className="text-4xl mb-3">📄</span>
            <p className="text-sm font-semibold text-amber-200 mb-1">Drag & Drop your PDF file here</p>
            <p className="text-xs text-amber-100/40 mb-4">Supports .pdf, .txt, .md files</p>
            
            <label className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-800 text-amber-950 font-cinzel font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 cursor-pointer shadow-lg transition">
              Browse File
              <input 
                type="file" 
                accept=".pdf,.txt,.md" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-[10px] font-cinzel text-amber-500/50 uppercase tracking-widest">
            Powered by Nexoria PDF Parsing Engine • Author: Manikandan
          </span>
        </div>

      </div>
    </div>
  )
}
