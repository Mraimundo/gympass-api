# App

GymPass style app.

### RFs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar na plataforma;
- [x] Deve ser possivel se autenticar na plataforma;
- [x] Deve ser possivel obter o perfil de um usúario logado;
- [x] Deve ser possivel obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possivel o usúario obter seu histórico de check-ins;
- [x] Deve ser possivel o usúrio buscar academias próximas (até 10km);
- [x] Deve ser possivel o usúrio buscar academias pelo nome;
- [x] Deve ser possivel o usúrio realizar check-in em uma acamia;
- [x] Deve ser possivel validar o check-in de um usúario;
- [x] Deve ser possivel cadastrar uma academia;

### RNs (Regras de negócio)

- [x] O usúrio não pode se cadastrar com um email duplicado;
- [x] O usúrio não pode fazer 2 check-ins no mesmo dia;
- [x] O usúrio não pode fazer check-in se não estiver perto (100m) da acamia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

### RNFs (Requisitos não-funcionais)

- [x] A senha do usúario precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [] O usúario deve ser identificado por um JWT (JSON Web Token);
