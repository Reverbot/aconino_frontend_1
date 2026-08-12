import { ComingSoonProvider } from '../providers/ComingSoonProvider';
import ApoyanosClient from '../app/(app)/apoyanos/ApoyanosClient';

export default function OriginalApoyanosPage() {
  return (
    <ComingSoonProvider>
      <ApoyanosClient />
    </ComingSoonProvider>
  );
}
