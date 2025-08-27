// app/notes/filter/[...slug]/page.tsx

import { Metadata } from 'next';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';

import { getNotesByTag } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { type Note } from '@/types/note';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes page',
};

type Props = { params: Promise<{ slug: string[] }> };

const NotesByTag = async ({ params }: Props) => {
  const queryClient = new QueryClient();

  const perPage = 12;

  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);

  const response = await getNotesByTag(tag);
  //
  //   перенести у нот клієнт
  //  запит  та відмальовку
  //
  //

  await queryClient.prefetchQuery({
    //ключі та функція повинні бути однаковими!!!

    // queryKey: ['notes', { search, page, perPage }],
    queryKey: ['notes', { search: '', page: 1, tag }],

    queryFn: () => fetchNotes('', 1, perPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Notes List {tag ? `(${tag})` : ''}</h1>
        {response.notes.length > 0 ? (
          <NoteList notes={response.notes} />
        ) : (
          <p>Немає нотаток з таким тегом</p>
        )}
        {tag === slug[0] && <NotesClient perPage={perPage} tag={tag} />}
        {/* // тільки на ALL */}
      </div>
    </HydrationBoundary>
  );
};

export default NotesByTag;

//
//
//
//
//
//
//  origin
//
// app/notes/filter/[...slug]/page.tsx
// import { getNotesByTag } from '@/lib/api';
// import NoteList from '@/components/NoteList/NoteList';
// import { type Note } from '@/types/note';

// type Props = { params: Promise<{ slug: string[] }> };

// const NotesByTag = async ({ params }: Props) => {
//   const { slug } = await params;
//   const tag = slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);
//   const response = await getNotesByTag(tag);

//   return (
//     <div>
//       <h1>Notes List {tag ? `(${tag})` : ''}</h1>

//       {response.notes.length > 0 ? (
//         <NoteList notes={response.notes} />
//       ) : (
//         <p>Немає нотаток з таким тегом</p>
//       )}
//     </div>
//   );
// };

// export default NotesByTag;

//////////////////////////////////////////////

// // app/notes/filter/[...slug]/page.tsx
// import { Metadata } from 'next';
// import NoteList from '@/components/NoteList/NoteList';
// import { type Note } from '@/types/note';
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from '@tanstack/react-query';
// import { getNotesByTag } from '@/lib/api';

// export const metadata: Metadata = {
//   title: 'Notes',
//   description: 'Notes page',
// };

// type Props = { params: Promise<{ slug: string[] }> };

// export default async function NotesByTag({ params }: Props) {
//   // оскільки params = Promise → треба await
//   const { slug } = await params;

//   const tag = slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);

//   const queryClient = new QueryClient();

//   // робимо префетч даних для SSR + hydration
//   await queryClient.prefetchQuery({
//     queryKey: ['notes', { tag }],
//     queryFn: () => getNotesByTag(tag),
//   });

//   // беремо вже кешовані дані (щоб відмалювати одразу)
//   const notes = queryClient.getQueryData<Note[]>(['notes', { tag }]) ?? [];

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <div>
//         <h1>Notes List {tag ? `(${tag})` : ''}</h1>

//         {notes.length > 0 ? (
//           <NoteList notes={notes} />
//         ) : (
//           <p>Немає нотаток з таким тегом</p>
//         )}
//       </div>
//     </HydrationBoundary>
//   );
// }
