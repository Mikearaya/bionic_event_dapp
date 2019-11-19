# Avoiding Common Attacks

1. Re-entrancy Attacks
   to avoid this kind of attack i have minimized the amount of external calles made from the contracts. and on the event that external calls were necessary i have made the calles after completing all the internal calles.
   on other instances i have used appropriate modufiers to restrict access to certain contract functions.
2. integer overflow and underflow
   to avoid this attack i have incorporated the use of external library. safemath.sol when performing numeric manipulations.

3. Denial of service by block gas limit ( or startGas)
   this type of attack is prevented by limiting the use of for loop and also by using fixed loop rather that variable loop based on dynamic data.
