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
		name: "DSA Prep Course",
		author: "GFG",
		tags: ["DSA", "Placements"],
		isPublished: true,
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	const courses = await Course.find({ author: "Mosh", isPublished: true })
		.limit(5)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
	console.log(courses);
}

getCourses();
