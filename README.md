# App

GymPass style app.

### RFs (Requisitos funcionais)

- [] Deve ser possivel se cadastrar na plataforma;
- [] Deve ser possivel se autenticar na plataforma;
- [] Deve ser possivel obter o perfil de um usúario logado;
- [] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possivel o usúario obter seu histórico de check-ins;
- [] Deve ser possivel o usúrio buscar academias próximas;
- [] Deve ser possivel o usúrio buscar academias pelo nome;
- [] Deve ser possivel o usúrio realizar check-in em uma acamia;
- [] Deve ser possivel validar o check-in de um usúario;
- [] Deve ser possivel cadastrar uma academia;

### RNs (Regras de negócio)

- [] O usúrio não pode se cadastrar com um email duplicado;
- [] O usúrio não pode fazer 2 check-ins no mesmo dia;
- [] O usúrio não pode fazer check-in se não estiver perto (100m) da acamia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [] A senha do usúario precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usúario deve ser identificado por um JWT (JSON Web Token);
