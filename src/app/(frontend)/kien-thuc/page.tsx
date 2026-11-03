import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/cms'
export const dynamic = 'force-dynamic'
import { EditorialJournal } from '@/components/EditorialJournal'

export const metadata: Metadata = { title: 'Kiến thức để hiểu thêm trước khi lựa chọn' }
export default async function JournalPage({ searchParams }: { searchParams: Promise<{ trang?: string }> }) {
  const posts = await getPublishedPosts()
  const query = await searchParams
  const pageCount = Math.max(1, Math.ceil(posts.length / 6))
  const page = Math.max(1, Math.min(pageCount, Number.parseInt(query.trang || '1', 10) || 1))
  return <EditorialJournal posts={posts.slice((page - 1) * 6, page * 6)} page={page} pageCount={pageCount} />
}
