import { renderHook } from "@testing-library/react";
import { useDelayUnmount } from "../useDelayUnmount";
import { act } from "react-dom/test-utils";

jest.useFakeTimers(); // Mock the timers for setTimeout and clearTimeout

describe('useDelayUnmount', () => {

  test('should delay unmount when isMounted is false', () => {
    const { result, rerender } = renderHook((props) => useDelayUnmount(props.isMounted, 1000), {
      initialProps: { isMounted: true },
    });
    act(() => {
      rerender({ isMounted: false });
    });
    expect(result.current).toBe(true);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(result.current).toBe(false);
  });

  test('should immediately show when isMounted is true', () => {
    const { result, rerender } = renderHook((props) => useDelayUnmount(props.isMounted, 1000), {
      initialProps: { isMounted: false },
    });

    act(() => {
      rerender({ isMounted: true });
    });

    expect(result.current).toBe(true);
  });
});