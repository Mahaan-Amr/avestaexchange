const { PrismaClient } = require("@prisma/client"); const bcrypt = require("bcryptjs"); const prisma = new PrismaClient(); async function createAdmin() { const hashedPassword = await bcrypt.hash("admin123", 10); const user = await prisma.user.create({ data: { name: "Admin", email: "admin@avesta.com", password: hashedPassword, role: "ADMIN" } }); console.log("Created admin user:", user); } createAdmin().catch(console.error);
