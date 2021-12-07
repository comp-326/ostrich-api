import request from "supertest"
const { VERSION } = require("../../src/config")
import app from "../../src/bin/app"


describe("Default homepage", () => {
    it("Should give a success message   ", async () => {
        const res = await request(app).get(`/${VERSION}/`)
        expect(res.statusCode).toEqual(200)
    })
})