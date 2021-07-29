const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/practice", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB.");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB: ", err);
	});

const CourseSchema = new mongoose.Schema({
	name: { type: String, required: true },
	tags: { type: [String] },
	author: { type: String },
	isPublished: { type: Boolean },
	date: { type: Date, default: Date.now },
	price: { type: Number },
});

const Course = mongoose.model("Course", CourseSchema); //cretaes a model Class

async function addCourse() {
	const course = new Course({
		name: "MongoDB",
		tags: ["NoSQL", "MongoDB"],
		author: "Sumit",
		isPublished: true,
		price: 25,
	});

	const result = await course.save();
	console.log(result);
}

async function getCourse() {
	const course = await Course.find({ tags: "backend" })
		.sort({ name: 1 })
		.and({ isPublished: true })
		.select({ name: 1, author: 1 });
	console.log(course);
}

async function updateCourse() {
	const course = await Course.findOne({ name: "MongoDB" });
	course.isPublished = false;
	const result = await course.save();
	console.log(result);
}

// getCourse();
updateCourse();
