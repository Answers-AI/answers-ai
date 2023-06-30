declare enum ItemType {
    H1 = "H1",
    H2 = "H2",
    H3 = "H3",
    H4 = "H4",
    H5 = "H5",
    H6 = "H6"
}
export default ItemType;
declare namespace ItemType {
    /**
     * @param level 1-6
     * @returns
     */
    function header(level: number): ItemType;
}
