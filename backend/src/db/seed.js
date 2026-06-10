const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { User, Tasks } = require("../models")
const config = require("../config")

async function seed() {
  if (!config.databaseUrl) {
    console.error("Error: DATABASE_URL environment variable is not set in backend/.env")
    process.exit(1)
  }

  try {
    console.log("Connecting to database...")
    await mongoose.connect(config.databaseUrl)
    console.log("Connected to database.")

    // 1. Create or find test user
    const email = "test@example.com"
    const password = "password123"
    let user = await User.findOne({ email })

    if (!user) {
      console.log(`Creating test user (${email})...`)
      const hashedPassword = await bcrypt.hash(password, 10)
      user = await User.create({
        name: "Test User",
        email,
        password: hashedPassword,
      })
      console.log("Test user created successfully.")
    } else {
      console.log(`Test user (${email}) already exists.`)
    }

    // 2. Clear existing tasks for this user to make it repeatable
    console.log("Clearing existing tasks for the test user...")
    await Tasks.deleteMany({ createdBy: user._id })

    // 3. Create sample tasks
    const sampleTasks = [
      {
        title: "Buy Groceries",
        description: "Milk, eggs, bread, and fruits",
        status: "TODO",
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000 * 2), // 2 days from now
        createdBy: user._id,
      },
      {
        title: "Finish Assignment",
        description: "Complete Task 5 CLI Setup Script assignment",
        status: "IN_PROGRESS",
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1), // 1 day from now
        createdBy: user._id,
      },
      {
        title: "Read a book",
        description: "Read 10 pages of 'Clean Code'",
        status: "DONE",
        dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000 * 1), // 1 day ago
        createdBy: user._id,
      },
    ]

    console.log("Inserting sample tasks...")
    await Tasks.insertMany(sampleTasks)
    console.log("\nDatabase seeded successfully with sample tasks!")
    console.log("-----------------------------------------------")
    console.log(`Test User Email:    ${email}`)
    console.log(`Test User Password: ${password}`)
    console.log("-----------------------------------------------\n")

  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
    console.log("Disconnected from database.")
  }
}

seed()
