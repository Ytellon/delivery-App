const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../api/app');
const mock = require('./mocks/login.mock');

chai.use(chaiHttp);

describe('endpoint POST /login', () => {
  it('Com email e password corretos deve retornar token', async () => {
    const response = await chai.request(app).post('/login').send(mock.login);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  })

  it('Com email incorreto deve retornar erro "Not Found"', async () => {
    const response = await chai.request(app).post('/login').send(mock.loginIncorrectEmail);

    expect(response).to.have.status(404);
    expect(response.body).to.be.deep.eq({ message: 'Not Found' });
  })

  it('Com password incorreto deve retornar erro "Not Found"', async () => {
    const response = await chai.request(app).post('/login').send(mock.loginIncorrectPassword);

    expect(response).to.have.status(404);
    expect(response.body).to.be.deep.eq({ message: 'Not Found' });
  })

  it('Com email inválido deve retornar erro "Invalid Email"', async () => {
    const response = await chai.request(app).post('/login').send(mock.loginInvalidEmail);

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.eq({ message: 'Invalid Email' });
  })

  it('Com password inválido deve retornar erro "Invalid Password"', async () => {
    const response = await chai.request(app).post('/login').send(mock.loginInvalidPassword);

    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.eq({ message: 'Invalid Password' });
  })
});
