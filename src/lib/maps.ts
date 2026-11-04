/** Single Google Maps search for the factory, shared by the map, its link and the reviews button. */
export const MAP_QUERY = "العواضي لصناعة الزجاج، المنطقة الصناعية القاع، القيضي، صنعاء";
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
