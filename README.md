Michel de la compta a commencé à faire un backend avec Node.js et Express.
Pourquoi pas, mais on veut améliorer son code grâce à la clean architecture et au clean code.

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
