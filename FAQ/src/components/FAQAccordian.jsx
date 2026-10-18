import { useState } from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    id: 1,
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces."
  },
  {
    id: 2,
    question: "What is useState?",
    answer: "useState is a React Hook used to manage component state."
  },
  {
    id: 3,
    question: "What are props?",
    answer: "Props are used to pass data from parent to child components."
  }
];

export default function FAQAccordian(){
    const[openIds, setOpenIds] = useState([]);

    function handleToggle(id) {
        setOpenIds(previousIds =>
            previousIds.includes(id)
            ? previousIds.filter(openId => openId !== id)
            : [...previousIds, id]
        );
        }

    return(
        <section className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Need to know</p>
            <h1 className="mb-3 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl">Frequently Asked Questions</h1>
            <p className="mx-auto mb-10 max-w-xl text-center text-slate-400">Quick answers to common questions about React fundamentals.</p>

            <div className="space-y-4">
                {faqs.map((faq) => (
                    <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openIds.includes(faq.id)}
                        onToggle={() => handleToggle(faq.id)}
                    />
                ))}
            </div>
            </div>
        </section>
    )
}