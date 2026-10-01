import React, { useRef, useState, useEffect } from 'react'
import HTMLFlipBook from 'react-pageflip'

// @ts-ignore - react-pageflip doesn't export perfect types
const FlipBook = HTMLFlipBook as any

const PageCover = React.forwardRef((props: any, ref: any) => {
  const bgClass = props.bgClass || 'bg-[#300d02]'
  return (
    <div className={`${bgClass} h-full w-full shadow-2xl rounded-sm overflow-hidden border-2 border-amber-950/60 p-1.5 sm:p-3 flex flex-col transition-colors duration-500`} ref={ref} data-density="hard">
      {props.children}
    </div>
  )
})
PageCover.displayName = 'PageCover'

const PageContent = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="bg-[#fdfaf0] h-full w-full relative overflow-hidden flex flex-col" ref={ref} 
         style={{
           backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
           boxShadow: 'inset 0 0 12px rgba(0,0,0,0.12)'
         }}>
      
      {/* Page Margin Border */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-900/15 pointer-events-none rounded-sm"></div>

      {/* Binding shadow */}
      <div className={`absolute top-0 bottom-0 ${props.side === 'left' ? 'right-0 w-4 sm:w-8 bg-gradient-to-l' : 'left-0 w-4 sm:w-8 bg-gradient-to-r'} from-black/15 to-transparent pointer-events-none z-10`}></div>
      
      {/* Main Page Scrollable Area */}
      <div className="p-4 sm:p-6 md:p-8 pb-8 sm:pb-10 h-full flex flex-col justify-start overflow-y-auto custom-scrollbar z-0 relative">
        {props.children}
      </div>
      
      {/* Page number */}
      {props.number && (
        <div className={`absolute bottom-2 sm:bottom-3 ${props.side === 'left' ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} text-[10px] sm:text-xs font-serif text-amber-900/60 font-semibold select-none z-20`}>
          {props.number}
        </div>
      )}
    </div>
  )
})
PageContent.displayName = 'PageContent'

interface BookContent {
  subTitle: string
  quote: string
  img: string
  toc: Array<{ title: string; topics?: string[]; page: string }>
  sectionTitle: string
  dropCap: string
  sectionText1: string
  sectionText2: string
  codeSnippet: string
}

const BOOK_DATA: Record<number, BookContent> = {
  1: {
    subTitle: 'L00 — Foundation',
    quote: '"Build the programming foundation required for AI engineering."',
    img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Computer Basics', topics: ['OS basics', 'Terminal', 'File systems', 'Git & GitHub', 'VS Code', 'Package managers'], page: '03' },
      { title: '2. Programming Logic', topics: ['Variables', 'Conditions', 'Loops', 'Functions', 'Arrays', 'Objects', 'OOP', 'Async'], page: '08' },
    ],
    sectionTitle: '0.1 Foundation & Computing Logic',
    dropCap: 'C',
    sectionText1: 'omputer basics and terminal fluencies form the mandatory bedrock for modern software construction and cloud automation.',
    sectionText2: 'Mastering version control with Git, development environments, and fundamental control flow unlocks complex algorithm design.',
    codeSnippet: '# Shell & Environment Init\nexport AI_ENV="production"\ngit checkout -b feature/foundation-pipeline',
  },
  2: {
    subTitle: 'L01 — Python',
    quote: '"Master Python end-to-end for AI engineering."',
    img: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Python Basics', topics: ['Syntax', 'Data types', 'Loops', 'Functions', 'Modules', 'Exception handling'], page: '03' },
      { title: '2. Advanced Python', topics: ['OOP', 'Decorators', 'Generators', 'Iterators', 'Context managers', 'Asyncio'], page: '08' },
      { title: '3. Python for Backend', topics: ['APIs', 'JSON', 'Requests', 'Pydantic', 'pytest', 'SQLAlchemy', 'Redis'], page: '15' },
      { title: '4. Python Projects', topics: ['Calculator', 'API caller', 'File processor', 'Chat CLI'], page: '24' },
    ],
    sectionTitle: '1.1 Advanced Python Patterns',
    dropCap: 'P',
    sectionText1: 'ython is the premier language of artificial intelligence, combining expressive high-level abstractions with dynamic runtime capabilities.',
    sectionText2: 'Asynchronous event loops, decorator wrappers, and strict static type hints enable scalable production backend microservices.',
    codeSnippet: '# Asynchronous Python Task\nimport asyncio\nasync def fetch_embeddings(items):\n  return await asyncio.gather(*(embed(i) for i in items))',
  },
  3: {
    subTitle: 'L02 — Data',
    quote: '"Learn to wrangle, transform and visualize data fluently."',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. NumPy', topics: ['Arrays', 'Matrix operations', 'Broadcasting'], page: '03' },
      { title: '2. Pandas', topics: ['DataFrames', 'CSV', 'Cleaning', 'Filtering', 'Grouping'], page: '08' },
      { title: '3. Data Visualization', topics: ['Matplotlib', 'Graphs', 'Charts'], page: '16' },
    ],
    sectionTitle: '2.1 Vectorized Data Manipulation',
    dropCap: 'D',
    sectionText1: 'ata cleaning and structural transformations account for over eighty percent of real-world machine learning engineering time.',
    sectionText2: 'Vectorized operations compute elementwise array mathematics in optimized C-extensions, avoiding slow interpreted loop overhead.',
    codeSnippet: '# Pandas Matrix Cleaning\nimport pandas as pd\ndf = pd.read_csv("telemetry.csv")\ndf.fillna(df.median(numeric_only=True), inplace=True)',
  },
  4: {
    subTitle: 'L03 — Maths',
    quote: '"Build the mathematical intuition needed for AI."',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Statistics', topics: ['Mean', 'Median', 'Variance', 'Standard deviation'], page: '03' },
      { title: '2. Probability', topics: ['Conditional probability', 'Bayes theorem'], page: '08' },
      { title: '3. Linear Algebra', topics: ['Vectors', 'Matrices', 'Dot products'], page: '14' },
      { title: '4. Calculus', topics: ['Derivatives', 'Gradient descent'], page: '20' },
    ],
    sectionTitle: '3.1 Applied Vector Calculus',
    dropCap: 'M',
    sectionText1: 'athematical intuition transforms black-box model tuning into rigorous engineering with exact error bounds and convergence properties.',
    sectionText2: 'Partial derivatives compute loss surface gradients, guiding backpropagation weight updates along steepest descent trajectories.',
    codeSnippet: '# Gradient Descent Step\ndef update_weights(w, grad, lr=0.01):\n  return w - lr * grad',
  },
  5: {
    subTitle: 'L04 — Machine Learning',
    quote: '"Master classical ML from regression to ensemble models."',
    img: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. ML Basics', topics: ['AI vs ML vs DL', 'Features', 'Labels', 'Overfitting', 'Accuracy'], page: '03' },
      { title: '2. Supervised Learning', topics: ['Linear & Logistic regression', 'Decision trees', 'Random forest'], page: '08' },
      { title: '3. Advanced ML', topics: ['XGBoost', 'LightGBM', 'CatBoost', 'Feature engineering', 'Tuning'], page: '15' },
      { title: '4. Unsupervised Learning', topics: ['Clustering', 'K-Means', 'PCA'], page: '22' },
      { title: '5. Model Evaluation & Projects', topics: ['Precision', 'Recall', 'F1 score', 'Spam classifier', 'House prices'], page: '28' },
    ],
    sectionTitle: '4.1 Supervised Learning & Ensembles',
    dropCap: 'S',
    sectionText1: 'upervised models map high-dimensional feature vectors to target labels using inductive bias and cost function minimization.',
    sectionText2: 'Gradient boosted decision trees fit sequential weak learners iteratively to achieve state-of-the-art tabular prediction benchmarks.',
    codeSnippet: '# XGBoost Gradient Ensemble\nimport xgboost as xgb\nclf = xgb.XGBClassifier(n_estimators=200, max_depth=6)\nclf.fit(X_train, y_train)',
  },
  6: {
    subTitle: 'L05 — Deep Learning',
    quote: '"Understand neural networks, CNNs, RNNs and Transformers."',
    img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Neural Networks & Activations', topics: ['Neurons', 'Layers', 'Weights', 'ReLU', 'Sigmoid', 'Softmax'], page: '03' },
      { title: '2. Training Fundamentals', topics: ['Batch norm', 'Dropout', 'Losses', 'Adam optimizer', 'LR scheduling'], page: '08' },
      { title: '3. TensorFlow & PyTorch', topics: ['Tensors', 'Datasets', 'Training loops', 'Saving models'], page: '15' },
      { title: '4. CNN, RNN & LSTM', topics: ['Image processing', 'Object detection', 'Sequence learning'], page: '22' },
      { title: '5. Transformers', topics: ['Attention', 'Encoder', 'Decoder', 'BERT', 'GPT architecture'], page: '28' },
    ],
    sectionTitle: '5.1 Neural Graphs & Backpropagation',
    dropCap: 'N',
    sectionText1: 'eural networks combine multi-layer affine tensor transformations with non-linear activation functions to approximate complex manifolds.',
    sectionText2: 'Automatic differentiation constructs computational graphs, computing exact gradients via chain-rule backpropagation.',
    codeSnippet: '# PyTorch Deep Learning Layer\nimport torch.nn as nn\nclass NeuralNet(nn.Module):\n  def __init__(self):\n    self.layer = nn.Linear(784, 256)',
  },
  7: {
    subTitle: 'L06 — NLP',
    quote: '"Make machines understand human language."',
    img: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. NLP Basics', topics: ['Tokenization', 'Stemming', 'Lemmatization'], page: '03' },
      { title: '2. Text Processing', topics: ['Sentiment analysis', 'Text classification'], page: '08' },
      { title: '3. Embeddings', topics: ['Word2Vec', 'Sentence Transformers'], page: '15' },
    ],
    sectionTitle: '6.1 Semantic Word Vector Spaces',
    dropCap: 'T',
    sectionText1: 'ext processing pipelines transform raw natural language strings into numerical token ID representations and dense embeddings.',
    sectionText2: 'Continuous word vector spaces map semantic relationships geometrically, enabling contextual similarity search.',
    codeSnippet: '# Sentence Transformer Embedding\nfrom sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer("all-MiniLM-L6-v2")\nvec = model.encode("Hello AI")',
  },
  8: {
    subTitle: 'L07 — GenAI',
    quote: '"Master LLMs, prompting, RAG and fine-tuning."',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. LLM Basics & Prompting', topics: ['Tokens', 'Context window', 'Zero-shot', 'Few-shot', 'Chain of thought'], page: '03' },
      { title: '2. OpenAI APIs & Safety', topics: ['Chat completion', 'Function calling', 'Streaming', 'Guardrails'], page: '08' },
      { title: '3. Embeddings & Vector DBs', topics: ['Semantic search', 'FAISS', 'ChromaDB', 'Pinecone'], page: '15' },
      { title: '4. RAG & Context Injection', topics: ['Chunking', 'Retrieval', 'Hybrid search', 'Re-ranking', 'Filtering'], page: '22' },
      { title: '5. Fine-tuning & Local LLMs', topics: ['LoRA', 'PEFT', 'QLoRA', 'Ollama', 'LM Studio', 'GGUF'], page: '28' },
    ],
    sectionTitle: '7.1 Retrieval-Augmented Architectures',
    dropCap: 'R',
    sectionText1: 'etrieval-Augmented Generation connects Large Language Models to enterprise knowledge graphs, eliminating hallucinations with citations.',
    sectionText2: 'Parameter-efficient fine-tuning like LoRA adapts foundation models to domain-specific downstream tasks with low memory footprint.',
    codeSnippet: '# Local LLM Execution via Ollama\nimport ollama\nresp = ollama.chat(model="llama3", messages=[{"role": "user", "content": "RAG Summary"}])',
  },
  9: {
    subTitle: 'L08 — AI Agents',
    quote: '"Build autonomous, reasoning and tool-using AI systems."',
    img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Agent Basics', topics: ['Planning', 'Reasoning', 'Tool calling', 'ReAct pattern'], page: '03' },
      { title: '2. LangChain & LangGraph', topics: ['Chains', 'Memory', 'Tools', 'Multi-agent workflows', 'State'], page: '08' },
      { title: '3. Frameworks & Architectures', topics: ['CrewAI', 'AutoGen', 'Planner', 'Executor', 'Reflection agent'], page: '15' },
      { title: '4. MCP & Multi-Agent', topics: ['Model Context Protocol', 'Tool integrations', 'Task orchestration'], page: '24' },
    ],
    sectionTitle: '8.1 Agentic Tool Calling & Reasoning',
    dropCap: 'A',
    sectionText1: 'utonomous agents leverage ReAct loops to decompose multi-step objectives, execute API tools, and dynamically inspect intermediate outputs.',
    sectionText2: 'Model Context Protocol (MCP) standardizes secure tool discovery and resource sampling across multi-agent graph topographies.',
    codeSnippet: '// Model Context Protocol Tool Invocation\nconst agent = new Agent({ tools: [mcpSearchTool, codeInterpreter] });\nawait agent.run("Refactor microservice");',
  },
  10: {
    subTitle: 'L09 — AI Apps',
    quote: '"Ship production-ready AI applications end-to-end."',
    img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. AI Backend', topics: ['FastAPI', 'WebSockets', 'Streaming'], page: '03' },
      { title: '2. AI Frontend', topics: ['React', 'Chat UI', 'Voice UI'], page: '08' },
      { title: '3. Real-time AI', topics: ['Live responses', 'Notifications'], page: '14' },
      { title: '4. AI Security & Privacy', topics: ['Prompt injection', 'Rate limiting', 'Defense', 'Privacy', 'Safety'], page: '20' },
    ],
    sectionTitle: '9.1 Full-Stack Streaming AI',
    dropCap: 'F',
    sectionText1: 'astAPI backends stream token chunks via Server-Sent Events (SSE) and WebSockets to reactive user interfaces for low latency.',
    sectionText2: 'Production AI apps enforce prompt injection defenses, token rate-limiting, and encrypted telemetry auditing.',
    codeSnippet: '// Server-Sent Events Streaming\nconst response = await fetch("/api/chat", { method: "POST", body });\nconst reader = response.body.getReader();',
  },
  11: {
    subTitle: 'L10 — Deployment',
    quote: '"Deploy AI applications using modern infrastructure."',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Docker & Cloud', topics: ['Containers', 'Docker Compose', 'AWS', 'Vercel', 'Railway'], page: '03' },
      { title: '2. GPU Basics', topics: ['CUDA', 'VRAM', 'Quantization'], page: '08' },
      { title: '3. AI Infrastructure', topics: ['vLLM', 'TensorRT', 'ONNX', 'Kubernetes basics', 'GPU serving'], page: '15' },
      { title: '4. CI/CD', topics: ['GitHub Actions', 'Auto deployment'], page: '24' },
    ],
    sectionTitle: '10.1 High-Throughput Model Serving',
    dropCap: 'D',
    sectionText1: 'eploying foundation models efficiently requires GPU memory optimization, FP16/INT4 quantization, and continuous batching.',
    sectionText2: 'Inference engines like vLLM and TensorRT-LLM maximize token output throughput while minimizing p99 latency.',
    codeSnippet: '# vLLM High-Throughput Server\npython3 -m vllm.entrypoints.openai.api_server \\\n  --model meta-llama/Meta-Llama-3-8B-Instruct',
  },
  12: {
    subTitle: 'L11 — Advanced AI',
    quote: '"Learn multimodal AI, observability and AI system design."',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Fine-tuning & Multimodal', topics: ['Custom datasets', 'RLHF', 'Vision AI', 'Voice AI', 'OCR'], page: '03' },
      { title: '2. Voice & Vision AI', topics: ['Whisper', 'STT/TTS', 'YOLO', 'OpenCV', 'Image embeddings'], page: '08' },
      { title: '3. AI Observability & Research', topics: ['LangSmith', 'Tracing', 'Token tracking', 'Paper reading'], page: '15' },
      { title: '4. AI System Design', topics: ['Scalability', 'Memory systems', 'Agent orchestration', 'Scaling'], page: '24' },
    ],
    sectionTitle: '11.1 Multimodal System Observability',
    dropCap: 'M',
    sectionText1: 'ultimodal architectures process cross-domain text, speech, image, and video tensors inside unified embedding representation spaces.',
    sectionText2: 'Observability tools trace token costs, latency bottlenecks, and prompt telemetry across distributed agent execution runs.',
    codeSnippet: '# LangSmith Tracing Init\nimport os\nos.environ["LANGCHAIN_TRACING_V2"] = "true"\nos.environ["LANGCHAIN_API_KEY"] = "ls__secret"',
  },
  13: {
    subTitle: 'L12 — Expert',
    quote: '"Build AI products, models, open-source contributions and brand."',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Build AI Products', topics: ['AI SaaS', 'AI ERP', 'AI Assistant', 'Product thinking', 'Monetization'], page: '03' },
      { title: '2. Build Own Models', topics: ['Training pipelines', 'Dataset preparation'], page: '08' },
      { title: '3. Open Source', topics: ['Hugging Face', 'LangChain', 'PyTorch'], page: '15' },
      { title: '4. Personal Brand', topics: ['GitHub', 'Portfolio', 'LinkedIn', 'Technical content'], page: '22' },
    ],
    sectionTitle: '12.1 Production Model Ownership',
    dropCap: 'E',
    sectionText1: 'xpert AI engineers construct end-to-end autonomous products, custom pre-trained model checkpoints, and commercial SaaS businesses.',
    sectionText2: 'Contributing to open-source foundation frameworks like HuggingFace, PyTorch, and LangChain establishes industry leadership.',
    codeSnippet: '# HuggingFace Hub Model Upload\nfrom huggingface_hub import HfApi\napi = HfApi()\napi.upload_folder(folder_path="./model", repo_id="expert/ai-saas")',
  },
  14: {
    subTitle: 'L13 — Capstones',
    quote: '"Complete real-world projects that demonstrate production-level AI."',
    img: 'https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8e?q=80&w=800&auto=format&fit=crop',
    toc: [
      { title: '1. Enterprise AI Chatbot & Agent', topics: ['AI Chatbot', 'AI Agent', 'PDF QA'], page: '03' },
      { title: '2. Voice & Search Systems', topics: ['Voice Assistant', 'AI Search Engine', 'Coding Assistant'], page: '08' },
      { title: '3. Enterprise Workflows & Platforms', topics: ['AI ERP Assistant', 'Multi-Agent Workflow'], page: '15' },
      { title: '4. Automation & Recommendation', topics: ['Recommendation Engine', 'AI Automation Platform'], page: '24' },
    ],
    sectionTitle: '13.1 Production Portfolio Projects',
    dropCap: 'C',
    sectionText1: 'apstone projects synthesize end-to-end full-stack AI development, RAG retrieval, agentic tool workflows, and GPU deployment.',
    sectionText2: 'Building real-world production platforms demonstrates job-ready engineering competence across modern AI stacks.',
    codeSnippet: '// Production Capstone Deployment\nconst app = new ProductionAIPlatform({\n  agents: multiAgentSwarm,\n  rag: hybridVectorEngine\n});',
  },
}

interface BookTheme {
  coverBg: string
  innerBg: string
  borderColor: string
  titleColor: string
  subtitleColor: string
  dividerColor: string
  emblem: string
  accentTextColor: string
  tagBg: string
  codeTheme: string
}

const BOOK_THEMES: Record<number, BookTheme> = {
  1: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-blue-950 via-[#0a192f] to-slate-950',
    borderColor: 'border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]',
    titleColor: 'text-blue-400',
    subtitleColor: 'text-blue-200/90',
    dividerColor: 'bg-blue-400/50',
    emblem: '🐍',
    accentTextColor: 'text-blue-900',
    tagBg: 'bg-blue-950/90 border-blue-400/40 text-blue-300',
    codeTheme: 'bg-blue-950/20 border-blue-900/30 text-blue-950',
  },
  2: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-red-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-red-950 via-[#2a0808] to-stone-950',
    borderColor: 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]',
    titleColor: 'text-rose-400',
    subtitleColor: 'text-rose-200/90',
    dividerColor: 'bg-rose-500/50',
    emblem: '🌲',
    accentTextColor: 'text-red-900',
    tagBg: 'bg-red-950/90 border-red-500/40 text-red-300',
    codeTheme: 'bg-red-950/20 border-red-900/30 text-red-950',
  },
  3: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-emerald-950 via-[#062419] to-stone-950',
    borderColor: 'border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
    titleColor: 'text-emerald-400',
    subtitleColor: 'text-emerald-200/90',
    dividerColor: 'bg-emerald-400/50',
    emblem: '𝝅',
    accentTextColor: 'text-emerald-900',
    tagBg: 'bg-emerald-950/90 border-emerald-400/40 text-emerald-300',
    codeTheme: 'bg-emerald-950/20 border-emerald-900/30 text-emerald-950',
  },
  4: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-purple-950 via-[#1e0a2a] to-slate-950',
    borderColor: 'border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
    titleColor: 'text-purple-300',
    subtitleColor: 'text-purple-200/90',
    dividerColor: 'bg-purple-400/50',
    emblem: '📊',
    accentTextColor: 'text-purple-900',
    tagBg: 'bg-purple-950/90 border-purple-400/40 text-purple-300',
    codeTheme: 'bg-purple-950/20 border-purple-900/30 text-purple-950',
  },
  5: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-teal-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-teal-950 via-[#062c2c] to-slate-950',
    borderColor: 'border-teal-400/50 shadow-[0_0_15px_rgba(20,184,166,0.3)]',
    titleColor: 'text-teal-300',
    subtitleColor: 'text-teal-200/90',
    dividerColor: 'bg-teal-400/50',
    emblem: '🤖',
    accentTextColor: 'text-teal-900',
    tagBg: 'bg-teal-950/90 border-teal-400/40 text-teal-300',
    codeTheme: 'bg-teal-950/20 border-teal-900/30 text-teal-950',
  },
  6: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-fuchsia-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-fuchsia-950 via-[#2d082d] to-stone-950',
    borderColor: 'border-fuchsia-400/50 shadow-[0_0_15px_rgba(217,70,239,0.3)]',
    titleColor: 'text-fuchsia-300',
    subtitleColor: 'text-fuchsia-200/90',
    dividerColor: 'bg-fuchsia-400/50',
    emblem: '⚡',
    accentTextColor: 'text-fuchsia-900',
    tagBg: 'bg-fuchsia-950/90 border-fuchsia-400/40 text-fuchsia-300',
    codeTheme: 'bg-fuchsia-950/20 border-fuchsia-900/30 text-fuchsia-950',
  },
  7: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-indigo-950 via-[#0e1338] to-slate-950',
    borderColor: 'border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    titleColor: 'text-indigo-300',
    subtitleColor: 'text-indigo-200/90',
    dividerColor: 'bg-indigo-400/50',
    emblem: '🧠',
    accentTextColor: 'text-indigo-900',
    tagBg: 'bg-indigo-950/90 border-indigo-400/40 text-indigo-300',
    codeTheme: 'bg-indigo-950/20 border-indigo-900/30 text-indigo-950',
  },
  8: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-orange-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-orange-950 via-[#2e1205] to-stone-950',
    borderColor: 'border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
    titleColor: 'text-amber-400',
    subtitleColor: 'text-amber-200/90',
    dividerColor: 'bg-amber-400/50',
    emblem: '👁️',
    accentTextColor: 'text-amber-900',
    tagBg: 'bg-amber-950/90 border-amber-400/40 text-amber-300',
    codeTheme: 'bg-amber-950/20 border-amber-900/30 text-amber-950',
  },
  9: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-emerald-950 via-[#07291e] to-slate-950',
    borderColor: 'border-emerald-300/50 shadow-[0_0_15px_rgba(52,211,153,0.3)]',
    titleColor: 'text-emerald-300',
    subtitleColor: 'text-emerald-100/90',
    dividerColor: 'bg-emerald-300/50',
    emblem: '🗣️',
    accentTextColor: 'text-emerald-900',
    tagBg: 'bg-emerald-950/90 border-emerald-300/40 text-emerald-300',
    codeTheme: 'bg-emerald-950/20 border-emerald-900/30 text-emerald-950',
  },
  10: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-rose-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-rose-950 via-[#2d0913] to-stone-950',
    borderColor: 'border-rose-400/50 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    titleColor: 'text-rose-300',
    subtitleColor: 'text-rose-200/90',
    dividerColor: 'bg-rose-400/50',
    emblem: '🚀',
    accentTextColor: 'text-rose-900',
    tagBg: 'bg-rose-950/90 border-rose-400/40 text-rose-300',
    codeTheme: 'bg-rose-950/20 border-rose-900/30 text-rose-950',
  },
  11: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-cyan-950 via-[#062633] to-slate-950',
    borderColor: 'border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]',
    titleColor: 'text-cyan-300',
    subtitleColor: 'text-cyan-200/90',
    dividerColor: 'bg-cyan-400/50',
    emblem: '🔍',
    accentTextColor: 'text-cyan-900',
    tagBg: 'bg-cyan-950/90 border-cyan-400/40 text-cyan-300',
    codeTheme: 'bg-cyan-950/20 border-cyan-900/30 text-cyan-950',
  },
  12: {
    coverBg: 'bg-gradient-to-b from-stone-950 via-red-950 to-stone-950',
    innerBg: 'bg-gradient-to-br from-red-950 via-[#2b0c02] to-stone-950',
    borderColor: 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.3)]',
    titleColor: 'text-orange-400',
    subtitleColor: 'text-orange-200/90',
    dividerColor: 'bg-orange-500/50',
    emblem: '🎮',
    accentTextColor: 'text-red-900',
    tagBg: 'bg-red-950/90 border-orange-500/40 text-orange-300',
    codeTheme: 'bg-red-950/20 border-red-900/30 text-red-950',
  },
  13: {
    coverBg: 'bg-gradient-to-b from-slate-950 via-zinc-950 to-slate-950',
    innerBg: 'bg-gradient-to-br from-zinc-950 via-[#182607] to-slate-950',
    borderColor: 'border-lime-400/50 shadow-[0_0_15px_rgba(132,204,22,0.3)]',
    titleColor: 'text-lime-300',
    subtitleColor: 'text-lime-200/90',
    dividerColor: 'bg-lime-400/50',
    emblem: '⚙️',
    accentTextColor: 'text-lime-950',
    tagBg: 'bg-lime-950/90 border-lime-400/40 text-lime-300',
    codeTheme: 'bg-lime-950/20 border-lime-900/30 text-lime-950',
  },
  14: {
    coverBg: 'bg-gradient-to-b from-zinc-950 via-slate-900 to-zinc-950',
    innerBg: 'bg-gradient-to-br from-slate-900 via-[#0f172a] to-zinc-950',
    borderColor: 'border-slate-300/50 shadow-[0_0_15px_rgba(226,232,240,0.3)]',
    titleColor: 'text-slate-200',
    subtitleColor: 'text-slate-300/90',
    dividerColor: 'bg-slate-300/50',
    emblem: '🤖',
    accentTextColor: 'text-slate-900',
    tagBg: 'bg-slate-900/90 border-slate-300/40 text-slate-200',
    codeTheme: 'bg-slate-900/20 border-slate-800/30 text-slate-950',
  },
}

export function Book({ bookId = 1, customBookData }: { bookId?: number; customBookData?: any }) {
  const bookRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 450, height: 620, isMobile: false })
  const [zoomPageIndex, setZoomPageIndex] = useState<number | null>(null)
  const [zoomScale, setZoomScale] = useState<number>(1)
  const [readerViewMode, setReaderViewMode] = useState<'image' | 'text'>('image')

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w < 640) {
        // Mobile screen vertical portrait dimensions
        const maxBookWidth = Math.min(w - 32, 290)
        const availableHeight = Math.max(h - 220, 250)
        const calculatedHeight = Math.min(availableHeight, Math.round(maxBookWidth * 1.35))
        const calculatedWidth = Math.round(calculatedHeight / 1.35)
        setDimensions({ width: calculatedWidth, height: calculatedHeight, isMobile: true })
      } else if (w < 1024) {
        // Tablet dimensions
        setDimensions({ width: 300, height: 440, isMobile: false })
      } else {
        // Desktop dimensions: scaled to fit perfectly inside screen without zooming or clipping
        const maxDeskHeight = Math.min(Math.max(h - 200, 360), 480)
        const maxDeskWidth = Math.round(maxDeskHeight * 0.70)
        setDimensions({ width: maxDeskWidth, height: maxDeskHeight, isMobile: false })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentBook = customBookData || BOOK_DATA[bookId] || BOOK_DATA[1]
  const currentTheme = BOOK_THEMES[bookId] || BOOK_THEMES[1]

  // Split Table of Contents across 2 pages if it has > 2 modules or many topics
  const half = Math.ceil((currentBook.toc || []).length / 2)
  const tocPart1 = (currentBook.toc || []).slice(0, half)
  const tocPart2 = (currentBook.toc || []).slice(half)

  const turnNext = () => {
    try {
      if (bookRef.current?.pageFlip?.()) {
        bookRef.current.pageFlip().flipNext()
      }
    } catch (e) {
      // Ignore rapid click edge cases gracefully
    }
  }

  const turnPrev = () => {
    try {
      if (bookRef.current?.pageFlip?.()) {
        bookRef.current.pageFlip().flipPrev()
      }
    } catch (e) {
      // Ignore rapid click edge cases gracefully
    }
  }

  return (
    <div className="flex flex-col items-center justify-start w-full h-full pt-1 pb-2 px-1 relative">
      
      {/* Mobile Page Turn Buttons & Zoom Trigger */}
      <div className="flex items-center justify-between w-full max-w-sm sm:max-w-lg mb-2 z-20 px-2 shrink-0">
        <button 
          onClick={turnPrev}
          className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-200 text-xs font-cinzel hover:bg-amber-900 active:scale-95 transition shadow-lg backdrop-blur-md"
          aria-label="Previous Page"
        >
          <span>◀</span>
          <span>Prev</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className={`text-[11px] font-cinzel font-semibold px-3 py-1 rounded-full border backdrop-blur-md shadow-md ${currentTheme.tagBg}`}>
            {customBookData?.isCustom ? 'CUSTOM DOC' : `Vol ${String(bookId).padStart(2, '0')}`}
          </span>

          <button 
            onClick={() => { setZoomPageIndex(0); setZoomScale(1); }}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-400/50 text-amber-950 font-bold text-xs font-cinzel transition active:scale-95 shadow-lg"
            title="Open Fullscreen Reader Zoom"
          >
            <span>🔍</span>
            <span className="hidden sm:inline">Zoom & Read</span>
            <span className="sm:hidden font-bold">Zoom</span>
          </button>
        </div>

        <button 
          onClick={turnNext}
          className="flex items-center space-x-1 px-3.5 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-200 text-xs font-cinzel hover:bg-amber-900 active:scale-95 transition shadow-lg backdrop-blur-md"
          aria-label="Next Page"
        >
          <span>Next</span>
          <span>▶</span>
        </button>
      </div>

      {/* The Flipbook Component */}
      <div className="relative w-full flex justify-center items-center overflow-visible">
        <FlipBook
          key={`${bookId}-${customBookData?.id || 'std'}-${dimensions.width}-${dimensions.height}-${dimensions.isMobile}`}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={240}
          maxWidth={800}
          minHeight={320}
          maxHeight={1000}
          maxShadowOpacity={0.6}
          showCover={!dimensions.isMobile}
          usePortrait={dimensions.isMobile}
          mobileScrollSupport={true}
          className="demo-book drop-shadow-2xl mx-auto border border-amber-900/30 rounded-sm"
          ref={bookRef}
        >
          
          {/* Page 1: Front Cover */}
          <PageCover bgClass={currentTheme.coverBg}>
            <div className={`relative flex flex-col items-center justify-center h-full border-[3px] sm:border-[6px] border-double ${currentTheme.borderColor} p-3 sm:p-6 ${currentTheme.innerBg} overflow-hidden text-center rounded-sm transition-all duration-500`}>
              <img src="/leather.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 pointer-events-none" />
              <div className="text-center relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border border-amber-400/40 flex items-center justify-center mb-2 bg-black/40 backdrop-blur-sm shadow-inner">
                  <span className="text-lg sm:text-2xl">{currentTheme.emblem}</span>
                </div>
                <h1 className={`text-xl sm:text-4xl md:text-5xl font-cinzel ${currentTheme.titleColor} mb-1 sm:mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold drop-shadow-md`}>NEXORIA</h1>
                <div className={`h-px w-16 sm:w-32 ${currentTheme.dividerColor} mx-auto mb-2 sm:mb-3`}></div>
                <p className={`text-xs sm:text-base italic ${currentTheme.subtitleColor} font-serif px-2`}>{currentBook.subTitle}</p>
                <div className={`mt-3 sm:mt-4 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-cinzel tracking-widest ${currentTheme.tagBg} backdrop-blur-md border`}>
                  {customBookData?.isCustom ? 'CUSTOM DOCUMENT' : `LEVEL ${String(bookId).padStart(2, '0')}`}
                </div>
                <span className="text-[10px] sm:text-xs font-cinzel tracking-[0.2em] text-amber-400/90 font-bold uppercase mt-3 block">AUTHOR: MANIKANDAN</span>
              </div>
            </div>
          </PageCover>

          {/* Page 2: Inside Front Cover (Bookplate / Ex Libris) */}
          <PageContent side="left" number="">
            <div className="flex flex-col items-center justify-center h-full border border-dashed border-amber-900/20 p-4 rounded text-center">
              <span className="text-[10px] font-cinzel text-amber-900/60 uppercase tracking-[0.2em] mb-1">Library Record</span>
              <h3 className="text-base font-cinzel text-amber-950 font-bold mb-3">EX LIBRIS</h3>
              <div className="w-12 h-12 rounded-full border border-amber-900/30 flex items-center justify-center mb-3 bg-amber-900/5 shadow-inner">
                <span className="text-xl">{currentTheme.emblem}</span>
              </div>
              <p className="text-xs italic font-serif text-amber-900/80 mb-1">Nexoria Curriculum Series</p>
              <p className="text-xs font-serif font-bold text-amber-900/90 mb-2">Author: Manikandan</p>
              <div className="h-px w-20 bg-amber-900/20 my-2"></div>
              <p className="text-[11px] font-serif text-amber-900/70 font-semibold">
                {customBookData?.isCustom ? `Custom Volume: ${currentBook.subTitle}` : `Volume ${String(bookId).padStart(2, '0')}: ${currentBook.subTitle}`}
              </p>
            </div>
          </PageContent>

          {/* Page 3: Table of Contents - Part I */}
          <PageContent side="right" number="1">
            <div className="text-center mb-2 sm:mb-3">
              <h2 className="text-xs sm:text-base font-cinzel text-amber-900 uppercase tracking-[0.18em] font-bold">Table of Contents</h2>
              {tocPart2.length > 0 && <span className="text-[10px] font-serif italic text-amber-900/60 block">Part I</span>}
              <div className="h-px w-20 bg-amber-900/30 mx-auto mt-1"></div>
            </div>
            <div className="space-y-2.5 sm:space-y-3.5 font-serif text-amber-950">
              {tocPart1.map((item: any, idx: number) => (
                <div key={idx} className="border-b border-dashed border-amber-900/20 pb-2">
                  <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-amber-950">
                    <span>{item.title}</span>
                    <span className="font-sans text-[10px] sm:text-xs text-amber-900/70 ml-2 shrink-0">p. {item.page}</span>
                  </div>
                  {item.topics && item.topics.length > 0 && (
                    <div className="ml-2.5 sm:ml-3.5 mt-1 space-y-0.5 font-sans text-[10px] sm:text-[11px] text-amber-950/85">
                      {item.topics.map((topic: string, subIdx: number) => (
                        <div key={subIdx} className="flex items-baseline space-x-1.5 leading-snug">
                          <span className="text-amber-900/60 font-mono text-[9px] sm:text-[10px] shrink-0 font-semibold">{idx + 1}.{subIdx + 1}.</span>
                          <span className="text-amber-950 font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </PageContent>

          {/* Page 4: Table of Contents - Part II */}
          <PageContent side="left" number="2">
            {tocPart2.length > 0 ? (
              <>
                <div className="text-center mb-2 sm:mb-3">
                  <h2 className="text-xs sm:text-base font-cinzel text-amber-900 uppercase tracking-[0.18em] font-bold">Table of Contents</h2>
                  <span className="text-[10px] font-serif italic text-amber-900/60 block">Part II</span>
                  <div className="h-px w-20 bg-amber-900/30 mx-auto mt-1"></div>
                </div>
                <div className="space-y-2.5 sm:space-y-3.5 font-serif text-amber-950">
                  {tocPart2.map((item: any, idx: number) => {
                    const realIdx = half + idx
                    return (
                      <div key={idx} className="border-b border-dashed border-amber-900/20 pb-2">
                        <div className="flex justify-between items-baseline font-bold text-xs sm:text-sm text-amber-950">
                          <span>{item.title}</span>
                          <span className="font-sans text-[10px] sm:text-xs text-amber-900/70 ml-2 shrink-0">p. {item.page}</span>
                        </div>
                        {item.topics && item.topics.length > 0 && (
                          <div className="ml-2.5 sm:ml-3.5 mt-1 space-y-0.5 font-sans text-[10px] sm:text-[11px] text-amber-950/85">
                            {item.topics.map((topic: string, subIdx: number) => (
                              <div key={subIdx} className="flex items-baseline space-x-1.5 leading-snug">
                                <span className="text-amber-900/60 font-mono text-[9px] sm:text-[10px] shrink-0 font-semibold">{realIdx + 1}.{subIdx + 1}.</span>
                                <span className="text-amber-950 font-medium">{topic}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full border border-dashed border-amber-900/20 p-4 rounded text-center">
                <span className="text-[10px] font-cinzel text-amber-900/60 uppercase tracking-[0.2em] mb-1">Module Prerequisites</span>
                <h3 className="text-sm font-cinzel text-amber-950 font-bold mb-2">Curriculum Roadmap</h3>
                <p className="text-xs italic font-serif text-amber-900/80 mb-3 px-4">
                  This module provides foundational mastery required for advanced AI system architecture.
                </p>
                <div className="h-px w-20 bg-amber-900/20 my-1"></div>
                <span className="text-[10px] font-sans text-amber-900/60">Level {String(bookId).padStart(2, '0')}</span>
              </div>
            )}
          </PageContent>

          {/* Page 5+ : Custom Document PDF Images, Text Pages, or Default Curriculum Pages */}
          {customBookData?.pdfPageImages && customBookData.pdfPageImages.length > 0 ? (
            customBookData.pdfPageImages.map((imgUrl: string, idx: number) => (
              <PageContent key={`pdf-img-${idx}`} side={idx % 2 === 0 ? "right" : "left"} number={String(idx + 3)}>
                <div 
                  onClick={() => { setZoomPageIndex(idx); setZoomScale(1); }}
                  className="w-full h-full flex items-center justify-center p-0.5 overflow-hidden cursor-zoom-in group/page relative"
                  title="Click to Zoom & Read Fullscreen"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Page ${idx + 1}`} 
                    className="max-w-full max-h-full object-contain shadow-md rounded-sm border border-amber-900/10 transition group-hover/page:scale-[1.01]"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md text-amber-300 border border-amber-500/40 px-2 py-1 rounded text-[10px] font-cinzel flex items-center space-x-1 opacity-0 group-hover/page:opacity-100 transition shadow-xl pointer-events-none">
                    <span>🔍 Click to Zoom & Read</span>
                  </div>
                </div>
              </PageContent>
            ))
          ) : customBookData?.pdfPages && customBookData.pdfPages.length > 0 ? (
            customBookData.pdfPages.map((pageText: string, idx: number) => (
              <PageContent key={`custom-page-${idx}`} side={idx % 2 === 0 ? "right" : "left"} number={String(idx + 3)}>
                <div 
                  onClick={() => { setZoomPageIndex(idx); setZoomScale(1); }}
                  className="flex flex-col h-full cursor-zoom-in group/page relative"
                  title="Click to Zoom & Read Fullscreen"
                >
                  <div className="flex items-center justify-between border-b border-amber-900/20 pb-1 mb-3">
                    <h2 className="text-xs sm:text-sm font-cinzel font-bold text-amber-950 truncate max-w-[200px]">
                      {customBookData.title}
                    </h2>
                    <span className="text-[10px] font-sans text-amber-900/60 font-semibold">Page {idx + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-serif text-justify whitespace-pre-wrap flex-1">
                    {pageText}
                  </p>
                  <div className="mt-2 text-right opacity-0 group-hover/page:opacity-100 transition">
                    <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded text-[9px] font-cinzel">🔍 Expand & Read</span>
                  </div>
                </div>
              </PageContent>
            ))
          ) : (
            [
              <PageContent key="ch-title" side="right" number="3">
                <div className="flex items-center justify-center mb-2 sm:mb-4">
                  <div className="h-px flex-1 bg-amber-900/30"></div>
                  <h2 className="text-[10px] sm:text-xs font-cinzel uppercase tracking-[0.2em] text-amber-900/80 mx-3">Level {String(bookId).padStart(2, '0')}</h2>
                  <div className="h-px flex-1 bg-amber-900/30"></div>
                </div>
                <h1 className="text-base sm:text-2xl font-cinzel text-center mb-3 text-amber-950 leading-tight font-bold">{currentBook.subTitle}</h1>
                <div className="relative p-1 bg-white/50 rounded shadow-sm mb-3 border border-amber-900/10">
                  <img src={currentBook.img} className="w-full h-24 sm:h-36 object-cover rounded-sm mix-blend-multiply opacity-90 contrast-125 sepia-[.2]" />
                </div>
                <p className="text-xs sm:text-sm italic text-center text-amber-900/90 font-serif leading-relaxed px-1">
                  {currentBook.quote}
                </p>
              </PageContent>,

              <PageContent key="ch-content" side="left" number="4">
                <h2 className="text-sm sm:text-xl font-cinzel mb-2 sm:mb-3 text-amber-950 border-b border-amber-900/20 pb-1 font-bold">{currentBook.sectionTitle}</h2>
                <p className="text-xs sm:text-sm leading-relaxed mb-3 text-amber-950 font-serif text-justify">
                  <span className={`float-left text-2xl sm:text-4xl leading-none mr-1.5 mt-0.5 ${currentTheme.accentTextColor} font-bold font-cinzel`}>{currentBook.dropCap}</span>
                  {currentBook.sectionText1}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-serif text-justify">
                  {currentBook.sectionText2}
                </p>
              </PageContent>,

              <PageContent key="ch-impl" side="right" number="5">
                <h2 className="text-sm sm:text-lg font-cinzel mb-2 text-amber-950 border-b border-amber-900/20 pb-1 font-bold">Implementation</h2>
                <div className={`${currentTheme.codeTheme} p-2.5 rounded border font-mono text-[10px] sm:text-xs shadow-inner my-2 overflow-x-auto whitespace-pre-wrap`}>
                  <code>{currentBook.codeSnippet}</code>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-amber-950 font-serif text-justify mt-2">
                  The architecture elegantly separates execution logic from mathematical data representations.
                </p>
              </PageContent>
            ]
          )}

          {/* Page 7: Inside Back Cover */}
          <PageContent side="right" number="">
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <span className="text-2xl mb-2">{currentTheme.emblem}</span>
              <p className="text-xs font-cinzel text-amber-900/60 uppercase tracking-widest">Nexoria Library</p>
            </div>
          </PageContent>

          {/* Page 8: Back Cover */}
          <PageCover bgClass={currentTheme.coverBg}>
            <div className={`relative flex flex-col h-full items-center justify-center border-[3px] sm:border-[6px] border-double ${currentTheme.borderColor} p-3 sm:p-6 ${currentTheme.innerBg} overflow-hidden text-center rounded-sm transition-all duration-500`}>
              <img src="/leather.jpg" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 pointer-events-none" />
              <div className="w-14 h-14 sm:w-20 sm:h-20 border-2 border-amber-500/40 rounded-full flex items-center justify-center mb-3 sm:mb-5 relative z-10 bg-black/40 backdrop-blur-sm shadow-inner">
                <span className="text-2xl sm:text-3xl">{currentTheme.emblem}</span>
              </div>
              <p className={`text-xs sm:text-sm font-cinzel uppercase tracking-[0.25em] sm:tracking-[0.3em] ${currentTheme.titleColor}`}>The End</p>
              <span className="text-[10px] font-sans text-amber-200/70 mt-2 font-medium">Authored by Manikandan</span>
              <span className="text-[9px] font-sans text-amber-200/40 mt-1">
                {customBookData?.isCustom ? 'Custom Document Complete' : `Level ${String(bookId).padStart(2, '0')} Complete`}
              </span>
            </div>
          </PageCover>

        </FlipBook>
      </div>

      {/* Fullscreen Zoom & Reader Overlay Modal */}
      {zoomPageIndex !== null && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-between p-2 sm:p-4 pb-16 md:pb-4 animate-fade-in select-none">
          
          {/* Top Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between z-20 bg-[#120a06]/90 backdrop-blur-md border border-amber-500/50 p-2 sm:px-4 sm:py-2.5 rounded-xl text-amber-100 shadow-2xl">
            <div className="flex items-center space-x-2 sm:space-x-3 truncate">
              <span className="text-lg sm:text-xl">📖</span>
              <div className="truncate">
                <h3 className="text-xs sm:text-sm font-cinzel font-bold text-amber-400 truncate">
                  {currentBook.title || currentBook.subTitle}
                </h3>
                <span className="text-[9px] sm:text-[10px] text-amber-200/70 font-sans block">
                  Page {(zoomPageIndex || 0) + 1} of {customBookData?.pdfPageImages?.length || customBookData?.pdfPages?.length || 1} • HD Reader
                </span>
              </div>
            </div>

            {/* View Mode & Zoom Scale Controls */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              
              {/* Toggle Text vs Image Mode */}
              {customBookData?.pdfPages && customBookData.pdfPages.length > 0 && (
                <button
                  onClick={() => setReaderViewMode(m => m === 'image' ? 'text' : 'image')}
                  className="px-2.5 py-1 rounded-lg bg-amber-950 border border-amber-500/40 text-amber-300 text-[10px] sm:text-xs font-cinzel hover:bg-amber-900 transition flex items-center space-x-1"
                  title="Toggle Text vs Image View"
                >
                  <span>{readerViewMode === 'image' ? '📝 Pure Text' : '🖼️ Page View'}</span>
                </button>
              )}

              {/* Zoom In / Out / Reset Controls */}
              {readerViewMode === 'image' && (
                <div className="flex items-center space-x-1 bg-black/60 border border-amber-500/30 rounded-lg p-0.5 sm:p-1">
                  <button 
                    onClick={() => setZoomScale(s => Math.max(s - 0.25, 0.75))}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 font-bold text-xs flex items-center justify-center transition"
                    title="Zoom Out (-)"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setZoomScale(1)}
                    className="text-[10px] sm:text-xs font-mono text-amber-200 px-1 sm:px-2 hover:text-amber-400 min-w-[35px] text-center"
                    title="Reset Zoom"
                  >
                    {Math.round(zoomScale * 100)}%
                  </button>
                  <button 
                    onClick={() => setZoomScale(s => Math.min(s + 0.25, 2.5))}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 font-bold text-xs flex items-center justify-center transition"
                    title="Zoom In (+)"
                  >
                    +
                  </button>
                </div>
              )}

              <button 
                onClick={() => { setZoomPageIndex(null); setZoomScale(1); }}
                className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-950 text-xs font-bold font-cinzel transition shadow-lg border border-amber-400/50"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Main Zoom / Text Display Area */}
          <div className="flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto my-2 p-1 sm:p-3 custom-scrollbar relative touch-pan-x touch-pan-y">
            {readerViewMode === 'image' && customBookData?.pdfPageImages && customBookData.pdfPageImages[zoomPageIndex] ? (
              <div 
                className="transition-transform duration-200 ease-out origin-center flex justify-center py-2 min-w-full"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <img 
                  src={customBookData.pdfPageImages[zoomPageIndex]} 
                  alt={`Page ${zoomPageIndex + 1}`}
                  className="max-h-[78vh] w-auto object-contain shadow-[0_0_40px_rgba(0,0,0,0.95)] rounded-md border border-amber-500/40 bg-white"
                />
              </div>
            ) : (
              <div 
                className="w-full max-w-3xl bg-[#fdfaf0] text-amber-950 p-5 sm:p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[75vh] font-serif leading-relaxed border-2 border-amber-900/30 transition-transform duration-200"
                style={{ transform: readerViewMode === 'image' ? `scale(${zoomScale})` : 'none' }}
              >
                <div className="flex items-center justify-between border-b border-amber-900/20 pb-2 mb-4">
                  <h2 className="text-base sm:text-lg font-cinzel font-bold text-amber-950">
                    {customBookData?.title || currentBook.subTitle}
                  </h2>
                  <span className="text-xs font-sans text-amber-900/70 font-semibold">Page {(zoomPageIndex || 0) + 1}</span>
                </div>
                <div className="text-sm sm:text-base leading-relaxed text-justify whitespace-pre-wrap font-serif text-amber-950 space-y-3">
                  {customBookData?.pdfPages?.[zoomPageIndex || 0] || currentBook.sectionText1 || 'Document page text content.'}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Nav Bar */}
          <div className="w-full max-w-md flex items-center justify-between z-20 bg-[#120a06]/90 backdrop-blur-md border border-amber-500/50 px-4 py-2 rounded-full text-amber-100 shadow-2xl">
            <button 
              onClick={() => setZoomPageIndex(p => (p !== null && p > 0 ? p - 1 : p))}
              disabled={zoomPageIndex === 0}
              className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-200 text-[11px] sm:text-xs font-cinzel disabled:opacity-40 hover:bg-amber-900 transition active:scale-95"
            >
              ◀ Prev Page
            </button>

            <span className="text-xs font-cinzel text-amber-400 font-bold">
              Page {(zoomPageIndex || 0) + 1}
            </span>

            <button 
              onClick={() => {
                const maxPages = customBookData?.pdfPageImages?.length || customBookData?.pdfPages?.length || 1
                setZoomPageIndex(p => (p !== null && p < maxPages - 1 ? p + 1 : p))
              }}
              disabled={zoomPageIndex === (customBookData?.pdfPageImages?.length || customBookData?.pdfPages?.length || 1) - 1}
              className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-200 text-[11px] sm:text-xs font-cinzel disabled:opacity-40 hover:bg-amber-900 transition active:scale-95"
            >
              Next Page ▶
            </button>
          </div>

        </div>
      )}

    </div>
  )
}


