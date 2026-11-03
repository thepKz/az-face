import { PlusIcon } from './Icons'

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map(item => <details className="faq-item" key={item.question}><summary>{item.question}<PlusIcon /></summary><div className="faq-answer"><p>{item.answer}</p></div></details>)}</div>
}
