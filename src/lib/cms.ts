import snapshot from '@/content/published.json'
import englishSnapshot from '@/content/published.en.json'
import { getLocale } from 'next-intl/server'
import type { Post, Service } from '@/content/site'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
export type PublicPost = Post & { id: number | string; body: SerializedEditorState }
export type PublicService = Service & { id: number | string }
const redirects: { fromSlug: string; toSlug: string }[] = snapshot.redirects
async function getSnapshot() { return (await getLocale()) === 'en' ? englishSnapshot : snapshot }
export async function getPublishedPosts(): Promise<PublicPost[]> { return (await getSnapshot()).posts as unknown as PublicPost[] }
export async function getPublishedPost(slug: string): Promise<PublicPost | null> { return (await getPublishedPosts()).find(post => post.slug === slug) || null }
export async function getServices(): Promise<PublicService[]> { return (await getSnapshot()).services }
export async function resolvePostRedirect(slug: string): Promise<string | null> {
  const visited = new Set([slug])
  let current = slug
  for (let hop = 0; hop < 5; hop++) {
    const next = redirects.find(item => item.fromSlug === current)?.toSlug
    if (!next || visited.has(next)) return null
    visited.add(next)
    if (await getPublishedPost(next)) return next
    current = next
  }
  return null
}
