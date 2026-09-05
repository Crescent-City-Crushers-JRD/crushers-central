// Converts the <input>'s local value -> a proper RFC3339 string (with offset)
function toRFC3339(localValue) {
    if (!localValue) return "";
    const d = new Date(localValue); // interpreted as local time
    const pad = (n) => String(n).padStart(2, "0");
    const offsetMin = -d.getTimezoneOffset(); // e.g. -360 for UTC-6 -> 360
    const sign = offsetMin >= 0 ? "+" : "-";
    const absOffset = Math.abs(offsetMin);
    const offsetStr = `${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;

    return (
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
        offsetStr
    );
}

function toDatetimeLocalValue(rfc3339) {
    if (!rfc3339) return "";
    const d = new Date(rfc3339);
    if (isNaN(d)) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return (
        `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        `T${pad(d.getHours())}:${pad(d.getMinutes())}`
    );
}

