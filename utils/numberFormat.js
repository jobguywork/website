export const numberFormat = (value) => {
    if (isNaN(value)) return value
    return value
        .toLocaleString('ir', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        .split('.')[0]
}