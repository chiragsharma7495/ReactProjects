import { useState } from "react";

export default function StarRating({maxStars = 5}){
    const[rating, setRating] = useState(0);
    const[hoverRating, setHoverRating] = useState(0);
    const stars = Array.from(
        {length : maxStars},
        (_, index) => index+1
    );

    function handleClear(){
        setRating(0);
        setHoverRating(0);
    }

    return(
        <section className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-8">
            <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/60 sm:p-8">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Rate Your Experience</h2>

            <div className="mb-5 flex justify-center gap-1" onMouseLeave={()=> setHoverRating(0)}>
                {stars.map((star) => (

                    <button type="button"
                     key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`Rate ${star} out of ${maxStars}`}
                      className="rounded-lg px-1 text-4xl leading-none text-amber-400 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                      > 
                       {star <= (hoverRating || rating) ? '★' : '☆'}
                    </button>
                ))}
            </div>

            <p className="min-h-6 text-sm font-medium text-slate-500">
                {rating === 0 ? "No Rating Selected" : `selected Rating: ${rating} / ${maxStars}`}
            </p>

            <button className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" type="button" onClick={handleClear}>Clear Rating</button>
            </div>
        </section>
    )
}