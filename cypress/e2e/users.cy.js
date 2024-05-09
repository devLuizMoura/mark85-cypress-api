describe('POST /users', () => {

  beforeEach(function () {
    cy.fixture('users').then(function (users) {
      this.users = users
    })
  })



  it('Register a new user', function () {

    const user = this.users.create

    cy.task('removeUser', user.email)    //Garante que a massa não exista antes de iniciar o teste fazendo uma busca no banco, deletando caso exista

    cy.postUser(user)
      .then(response => {
        expect(response.status).to.eq(201)
      })

  })

  it('Duplicate email', function () {

    const user = this.users.duplicateEmail

    cy.task('removeUser', user.email)   //Garante que a massa não exista antes de iniciar o teste fazendo uma busca no banco, deletando caso exista

    cy.postUser(user)     //Cadastra previamente o usuario para garantir que ele exista no banco

    cy.postUser(user)     //Insere novamente o mesmo usuario já cadastrado anteriormente no banco
      .then(response => {

        const { message } = response.body

        expect(response.status).to.eq(409)
        expect(message).to.eq('Duplicated email!')
      })

  })

  context('Required fields', function () {

    let user

    beforeEach(function () {        //Executa antes de cada teste, reiniciando a massa de teste
      user = this.users.required
    })

    it('Name is required', () => {

      delete user.name

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"name\" is required')
        })

    })

    it('Email is required', () => {

      delete user.email

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is required')
        })

    })

    it('Password is required', () => {

      delete user.password

      cy.postUser(user)
        .then(response => {

          const { message } = response.body

          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"password\" is required')
        })
    })

  })

})
