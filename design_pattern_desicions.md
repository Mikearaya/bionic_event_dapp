# Design pattern decisions

to make the code useable and secure i have implemeted some est known design patterns.

1. Factory Contract.
   by implementing event calss i have created a central point of contract and also whoever deploying the contract/event will be charge for the required gas not from the app side.
2. Restricting Access
   each function on the contract implements a modifier that restricts access to other users that the cotract was ot intended for.

3. Checks-Effects-Interactions
   to avoid re-entrancy attack i have implemented the checks-effects-interactions in which all extrnal function calls that need to be called inside a contract function will be called after other operations inside the contract are done also other check such as is the request comming from autorized person, does the user have token, is transfer allowed will be checked.

4. Circuit Breaker
   to enable halting contract operation by autorized person i have implemented this pattern. the circuit breaker pattern used a boolean toggle to check if certain condition is met or not to make decision of allowing operation to continue or not.

5. Rate Limit
   to solve request rushes that could occure when purchasing ticket i have limited the the maximum numer of tickets a person can purchase with a single transaction.
