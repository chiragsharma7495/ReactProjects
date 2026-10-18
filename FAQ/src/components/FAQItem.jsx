export default function FAQItem({faq, isOpen, onToggle}){
    return(
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-lg shadow-black/20">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-100 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-inset"
            >
                    {faq.question}
            </button>
            {isOpen && <p className="border-t border-slate-700 px-5 py-4 leading-7 text-slate-300">{faq.answer}</p>}
        </div>
    )
}