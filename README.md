# angular-e-spring

Repositório criado para postar a evolução do curso de Angular + Spring da Loiane

## Principais tópicos abordados:

- **Atualização das versões do Angular e do Angular Material:** Foi atualizado o projeto para usar as versões mais recentes do Angular (14, 15 e 17), que trazem novas funcionalidades, melhorias de performance e correções de bugs. Também foram feitas algumas mudanças no código para se adaptar às novas versões.
  
- **Implementação do CRUD de cursos e aulas:** Foram criadas as entidades de cursos e aulas no back-end, utilizando o Java e o Spring Boot, e as interfaces de usuário no front-end, utilizando o Angular e o Angular Material. Foram implementadas as operações de criar, ler, atualizar e deletar (CRUD) para essas entidades, utilizando os serviços REST do Spring Boot e os serviços HTTP do Angular. Também foi utilizado o Hibernate para fazer o mapeamento objeto-relacional (ORM) entre as entidades e o banco de dados MySQL.
  
- **Implementação de validações no Angular e no Java:** Foram utilizados o Angular Typed Forms para criar formulários reativos e tipados no front-end, e o Bean Validation para definir restrições nos campos das entidades no back-end. Também foi criado um Controller Advice para lidar com as exceções lançadas pelos controllers do Spring Boot e retornar mensagens de erro adequadas para o front-end.
  
- **Implementação de paginação no Angular e no Spring:** Foi utilizado o Angular Material Paginator para criar uma interface de usuário que permite navegar pelas páginas de dados no front-end, e o Spring Data JPA para implementar a paginação dos dados no back-end. Também foi usado o Spring HATEOAS para adicionar links de navegação nas respostas do serviço REST.
  
- **Implementação de enums em Java:** Foram utilizados enums para representar categorias e status dos cursos, e foram criados conversores para persistir esses valores no banco de dados como strings. Também foi utilizado o serviço de validação de enum com Java Bean para verificar se os valores recebidos pelo serviço REST são válidos.
  
- **Implementação de soft delete:** Foi utilizada a anotação @SQLDelete do Hibernate para marcar os registros deletados no banco de dados com um campo booleano, em vez de removê-los fisicamente. Também foi utilizada a anotação @Where para filtrar os registros ativos nas consultas.
  
- **Implementação de modal de confirmação:** Foi utilizado o Angular Material Dialog para criar um componente que exibe uma caixa de diálogo para confirmar a ação de deletar um curso ou uma aula no front-end.
  
- **Implementação de one-to-many de aulas para cursos:** Foi utilizada a anotação @OneToMany do Hibernate para definir o relacionamento entre as entidades de cursos e aulas, indicando que um curso pode ter várias aulas, mas uma aula pertence a apenas um curso. Também foram utilizadas as anotações @Cascade e @OrphanRemoval para gerenciar o ciclo de vida das aulas associadas a um curso.
  
- **Implementação do DTO e mapper na entidade Java:** Foi utilizado o padrão Data Transfer Object (DTO) para criar classes que representam os dados que são transferidos entre o front-end e o back-end, evitando expor os detalhes da entidade. Também foi utilizado o MapStruct para criar mappers que fazem a conversão entre as entidades e os DTOs de forma automática e eficiente.
  
- **Migração de módulos e routers para standalone:** O projeto Angular foi refatorado para separar os módulos e os routers em arquivos independentes, seguindo as boas práticas de modularização e organização do código.
  
- **Migração para componentes standalone:** O projeto Angular foi refatorado para separar os componentes inteligentes dos componentes de apresentação, seguindo o princípio da separação de responsabilidades e facilitando os testes unitários.
  
- **Utilização de Docker com MySQL:** Foi utilizado o Docker para criar e executar um container com o MySQL, que é o banco de dados usado pela aplicação. Também foi utilizado o Docker Compose para gerenciar o container e definir as configurações necessárias.
