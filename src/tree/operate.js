export default (context, self, op, other) => {
    let unit = (self.unit && self.unit.toString()) || (other.unit && other.unit.toString());
    if (unit) {
        unit = `"${unit}"`;
    } else {
        unit = `(('' + ${self.value}).replace(/[\\d.-]*/, "") || ('' + ${other.value}).replace(/[\\d.-]*/, ""))`;
    }
    return `parseFloat(${self.value}) ${op} parseFloat(${other.value}) + ${unit}`;
}