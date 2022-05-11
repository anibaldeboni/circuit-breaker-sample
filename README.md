# Circuit Breaker

This pattern is similar when working with services connected on the same network and need to communicate. We need to reduce this impact when we have a service that is running slowly or that is down. The circuit breaker monitors these possible faults, when they reach a certain threshold, the circuit “disarms” and any call made after that returns an error or we can adopt a fallback response. Then, after a set amount of time, the circuit breaker makes calls again to the affected services. If the calls are successful, the circuit closes and traffic starts flowing again.

# Installation

```
$ yarn install
```

# Running

Fake webserver

```
$ yarn start
```

Circuit breaker

```
$ yarn circuit-breaker
```
