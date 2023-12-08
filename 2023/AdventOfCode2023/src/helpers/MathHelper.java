package adventofcode2023.helpers;

public class MathHelper {
    public static long greatestCommonDivisor(long a, long b){
        while (b != 0) {
            long c = b;
            b = a % b;
            a = c;
        }

        return a;
    }

    public static long leastCommonMultiplier(long a, long b){
        long gcd = greatestCommonDivisor(a, b);
        return a*b/gcd;
    }
}
