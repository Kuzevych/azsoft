
export const getPossibleIPs = (rawIpStr) => {
    const possibleDotsIndexes = [];
    const length = rawIpStr.length;

    for (let i = 1; i <= length - 3; i++) {
        for (let j = 2; j <= length - 2; j++) {
            for (let k = 3; k <= length - 1; k++) {
                if (j - i >= 2 && k - j >= 2) {
                    possibleDotsIndexes.push([i, j, k]);
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