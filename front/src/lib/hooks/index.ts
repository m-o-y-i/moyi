/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useCallback } from 'react';

// 防抖
export const useDebounce = (
    fn: (args: any) => void,
    delay: number,
    dep: any = []
) => {
    const { current } = useRef<{ fn: Function; timer: null | NodeJS.Timeout }>({
        fn,
        timer: null,
    });
    useEffect(
        function () {
            current.fn = fn;
        },
        [fn]
    );

    return useCallback((args: any) => {
        if (current.timer) {
            clearTimeout(current.timer);
        }
        current.timer = setTimeout(() => {
            current.fn(args);
        }, delay);
    }, dep);
};

