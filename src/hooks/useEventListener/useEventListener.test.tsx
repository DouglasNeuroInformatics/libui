import { fireEvent, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useEventListener } from './useEventListener.ts';

describe('useEventListener', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should bind/unbind the event listener to the window when element is not provided', () => {
    const eventName: keyof WindowEventMap = 'load';
    const handler = vi.fn();
    const options = undefined;

    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => {
      useEventListener(eventName, handler);
    });

    expect(window.addEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
  });

  it('should bind/unbind the event listener to the element when element is provided', () => {
    const eventName: keyof HTMLElementEventMap = 'mouseenter';
    const handler = vi.fn();
    const ref = { current: document.createElement('div') };
    const options = undefined;

    vi.spyOn(ref.current, 'addEventListener');
    vi.spyOn(ref.current, 'removeEventListener');

    const { unmount } = renderHook(() => {
      useEventListener(eventName, handler, ref, options);
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ref.current.addEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
    unmount();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ref.current.removeEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
  });

  it('should bind/unbind the event listener to the document when document is provided', () => {
    const eventName: keyof DocumentEventMap = 'load';
    const handler = vi.fn();
    const ref = { current: document };
    const options = undefined;

    vi.spyOn(document, 'addEventListener');
    vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => {
      useEventListener(eventName, handler, ref, options);
    });

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.addEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
    unmount();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(document.removeEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
  });

  it('should pass the options to the event listener', () => {
    const eventName: keyof WindowEventMap = 'load';
    const handler = vi.fn();
    const options = {
      capture: true,
      once: true,
      passive: true
    };

    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');

    renderHook(() => {
      useEventListener(eventName, handler, undefined, options);
    });

    expect(window.addEventListener).toHaveBeenCalledWith(eventName, expect.any(Function), options);
  });

  it('should call the event listener handler when the event is triggered', () => {
    const eventName: keyof HTMLElementEventMap = 'click';
    const handler = vi.fn();
    const ref = { current: document.createElement('button') };

    renderHook(() => {
      useEventListener(eventName, handler, ref);
    });

    fireEvent.click(ref.current);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should have the correct event type', () => {
    const ref = { current: document.createElement('button') };

    const clickHandler = vi.fn();
    const keydownHandler = vi.fn();

    renderHook(() => {
      useEventListener('click', clickHandler, ref);
    });
    renderHook(() => {
      useEventListener('keydown', keydownHandler, ref);
    });

    fireEvent.click(ref.current);
    fireEvent.keyDown(ref.current);

    expect(clickHandler).toHaveBeenCalledWith(expect.any(MouseEvent));
    expect(keydownHandler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
  });
});
