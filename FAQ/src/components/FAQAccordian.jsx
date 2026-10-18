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
        <section className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
            <h1 className="mb-10 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h1>

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