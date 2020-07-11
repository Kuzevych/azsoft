
export const getPossibleIPs = (rawIpStr) => {
    const possibleDotsIndexes = [];
    const length = rawIpStr.length;

    for (let dot1I = 1; dot1I <= length - 3; dot1I++) {
        for (let dot2I = 2; dot2I <= length - 2; dot2I++) {
            for (let dot3I = 3; dot3I <= length - 1; dot3I++) {
                if (dot2I - dot1I >= 2 && dot3I - dot2I >= 2) {
                    possibleDotsIndexes.push([dot1I, dot2I, dot3I]);
                }
            }
        }
    }

    return possibleDotsIndexes
        .map(([dot1I, dot2I, dot3I]) => [
            rawIpStr.slice(0, dot1I),
            rawIpStr.slice(dot1I, dot2I),
            rawIpStr.slice(dot2I, dot3I),
            rawIpStr.slice(dot3I),
        ])
        .filter((ipParts) =>
            ipParts.every((part) => {
                if (part[0] === '0' && part.length > 1) {
                    return false;
                }

                return parseInt(part, 10) <= 255;
            })
        )
        .map((ipParts) => ipParts.join('.'))
};