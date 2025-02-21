require("dotenv").config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

app.use(cors())

const poll = mysql.createPool(
    {
        uri: process.env.DB_URL, 
        connectionLimit: 5,
}
);

async function getQuestions(level) {   
    try {
        const [rows] = await poll.query('SELECT * FROM question WHERE level = ?', [level]);
        return rows;
    } catch(error) {
        throw error;
    } 
}

app.get('/:level', async (req, res) => {
    const level = req.params.level;

    if(!['easy', 'medium', 'hard', 'legendary'].includes(level)) {
        return res.status(400).send({error: 'Invalid level'})
    }

    try {
        const questions = await getQuestions(level);
        return res.json({level, questions});
    } catch(error) {
        console.error(error)
        return res.status(500).send({error: 'Database error', details: error.message})
    }
});

(() => {
    poll.query(`INSERT INTO question ('id', 'level', 'content', 'answer') VALUES
    (1, 'easy', 'What is 2 + 2?', 4),
    (2, 'easy', 'How many days are in a week?', 7),
    (3, 'easy', 'What is 10 divided by 2?', 5),
    (4, 'easy', 'How many sides does a triangle have?', 3),
    (5, 'easy', 'What is 5 multiplied by 3?', 15),
    (6, 'easy', 'How many hours are in a day?', 24),
    (7, 'easy', 'What is the smallest two-digit number?', 10),
    (8, 'easy', 'What is 9 minus 3?', 6),
    (9, 'easy', 'How many months are in a year?', 12),
    (10, 'easy', 'What is the square root of 16?', 4),
    (11, 'easy', 'What is 7 times 8?', 56),
    (12, 'easy', 'How many centimeters are in a meter?', 100),
    (13, 'easy', 'What is 15 plus 10?', 25),
    (14, 'easy', 'What is half of 50?', 25),
    (15, 'easy', 'How many legs does a spider have?', 8),
    (16, 'easy', 'What is 20 divided by 4?', 5),
    (17, 'easy', 'How many vowels are in the English alphabet?', 5),
    (18, 'easy', 'What is 3 squared?', 9),
    (19, 'easy', 'How many sides does a square have?', 4),
    (20, 'easy', 'What is 12 minus 7?', 5),
    (21, 'easy', 'What is 1 + 1?', 2),
    (22, 'easy', 'How many hours are in 2 days?', 48),
    (23, 'easy', 'What is 100 divided by 10?', 10),
    (24, 'easy', 'How many colors are in a rainbow?', 7),
    (25, 'easy', 'What is 30% of 100?', 30),
    (26, 'easy', 'How many continents are there on Earth?', 7),
    (27, 'easy', 'What is 25 multiplied by 2?', 50),
    (28, 'easy', 'What is 11 plus 9?', 20),
    (29, 'easy', 'How many days are in February (non-leap year)?', 28),
    (30, 'easy', 'What is the square of 5?', 25),
    (31, 'medium', 'What is the square root of 64?', 8),
    (32, 'medium', 'What is 15% of 200?', 30),
    (33, 'medium', 'How many hours are in 3 days?', 72),
    (34, 'medium', 'What is 25 times 4?', 100),
    (35, 'medium', 'How many inches are in 2 feet?', 24),
    (36, 'medium', 'What is the sum of the angles in a triangle?', 180),
    (37, 'medium', 'What is 8 times 12?', 96),
    (38, 'medium', 'How many grams are in a kilogram?', 1000),
    (39, 'medium', 'What is 1.5 multiplied by 3?', 4.5),
    (40, 'medium', 'What is 50% of 400?', 200),
    (41, 'medium', 'What is the cube of 3?', 27),
    (42, 'medium', 'How many seconds are in 5 minutes?', 300),
    (43, 'medium', 'What is 9 times 7?', 63),
    (44, 'medium', 'What is 18 divided by 6?', 3),
    (45, 'medium', 'What is the square of 12?', 144),
    (46, 'medium', 'What is 2 to the power of 5?', 32),
    (47, 'medium', 'How many faces does a cube have?', 6),
    (48, 'medium', 'What is 45 plus 55?', 100),
    (49, 'medium', 'What is the product of 11 and 11?', 121),
    (50, 'medium', 'What is 75 minus 30?', 45),
    (51, 'medium', 'What is 100 divided by 4?', 25),
    (52, 'medium', 'How many sides does a pentagon have?', 5),
    (53, 'medium', 'What is 40% of 250?', 100),
    (54, 'medium', 'How many edges does a rectangular prism have?', 12),
    (55, 'medium', 'What is 16 times 3?', 48),
    (56, 'medium', 'What is the value of 13 squared?', 169),
    (57, 'medium', 'What is 6 factorial (6!)?', 720),
    (58, 'medium', 'What is the perimeter of a square with sides 10cm?', 40),
    (59, 'medium', 'What is 21 divided by 7?', 3),
    (60, 'medium', 'How many minutes are in 2 hours?', 120),
    (61, 'hard', 'What is the cube root of 27?', 3),
    (62, 'hard', 'If a train travels 60 miles per hour for 2.5 hours, how far does it go?', 150),
    (63, 'hard', 'What is 13 squared?', 169),
    (64, 'hard', 'How many seconds are in 2 hours?', 7200),
    (65, 'hard', 'What is 7 factorial (7!)?', 5040),
    (66, 'hard', 'What is the sum of the first 10 prime numbers?', 129),
    (67, 'hard', 'What is the circumference of a circle with radius 7 (Ď€=3.14)?', 43.96),
    (68, 'hard', 'What is 3 to the power of 5?', 243),
    (69, 'hard', 'If a car accelerates at 4 m/sÂ˛ for 5 seconds, what is its final speed?', 20),
    (70, 'hard', 'What is the hypotenuse of a right triangle with sides 6 and 8?', 10),
    (71, 'hard', 'What is 100 divided by 0.5?', 200),
    (72, 'hard', 'How many degrees are in 3/4 of a circle?', 270),
    (73, 'hard', 'What is the square root of 289?', 17),
    (74, 'hard', 'What is 5 to the power of 3?', 125),
    (75, 'hard', 'What is the volume of a cube with side length 4?', 64),
    (76, 'hard', 'How many diagonals are in a hexagon?', 9),
    (77, 'hard', 'What is the value of 2^10?', 1024),
    (78, 'hard', 'What is 10 factorial (10!)?', 3628800),
    (79, 'hard', 'What is 80% of 500?', 400),
    (80, 'hard', 'What is the area of a triangle with base 12 and height 8?', 48),
    (81, 'hard', 'What is 25 multiplied by 16?', 400),
    (82, 'hard', 'How many liters are in a cubic meter?', 1000),
    (83, 'hard', 'What is the value of 19 squared?', 361),
    (84, 'hard', 'What is the sum of the interior angles of a pentagon?', 540),
    (85, 'hard', 'How many zeroes are there in 10 billion?', 10),
    (86, 'hard', 'What is the smallest 3-digit prime number?', 101),
    (87, 'hard', 'How many permutations are there of 5 items?', 120),
    (88, 'hard', 'What is the radius of a circle with circumference 31.4 (Ď€=3.14)?', 5),
    (89, 'hard', 'What is 3.14 multiplied by 5 squared?', 78.5),
    (90, 'hard', 'What is the sum of the first 15 natural numbers?', 120),
    (91, 'legendary', 'What is the 15th Fibonacci number?', 610),
    (92, 'legendary', 'How many prime numbers are there below 100?', 25),
    (93, 'legendary', 'What is the area of a circle with radius 15 (Ď€=3.14)?', 706.5),
    (94, 'legendary', 'What is the value of 3^8?', 6561),
    (95, 'legendary', 'If a car accelerates at 10 m/sÂ˛ for 8 seconds, what is its final speed?', 80),
    (96, 'legendary', 'What is the sum of the first 20 prime numbers?', 639),
    (97, 'legendary', 'What is the square root of 1024?', 32),
    (98, 'legendary', 'What is the surface area of a sphere with radius 10 (Ď€=3.14)?', 1256),
    (99, 'legendary', 'What is the volume of a sphere with radius 6 (Ď€=3.14)?', 904.32),
    (100, 'legendary', 'What is the hypotenuse of a right triangle with sides 12 and 35?', 37),
    (101, 'legendary', 'How many combinations can be made from a set of 10 items taken 4 at a time?', 210),
    (102, 'legendary', 'What is the natural logarithm of e^3?', 3),
    (103, 'legendary', 'What is the sum of the squares of the first 10 natural numbers?', 385),
    (104, 'legendary', 'What is the cube root of 729?', 9),
    (105, 'legendary', 'How many diagonals are in a decagon?', 35),
    (106, 'legendary', 'What is the 12th triangular number?', 78),
    (107, 'legendary', 'How many faces, edges, and vertices does a dodecahedron have?', 60),
    (108, 'legendary', 'What is the perimeter of a regular hexagon with side length 12?', 72),
    (109, 'legendary', 'What is 9 factorial (9!)?', 362880),
    (110, 'legendary', 'How many permutations are there of 6 items?', 720),
    (111, 'legendary', 'What is the smallest 4-digit number divisible by both 12 and 15?', 1020),
    (112, 'legendary', 'What is the area of a triangle with sides 13, 14, and 15 (using Heron\'s formula)?', 84),
    (113, 'legendary', 'How many degrees are there in 7/8 of a circle?', 315),
    (114, 'legendary', 'What is the largest prime number below 200?', 199),
    (115, 'legendary', 'What is the remainder when 123456 is divided by 789?', 372),
    (116, 'legendary', 'What is the value of cos(60 degrees)?', 0.5),
    (117, 'legendary', 'What is the determinant of a 2x2 matrix [[4, 3], [2, 1]]?', -2),
    (118, 'legendary', 'How many 3-digit numbers are divisible by 9?', 100),
    (119, 'legendary', 'What is the total surface area of a cube with a diagonal of length 12?', 144),
    (120, 'legendary', 'What is the 25th term of the arithmetic sequence starting at 3 with a common difference of 4?', 99)`
    )
})()

app.listen(3000, () => {
    console.log(`Server is running`);
});