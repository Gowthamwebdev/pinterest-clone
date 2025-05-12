import Masonry from '@mui/lab/Masonry';
import { Skeleton } from '@mui/material';

export const MasonryLoader = ({ count = 6 }: { count?: number }) => {
  const skeletonItems = Array.from({ length: count }, (_, i) => (
    <div key={i} className="mb-4">
      <Skeleton
        variant="rectangular"
        width="100%"
        height={Math.floor(Math.random() * 200) + 200}
        className="rounded-lg"
      />
    </div>
  ));

  return (
    <Masonry
      columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 }}
      spacing={2}
      className="w-full"
    >
      {skeletonItems}
    </Masonry>
  );
};
