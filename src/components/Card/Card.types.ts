export type CardProps = {
    /**
     * An image url, image path, or JSX Element. Depending the case the image will be rendered
     * conditionally. In case of element the styling is up to you
     */
    imageSrc?: string | React.ReactNode;
    /**
     * A string or JSX Element containing the Card title. In case of element the styling is up to you
     */
    title?: string | React.ReactNode;
    /**
     * A string or JSX Element containing the card description. In case of element the styling is up to you
     */
    description?: string | React.ReactNode;
    /**
     * A JSX Element to be passed as the footer of the card. Can contain anything you want but the styling is
     * up to you.
     */
    footer?: React.ReactNode;
    /**
     * A custom JSS object to pass in order to override the defalt style
     */
    style?: React.CSSProperties;
}
