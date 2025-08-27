// app/notes/filter/[...slug]/page.tsx
import { getNotesByTag } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { type Note } from '@/types/note';

type Props = { params: Promise<{ slug: string[] }> };

const NotesByTag = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : (slug[0] as Note['tag']);
  const response = await getNotesByTag(tag);

  return (
    <div>
      <h1>Notes List {tag ? `(${tag})` : ''}</h1>

      {response.notes.length > 0 ? (
        <NoteList notes={response.notes} />
      ) : (
        <p>Немає нотаток з таким тегом</p>
      )}
    </div>
  );
};

export default NotesByTag;
