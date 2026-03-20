"use client"

import Image from "next/image"
import { Copy, Check, Wrench, Clock } from "lucide-react"
import { useState } from "react"

interface QuoteCardProps {
  jobSummary: string
  materials: string[]
  labour: string
  estimatedQuote: string
  isVisible?: boolean
}

export function QuoteCard({
  jobSummary,
  materials,
  labour,
  estimatedQuote,
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const text = `Job Summary: ${jobSummary}\nMaterials: ${materials.join(", ")}\nLabour: ${labour}\nEstimated Quote: ${estimatedQuote}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl shadow-[#0a1628]/10 border border-border/80 p-5 w-full max-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            src="/images/quotematey-logo.png"
            alt="QuoteMatey"
            width={28}
            height={28}
            className="w-7 h-7"
          />
          <span className="text-[#0a1628] font-bold text-sm">QuoteMatey</span>
        </div>
        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold uppercase tracking-wide">Draft</span>
      </div>

      <h3 className="text-base font-bold text-foreground mb-3">Your Quote Draft</h3>

      {/* Job Summary */}
      <div className="mb-4 p-3 bg-slate-50 rounded-xl">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Job Summary</h4>
        <p className="text-sm text-foreground leading-relaxed">{jobSummary}</p>
      </div>

      {/* Suggested Materials */}
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Materials</h4>
        <div className="flex flex-wrap gap-2">
          {materials.map((material, index) => (
            <span key={index} className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-foreground px-2.5 py-1.5 rounded-lg font-medium">
              <Wrench className="w-3 h-3 text-muted-foreground" />
              {material}
            </span>
          ))}
        </div>
      </div>

      {/* Labour & Quote */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Labour</span>
          </div>
          <span className="text-sm font-bold text-foreground">{labour}</span>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
          <span className="text-xs text-green-600 font-medium block mb-1">Estimate</span>
          <span className="text-lg font-bold text-green-600">{estimatedQuote}</span>
        </div>
      </div>

      {/* Copy Button */}
      <button
        onClick={copyToClipboard}
        className="w-full flex items-center justify-center gap-2 bg-[#0a1628] text-white py-3 rounded-xl font-semibold hover:bg-[#1a3a5c] transition-all text-sm"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy Quote
          </>
        )}
      </button>
    </div>
  )
}
