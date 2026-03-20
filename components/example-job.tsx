import { Upload, Zap } from "lucide-react"

export function ExampleJob() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-10">
          Example Job
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-[#0d5b93]">1.</span>
              <span className="font-bold text-foreground">Send job details</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="w-4 h-4 flex-shrink-0" />
              <span>Upload a photo, video, or describe the job.</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-secondary/40 rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-[#0d5b93]">2.</span>
              <span className="font-bold text-foreground">Get a draft quote</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 flex-shrink-0" />
              <span>QuoteMatey analyses it instantly.</span>
            </div>
          </div>

          {/* Repeated Step 1 for visual balance as in reference */}
          <div className="bg-secondary/40 rounded-xl p-6 border border-border sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-[#0d5b93]">1.</span>
              <span className="font-bold text-foreground">Send job details</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Upload className="w-4 h-4 flex-shrink-0" />
              <span>Upload a photo, video, or describe the job.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
