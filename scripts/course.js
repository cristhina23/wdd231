const courses = [
  {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
      technology: [
          'Python'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
      technology: [
          'HTML',
          'CSS'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
      technology: [
          'Python'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
      technology: [
          'C#'
      ],
      completed: false
  },
  {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: false
  },
  {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: false
  }
]

document.addEventListener("DOMContentLoaded", () => {
  const allCoursesBtn = document.getElementById("all-courses");
  const wddCoursesBtn = document.getElementById("wdd-courses");
  const cseCoursesBtn = document.getElementById("cse-courses");
  const courseButtons = document.querySelectorAll(".courses button");
  const creditDisplay = document.getElementById("total-credits");
  const courseDetails = document.getElementById("course-details");


  
  allCoursesBtn.addEventListener("click", () => filterCourses("all"));
  wddCoursesBtn.addEventListener("click", () => filterCourses("wdd"));
  cseCoursesBtn.addEventListener("click", () => filterCourses("cse"));


  courseButtons.forEach(button => {
    button.addEventListener("click", () => {
      const courseNumber = parseInt(button.textContent.split(" ")[1]);
      const course = courses.find(c => c.number === courseNumber);
      DisplayCourseDetails(course);
    });
  });

  function filterCourses(type) {
      courseButtons.forEach(button => {
        
        
          if (type === "all" || button.classList.contains(type)) {
              button.style.display = "inline-block";
              
          } else {
              button.style.display = "none";
          }
      });
      calculateCredits();
  }
  

  courseButtons.forEach(button => {
    
    const courseNumber = parseInt(button.textContent.split(" ")[1]);

    
    const course = courses.find(c => c.number === courseNumber);

    if (course) {
        button.setAttribute("data-number", course.number);
        if (course.completed) {
            button.classList.add("completed");
        } else {
            button.classList.add("not");
        }
    }
    });

    function calculateCredits() {
        let totalCredits = courses
            .filter(course => course.completed) 
            .reduce((sum, course) => {
               
                const button = document.querySelector(`.courses button[data-number="${course.number}"]`);

                
                if (button && button.offsetParent !== null) {
                    return sum + course.credits;
                }

                return sum;
            }, 0);

        creditDisplay.textContent = `Total Credits: ${totalCredits}`;
    }

    function DisplayCourseDetails(course) {
    courseDetails.innerHTML = ``;
    courseDetails.innerHTML = ` 
    <button id="closeModal">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technology:</strong> ${course.technology.join(", ")}</p>
    <p><strong>Completed:</strong> ${course.completed ? "Yes" : "No"}</p>
    `;
    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => courseDetails.close());
}
});

