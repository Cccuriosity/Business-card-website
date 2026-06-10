import { useEffect, useRef } from "react";

export function useInfiniteScroll(onLoadMore: () => void, hasMore: boolean, loading: boolean) {
    const loaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!loaderRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    onLoadMore();
                }
            },
            {
                rootMargin: "200px",
                threshold: 0.1,
            }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [onLoadMore, hasMore, loading]);

    return loaderRef;
}
