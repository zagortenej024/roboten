const { sequelize } = require("../models.js");


describe("Test Database Connection", () => {
    it("Should connect to the database", () => {
        sequelize.authenticate();
        sequelize.query("CREATE TABLE test(id INT)");
        sequelize.query("DROP TABLE test");
    });
});
