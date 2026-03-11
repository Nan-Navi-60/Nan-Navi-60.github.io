'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

export default function Mermaid({ chart }) {
  const ref = useRef(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
    });

    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid" ref={ref}>
      {chart}
    </div>
  );
}
