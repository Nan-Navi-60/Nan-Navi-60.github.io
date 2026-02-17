import Image from 'next/image';

export default function ProjectImage({ src, alt = "project image", maxWidth = '100%' }) {
  return (
    <div className="content-item-img" style={{ maxWidth: maxWidth }}>
      <Image 
        src={src} 
        alt={alt} 
        width={0}
        height={0} 
        style={{ width: '100%', height: 'auto' }} 
      />
    </div>
  );
}