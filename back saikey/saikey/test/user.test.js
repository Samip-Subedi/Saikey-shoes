// let chai = require("chai");

// let chaiHttp = require("chai-http");

// let server = require("../server");

// // assertion style

// chai.should();

// chai.use(chaiHttp);

// describe("Cybershop User API TEST", () => {
//   // test the login route

//   describe("POST /api/login", () => {
//     it("It should login a user", (done) => {
//       chai

//         .request(server)

//         .post("/api/v2/login")

//         .send({
//           email: "adsasdasdsad@gmail.com",

//           password: "dasd",
//         })

//         .end((err, res) => {
//           res.should.have.status(201);

//           done();
//         });
//     });
//   });
// });

// describe("Cybershop User API TEST", () => {
//   // test the logout route

//   describe("GET /api/logout", () => {
//     it("It should logout a user", (done) => {
//       chai

//         .request(server)

//         .get("/api/v2/logout")

//         .end((err, res) => {
//           res.should.have.status(200);

//           done();
//         });
//     });
//   });
// });

// describe("Cybershop User API TEST", () => {
//   // test the userdetails route

//   describe("GET /api/userdetails", () => {
//     it("It should get a user details", (done) => {
//       chai

//         .request(server)

//         .get("/api/v2/me")

//         .end((err, res) => {
//           res.should.have.status(401);

//           done();
//         });
//     });
//   });
// });

// describe("Cybershop User API TEST", () => {
//   // test the updatePassword route

//   describe("PUT /api/updatePassword", () => {
//     it("It should update a user password", (done) => {
//       chai

//         .request(server)

//         .put("/api/v2/me/update")

//         .send({
//           password: "daadas",

//           newPassword: "dasdads",

//           passwordConfirm: "asdasd",
//         })

//         .end((err, res) => {
//           res.should.have.status(401);

//           done();
//         });
//     });
//   });
// });

// describe("Cybershop User API TEST", () => {
//   // test the delete route

//   describe("GET /api/user deleted", () => {
//     it("It should get a user deleted", (done) => {
//       chai

//         .request(server)

//         .delete("/api/v2/admin/user/:id")

//         .end((err, res) => {
//           res.should.have.status(401);

//           done();
//         });
//     });
//   });
// });

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // Path to your server file
const User = require("../models/UserModel"); // Path to your User model
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

chai.use(chaiHttp);
chai.should();

dotenv.config();

let userToken = ""; // Store user token for login-required tests

// Test suite for authentication
describe("User Authentication API", () => {
  // Test user registration
  describe("POST /api/v2/register", () => {
    it("should register a new user", (done) => {
      chai
        .request(server)
        .post("/api/v2/register")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password123",
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });

  // Test user login
  describe("POST /api/v2/login", () => {
    it("should log in the user", (done) => {
      chai
        .request(server)
        .post("/api/v2/login")
        .send({
          email: "khadkaaayush90@gmail.com",
          password: "Aayushpass123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("token");
          userToken = res.body.token; // Save the token for further requests
          done();
        });
    });

    it("should not log in with incorrect password", (done) => {
      chai
        .request(server)
        .post("/api/v2/login")
        .send({
          email: "johndoe@example.com",
          password: "wrongpassword",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("User is not find with this email & password");
          done();
        });
    });
  });

  // Test user logout
  describe("GET /api/v2/logout", () => {
    it("should log out the user", (done) => {
      chai
        .request(server)
        .get("/api/v2/logout")
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("You are logged out successfully");
          done();
        });
    });
  });

  // Test getting user details (requires login)
  describe("GET /api/v2/me", () => {
    it("should get the user details", (done) => {
      chai
        .request(server)
        .get("/api/v2/me")
        .set("Authorization", `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.user.should.have.property("name").eql("John Doe");
          res.body.user.should.have
            .property("email")
            .eql("johndoe@example.com");
          done();
        });
    });

    it("should return 401 if not authenticated", (done) => {
      chai
        .request(server)
        .get("/api/v2/me")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Not authorized to access this route");
          done();
        });
    });
  });

  // Test password reset flow
  describe("POST /api/v2/password/forgot", () => {
    it("should send a reset token email", (done) => {
      chai
        .request(server)
        .post("/api/v2/password/forgot")
        .send({
          email: "johndoe@example.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("message");
          done();
        });
    });
  });

  // Test resetting the password
  describe("PUT /api/v2/password/reset/:token", () => {
    let resetToken;
    before((done) => {
      User.findOne({ email: "johndoe@example.com" }).then((user) => {
        resetToken = user.getResetToken(); // Generate the reset token for the test
        done();
      });
    });

    it("should reset the password successfully", (done) => {
      chai
        .request(server)
        .put(`/api/v2/password/reset/${resetToken}`)
        .send({
          password: "newpassword123",
          passwordConfirm: "newpassword123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });

    it("should not reset the password if tokens do not match", (done) => {
      chai
        .request(server)
        .put(`/api/v2/password/reset/${resetToken}`)
        .send({
          password: "newpassword123",
          passwordConfirm: "differentpassword",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("Passwords are not matched");
          done();
        });
    });
  });

  // Test updating the user profile
  describe("PUT /api/v2/me/update/profile", () => {
    it("should update the user profile", (done) => {
      chai
        .request(server)
        .put("/api/v2/me/update/profile")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "John Updated",
          email: "johnupdated@example.com",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });

  // Test updating the user password
  describe("PUT /api/v2/me/update", () => {
    it("should update the password", (done) => {
      chai
        .request(server)
        .put("/api/v2/me/update")
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          oldPassword: "newpassword123",
          newPassword: "updatedpassword123",
          passwordConfirm: "updatedpassword123",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
  });
});
