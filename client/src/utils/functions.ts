import { saveAs } from 'file-saver';

export const handleNavigate = (
  navigateTo: (path: string) => void,
  path: string,
) => {
  try {
    navigateTo(path);
  } catch (error) {
    console.error('Navigation error:', error);
    alert('Navigation failed. Please try again.');
  }
};
export const handleDownload = async (postId: string, imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error('Failed to fetch image');

    const blob = await response.blob();
    saveAs(blob, `image-${postId}.jpg`);
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed. Please try again.');
    return false;
  }
};
