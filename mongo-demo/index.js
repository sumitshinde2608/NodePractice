const mongoose = require("mongoose");

mongoose
	.connect("mongodb://localhost/playground", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to mongoDB"))
	.catch((err) => {
		console.error("Could  not connect to db...", err);
	});

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema); // creating a class

async function createCourse() {
	const course = new Course({
		name: "IOS Course",
		author: "Andrei Neogie",
		tags: ["Swift", "iPhone"],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	Course.find();
}

getCourses();
