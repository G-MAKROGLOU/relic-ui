export type TypographyProps =  {
    /**
     * The type of the typography
     */
    type: "header" | "subtitle" | "title" | "regular" | "text" | "note" | "details";
    /**
     * The font color
     */
    color?: string;
    
    /**
     * The typography contents
     */
    content?: string;
  };