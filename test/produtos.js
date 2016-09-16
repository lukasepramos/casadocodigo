var express = require('../config/express')();
var request = require('supertest')(express);
var assert = require('assert');
describe('#ProdutosController', function(){

  beforeEach(function(done){
    var conn = express.infra.connectionFactory();
    conn.query("delete from livros", function(ex, results){
      if(!ex){
        done();
      }
    });
  });

  it('#listagem json',function(done){
    request.get('/produtos')
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200,done);
  });

  it('#listagem html',function(done){
    request.get('/produtos')
    .set('Accept','text/html')
    .expect('Content-Type',/html/)
    .expect(200,done);
  });

  it('#cadastrar novo produto com dados inválidos', function(done){
    request.post('/produtos')
    .send({titulo:"", descricao:"novo livro"})
    .expect(400, done);
  });

  it('#cadastrar novo produto com dados válidos', function(done){
    request.post('/produtos')
    .send({titulo:"Titulo", descricao:"novo livro", preco:40.50})
    .expect(302, done);
  });


});
