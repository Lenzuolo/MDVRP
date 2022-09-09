export class NumberUtils {
    public static roundFloat(value: number, precision: number = 2) {
        let result = value.toString();
        result.replace(',','.');
        const arr = result.split('.');
        if(arr[1]?.length > precision) {
            const pow = Math.pow(10,arr[1].length - precision);
            arr[1] = Math.round((parseInt(arr[1]) + Number.EPSILON) / pow).toString();
        }
        result = arr.join('.');
        return parseFloat(result);
    }
}