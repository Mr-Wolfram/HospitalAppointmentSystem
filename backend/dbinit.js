conn = new Mongo();

db = conn.getDB("admin");
db.auth("root", "example");

db = conn.getDB("test");

db.createUser({ user: "ReadWriter", pwd: "ReadWriter", roles: ["readWrite"] });
