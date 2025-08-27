import { Metadata } from 'next';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page',
};

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const perPage = 12;

  await queryClient.prefetchQuery({
    //ключі та функція повинні бути однаковими!!!

    // queryKey: ['notes', { search, page, perPage }],
    queryKey: ['notes', { search: '', page: 1 }],

    queryFn: () => fetchNotes('', 1, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient perPage={perPage} />
    </HydrationBoundary>
  );
}
