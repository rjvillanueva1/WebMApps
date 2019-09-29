﻿'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  article;

/**
 * Article routes tests
 */
describe('Article Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose.connection.db);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new article
    user.save()
      .then(function () {
        article = {
          title: 'Article Title',
          content: 'Article Content'
        };

        done();
      })
      .catch(done);
  });

  it('should be able to save an article if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/maps')
          .send(article)
          .expect(200)
          .end(function (mapsaveErr, mapsaveRes) {
            // Handle article save error
            if (mapsaveErr) {
              return done(mapsaveErr);
            }

            // Get a list of maps
            agent.get('/api/maps')
              .end(function (mapsGetErr, mapsGetRes) {
                // Handle article save error
                if (mapsGetErr) {
                  return done(mapsGetErr);
                }

                // Get maps list
                var maps = mapsGetRes.body;

                // Set assertions
                (maps[0].user._id).should.equal(userId);
                (maps[0].title).should.match('Article Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an article if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/maps')
          .send(article)
          .expect(200)
          .end(function (mapsaveErr, mapsaveRes) {
            // Handle article save error
            if (mapsaveErr) {
              return done(mapsaveErr);
            }

            // Update article title
            article.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing article
            agent.put('/api/maps/' + mapsaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleUpdateErr, articleUpdateRes) {
                // Handle article update error
                if (articleUpdateErr) {
                  return done(articleUpdateErr);
                }

                // Set assertions
                (articleUpdateRes.body._id).should.equal(mapsaveRes.body._id);
                (articleUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an article if no title is provided', function (done) {
    // Invalidate title field
    article.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/maps')
          .send(article)
          .expect(422)
          .end(function (mapsaveErr, mapsaveRes) {
            // Set message assertion
            (mapsaveRes.body.message).should.match('Title cannot be blank');

            // Handle article save error
            done(mapsaveErr);
          });
      });
  });

  it('should be able to delete an article if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/maps')
          .send(article)
          .expect(200)
          .end(function (mapsaveErr, mapsaveRes) {
            // Handle article save error
            if (mapsaveErr) {
              return done(mapsaveErr);
            }

            // Delete an existing article
            agent.delete('/api/maps/' + mapsaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleDeleteErr, articleDeleteRes) {
                // Handle article error error
                if (articleDeleteErr) {
                  return done(articleDeleteErr);
                }

                // Set assertions
                (articleDeleteRes.body._id).should.equal(mapsaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single article if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new article model instance
    article.user = user;
    var articleObj = new Article(article);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/maps')
          .send(article)
          .expect(200)
          .end(function (mapsaveErr, mapsaveRes) {
            // Handle article save error
            if (mapsaveErr) {
              return done(mapsaveErr);
            }

            // Get the article
            agent.get('/api/maps/' + mapsaveRes.body._id)
              .expect(200)
              .end(function (articleInfoErr, articleInfoRes) {
                // Handle article error
                if (articleInfoErr) {
                  return done(articleInfoErr);
                }

                // Set assertions
                (articleInfoRes.body._id).should.equal(mapsaveRes.body._id);
                (articleInfoRes.body.title).should.equal(article.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (articleInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    Article.remove().exec()
      .then(User.remove().exec())
      .then(done())
      .catch(done);
  });
});
