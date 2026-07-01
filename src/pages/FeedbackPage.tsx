import { useState, type FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
  Bug,
  Sparkles,
  Lightbulb,
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from 'lucide-react'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

type FeedbackType = 'bug' | 'feature' | 'suggestion' | 'other'

interface FeedbackTypeMeta {
  id: FeedbackType
  label: string
  icon: typeof Bug
  color: string
  soft: string
  text: string
}

const FEEDBACK_TYPES: FeedbackTypeMeta[] = [
  { id: 'bug', label: 'Bug Report', icon: Bug, color: '#DC2626', soft: '#FDECEA', text: '#B91C1C' },
  { id: 'feature', label: 'Feature Request', icon: Sparkles, color: '#7E22CE', soft: '#F3E8FF', text: '#7E22CE' },
  { id: 'suggestion', label: 'Suggestion', icon: Lightbulb, color: '#C9830E', soft: '#FFF4E0', text: '#A0620A' },
  { id: 'other', label: 'Other', icon: MessageSquare, color: '#4B5563', soft: '#F3F4F6', text: '#374151' },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

// Basic HTML Sanitizer to prevent XSS Injection
const sanitizeInput = (str: string) => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }
  return str.replace(/[&<>'"]/g, (m) => map[m] || m)
}

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('') // Honeypot state
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const selectedMeta = FEEDBACK_TYPES.find((t) => t.id === feedbackType)!

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 1. Honeypot Check: If a bot fills this hidden field, fail silently
    if (honeypot.trim() !== '') {
      setStatus('sent') 
      return
    }

    // 2. Empty Field Check
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error')
      setErrorMsg('Please fill out all fields.')
      return
    }

    // 3. Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address.')
      return
    }

    // 4. Character Length Limits (Prevent Payload Bloat)
    if (message.length > 1500) {
      setStatus('error')
      setErrorMsg('Message is too long (maximum 1500 characters).')
      return
    }

    // 5. Rate Limiting Check (1 submission per 60 seconds)
    const lastSent = localStorage.getItem('lastFeedbackSentTime')
    if (lastSent && Date.now() - parseInt(lastSent) < 60000) {
      setStatus('error')
      setErrorMsg('Please wait a minute before submitting another feedback.')
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('error')
      setErrorMsg('Feedback form is misconfigured.')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    // 6. Sanitize Inputs before sending
    const safeData = {
      from_name: sanitizeInput(name.trim()),
      from_email: sanitizeInput(email.trim()),
      feedback_type: selectedMeta.label,
      subject: sanitizeInput(subject.trim()),
      message: sanitizeInput(message.trim()),
    }

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, safeData, { publicKey: PUBLIC_KEY })
      
      // Update Rate Limiter
      localStorage.setItem('lastFeedbackSentTime', Date.now().toString())
      
      setStatus('sent')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setFeedbackType('bug')
    } catch (err) {
      setStatus('error')
      setErrorMsg('Something went wrong sending your feedback. Please try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#E8F8F0] flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} color="#0F7A52" />
          </div>
          <h1 className="text-[22px] font-bold text-[#1a1a1a] mb-2">Thanks for the feedback!</h1>
          <p className="text-[13px] text-[#666] leading-relaxed mb-6">We've received your report and will look into it soon.</p>
          <div className="flex gap-2.5 justify-center">
            <button onClick={() => setStatus('idle')} className="px-4 py-2.5 rounded-xl border border-[#e5e5e5] text-[#333] text-[13px] font-semibold hover:bg-[#f9f9f9] transition-colors cursor-pointer">
              Send another
            </button>
            <NavLink to="/" className="px-4 py-2.5 rounded-xl bg-[#FBA455] text-white text-[13px] font-semibold hover:bg-[#e9944a] transition-colors">
              Back to Tools
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f5]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <NavLink to="/" className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#888] hover:text-[#333] transition-colors mb-6">
          <ArrowLeft size={14} /> Back
        </NavLink>

        <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1a1a1a] mb-2 tracking-tight">Send Feedback</h1>
        <p className="text-[13px] text-[#666] leading-relaxed mb-7 max-w-lg">Found a bug, want a new feature, or just have a suggestion? Let us know and we'll get back to it.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#e5e5e5] p-5 sm:p-7 flex flex-col gap-5">
          
          {/* Honeypot Field - Hidden from humans, scanned by bots */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input 
              type="text" 
              id="website" 
              name="website" 
              tabIndex={-1} 
              autoComplete="off" 
              value={honeypot} 
              onChange={(e) => setHoneypot(e.target.value)} 
            />
          </div>

          {/* Feedback type pills */}
          <div>
            <label className="text-[12px] font-semibold text-[#444] mb-2 block">
              What's this about?
            </label>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_TYPES.map((t) => {
                const Icon = t.icon
                const active = feedbackType === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFeedbackType(t.id)}
                    style={active ? { background: t.color, color: '#fff' } : { background: t.soft, color: t.text }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all cursor-pointer"
                  >
                    <Icon size={13} />
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-semibold text-[#444] mb-1.5 block">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl px-3.5 py-2.5 text-[13px] text-[#333] placeholder-[#bbb] outline-none focus:border-[#FBA455] transition-colors"
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#444] mb-1.5 block">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juan@email.com"
                className="w-full bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl px-3.5 py-2.5 text-[13px] text-[#333] placeholder-[#bbb] outline-none focus:border-[#FBA455] transition-colors"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-[12px] font-semibold text-[#444] mb-1.5 block">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Short summary of your feedback"
              className="w-full bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl px-3.5 py-2.5 text-[13px] text-[#333] placeholder-[#bbb] outline-none focus:border-[#FBA455] transition-colors"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-[12px] font-semibold text-[#444] mb-1.5 block">Details</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Tell us more — report a bug, or details about your idea..."
              className="w-full bg-[#f9f9f9] border border-[#e5e5e5] rounded-xl px-3.5 py-2.5 text-[13px] text-[#333] placeholder-[#bbb] outline-none focus:border-[#FBA455] transition-colors resize-none"
            />
          </div>

          {status === 'error' && (
            <p className="text-[12px] font-semibold text-[#B91C1C] bg-[#FDECEA] rounded-xl px-3.5 py-2.5">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#FBA455] text-white text-[13px] font-semibold rounded-xl hover:bg-[#e9944a] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}