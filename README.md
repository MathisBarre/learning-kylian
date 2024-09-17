Au début de la boite, un quelqu'un a commencé à faire un backend avec Node.js et Express.
Pourquoi pas, mais on veut rendre son code mieux grâce à la clean architecture.

Vous aurez besoin de l'extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) pour faire des requêtes HTTP.

Objectifs :

- Séparer la logique de la technique
  - Usecase class
  - Inversion de dépendances
  - Repository
  - Presenter
  - ...
- Appliquer le clean code https://github.com/labs42io/clean-code-typescript
  - Early return
  - Never nest
  - Good naming
  - Extract types
- Une fois la logique séparée, on peut mettre en place un serveur https://fastify.dev/ qui pourra cohabiter avec le serveur Express
