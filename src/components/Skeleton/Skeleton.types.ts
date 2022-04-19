export type SkeletonProps = {
    /**
     * Whether the skeleton is visible or not. A state or context controlled boolean
     */
    isVisible: boolean;
    /**
     * The width of the skeleton can be any valid CSS value with its' units. i.e '100vw', '100%', '400px', 400.
     * The default is 400
     */
    width?: string | number;
    /**
     * How many instances of the skeleton should appear. Ideal when wanting to cover a broad area of the viewport until 
     * some remote data are fetched.
     */
    repeat?: number;
}