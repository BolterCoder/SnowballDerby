import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface LightboxImage {
  src: string;
  title?: string;
  caption?: string;
  alt?: string;
}

interface LightboxContextValue {
  open: (images: LightboxImage[], startIndex?: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) throw new Error('useLightbox must be used within LightboxProvider');
  return context;
}

type AnimationState = 'closed' | 'entering' | 'open' | 'exiting';

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<LightboxImage[]>([]);
  const [index, setIndex] = useState(0);
  const [animState, setAnimState] = useState<AnimationState>('closed');
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<Element | null>(null);

  const isVisible = animState !== 'closed';
  const current = images[index];
  const hasMultiple = images.length > 1;

  const close = useCallback(() => {
    setAnimState('exiting');
    setTimeout(() => {
      setAnimState('closed');
      setImages([]);
      setIndex(0);
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus();
      }
    }, 200);
  }, []);

  const open = useCallback((imgs: LightboxImage[], startIndex = 0) => {
    previousFocus.current = document.activeElement;
    setImages(imgs);
    setIndex(startIndex);
    setAnimState('entering');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimState('open'));
    });
  }, []);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(images.length - 1, i + 1)), [images.length]);

  useEffect(() => {
    if (!isVisible) return;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft' && hasMultiple) prev();
      if (event.key === 'ArrowRight' && hasMultiple) next();
    };

    document.addEventListener('keydown', handleKey);
    overlayRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible, hasMultiple, close, prev, next]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {isVisible && current
        ? createPortal(
            <div
              aria-label="Image lightbox"
              aria-modal="true"
              className="lightbox-overlay"
              data-state={animState}
              onClick={handleOverlayClick}
              ref={overlayRef}
              role="dialog"
              tabIndex={-1}
            >
              <div className="lightbox-content">
                <img alt={current.alt ?? current.title ?? ''} className="lightbox-image" src={current.src} />
                {current.title || current.caption ? (
                  <div className="lightbox-caption">
                    {current.title ? <p className="lightbox-title">{current.title}</p> : null}
                    {current.caption ? <p className="lightbox-subtitle">{current.caption}</p> : null}
                  </div>
                ) : null}
                {hasMultiple ? (
                  <p className="lightbox-counter">
                    {index + 1} / {images.length}
                  </p>
                ) : null}
              </div>

              <button aria-label="Close lightbox" className="lightbox-close" onClick={close} type="button">
                &times;
              </button>

              {hasMultiple && index > 0 ? (
                <button aria-label="Previous image" className="lightbox-nav lightbox-prev" onClick={prev} type="button">
                  &#8249;
                </button>
              ) : null}

              {hasMultiple && index < images.length - 1 ? (
                <button aria-label="Next image" className="lightbox-nav lightbox-next" onClick={next} type="button">
                  &#8250;
                </button>
              ) : null}
            </div>,
            document.body,
          )
        : null}
    </LightboxContext.Provider>
  );
}
