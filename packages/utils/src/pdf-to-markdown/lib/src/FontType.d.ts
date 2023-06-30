declare enum FontType {
    BOLD = "BOLD",
    OBLIQUE = "OBLIQUE",
    BOLD_OBLIQUE = "BOLD_OBLIQUE"
}
export default FontType;
declare namespace FontType {
    function declaredFontTypes(fontName: string): FontType[];
}
