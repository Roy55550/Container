import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface ShareButtonProps {
  title: string;
  text: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text, url }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.log('Error sharing content:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      console.log('Web Share API not supported');
      alert(`Share this content:\nTitle: ${title}\nText: ${text}\nURL: ${url}`);
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
};

export default ShareButton;
