'use client'

import { useId, useState } from 'react'
import './faq.css'

type FAQItem = { question: string; answer: string }

function FAQRow({ item }: { item: FAQItem }) {
  const id = useId()
  const [open, setOpen] = useState(false)

  return <div className="faq-item" data-open={open}>
    <h3 className="faq-heading">
      <button className="faq-trigger" id={`${id}-trigger`} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen(value => !value)}>
        <span>{item.question}</span>
        <span className="faq-chevron" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m6 9 6 6 6-6" /></svg></span>
      </button>
    </h3>
    <div className="faq-panel" id={`${id}-panel`} aria-labelledby={`${id}-trigger`} aria-hidden={!open} inert={!open}>
      <div className="faq-panel-inner"><div className="faq-answer"><p>{item.answer}</p></div></div>
    </div>
  </div>
}

export function FAQ({ items }: { items: FAQItem[] }) {
  return <div className="faq-list">{items.map(item => <FAQRow item={item} key={item.question} />)}</div>
}
