import supertest from "supertest";
import { API } from "../index";

// const app = servers;
describe("API tests", () => {
  describe("Onboarding routes", () => {
    describe("register_user", () => {
      it("it should return an object containing message, code, phone_code and email_code", async () => {
        const option = {
          email: "phil123@gmail.com",
          phone: "09020269811",
          password: "abelkelly",
          firstName: "Abel",
          lastName: "Kalu",
          has_accepted_terms: true,
          gender: "Male",
          username: "Abeallkelly6022",
        };
        const { body, statusCode } = await supertest(API)
          .post("/api/v1/onboarding/users")
          .send(option);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual(
          "Account created successfully kindly use the token sent to your email address and phone number to validate your account"
        );
      });
    });

    describe("verify email", () => {
      it("it should return 200 if email was validated successfully", async () => {
        const option = {
          code: "229571",
          email: "phil123@gmail.com",
        };
        const { body, statusCode } = await supertest(API)
          .post("/api/v1/onboarding/verify-email")
          .send(option);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual("Email successfully verified");
      });
    });
    describe("verify phone number", () => {
      it("it should return 200 if email was validated successfully", async () => {
        const option = {
          code: "633138",
          phone: "09020269811",
        };
        const { body, statusCode } = await supertest(API)
          .post("/api/v1/onboarding/verify-phone")
          .send(option);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual("Phone number successfully verified");
      });
    });
    describe("Login", () => {
      it("it should return 200 if login successful", async () => {
        const option = {
          email: "abelkelly6022@gmail.com",
          password: "abelkelly",
        };
        const { body, statusCode } = await supertest(API)
          .post("/api/v1/onboarding/login")
          .send(option);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual("Logged in successfully");
      });
    });
    describe("get user by id", () => {
      it("it should return 200 if successful", async () => {
        let token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYmVsa2VsbHk2MDIyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFiZWwiLCJwaG9uZV9udW1iZXIiOiIrMjM0NzAxNDE0OTI2NiIsImlhdCI6MTcyOTQ5MzkyOSwiZXhwIjoxNzI5NDk1NzI5fQ.g9wCGV9C-Fh44XTcgy8kWpVMcsMJvKjqvwa7l6bzUho";
        const { body, statusCode } = await supertest(API)
          .get("/api/v1/transactions/users/1")
          .set("Authorization", `Bearer ${token}`);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual("success");
      });
    });
    describe("get user by username", () => {
      it("it should return 200 if successful", async () => {
        let token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYmVsa2VsbHk2MDIyQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFiZWwiLCJwaG9uZV9udW1iZXIiOiIrMjM0NzAxNDE0OTI2NiIsImlhdCI6MTcyOTQ5MzkyOSwiZXhwIjoxNzI5NDk1NzI5fQ.g9wCGV9C-Fh44XTcgy8kWpVMcsMJvKjqvwa7l6bzUho";
        const { body, statusCode } = await supertest(API)
          .get("/api/v1/transactions/get-user-by-username/users/Abelkelly")
          .set("Authorization", `Bearer ${token}`);
        console.log({ body, statusCode });
        expect(statusCode).toBe(200);
        expect(body.data.message).toEqual("success");
      });
    });
  });
});
