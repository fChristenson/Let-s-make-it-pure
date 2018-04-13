# Let's make it pure

## What we will cover

* Traditional MVC controller development
* Why people starting using a service layer in their controllers
* The problems with using a service
* How to make services easier to maintain over time

## Notes

A service is just a class that will be responsible for an area of
your code, common services are `UserService`, `EmailService` and
`ProductService`.

Every OOP project I have ever worked on has some flavour of this going
on in their codebase and those who don't have a scaling issue.

Services are not the sexiest way to write code but they are simple
to maintain and they are simple to scale up when your company grows.

The problem is often that services get very messy and they start
depending on each other.

A very standard architecture for services is:

====================

controller -> service -> dao -> database

====================

The controller is where the network request comes in and it is simply
responsible for knowing which service should handle the request.

As you can see the service is in charge of all our business logic.
