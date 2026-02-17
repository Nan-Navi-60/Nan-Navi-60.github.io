import Image from 'next/image';

export default function ProjectImage({ src, alt = "project image" }) {
  return (
    <div className="content-item-img">
      <Image 
        src={src} 
        alt={alt} 
        width={0}
        height={0} 
        style={{ width: '80%', height: 'auto' }} 
      />
    </div>
  );
}