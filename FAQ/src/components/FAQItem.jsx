export default function FAQItem({faq, isOpen, onToggle}){
    return(
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-cyan-950/30">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold text-slate-100 transition hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset"
            >
                    <span className="transition-colors group-hover:text-cyan-300">{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-700 text-xl font-normal leading-none text-cyan-400 transition duration-300 group-hover:border-cyan-400 group-hover:bg-cyan-400/10">
                        {isOpen ? "−" : "+"}
                    </span>
            </button>
            {isOpen && <p className="border-t border-slate-800 bg-slate-950/40 px-5 py-5 leading-7 text-slate-300">{faq.answer}</p>}
        </div>
    )
}