class ArrayUtils {
    static sum(arr) {
        return arr.length === 0 ? 0 : arr[0] + ArrayUtils.sum(arr.splice(1));
    }
}

export default ArrayUtils;