function generateResume(event) {
    var _a;
    event.preventDefault();
    var nameInput = document.getElementById("name");
    var mobileInput = document.getElementById("mobile");
    var emailInput = document.getElementById("email");
    var educationInput = document.getElementById("education");
    var skillsInput = document.getElementById("skills");
    var experienceInput = document.getElementById("experience");
    var profileInput = document.getElementById("profilePicture");
    // Handle the profile picture input
    var file = (_a = profileInput.files) === null || _a === void 0 ? void 0 : _a[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var resumeData = {
            name: nameInput.value,
            mobile: mobileInput.value,
            email: emailInput.value,
            education: educationInput.value,
            skills: skillsInput.value,
            experience: experienceInput.value,
            profilePicture: ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) || ""
        };
        displayResume(resumeData);
    };
    if (file) {
        reader.readAsDataURL(file); // Read the uploaded image as a DataURL
    }
}
function displayResume(data) {
    var outputName = document.getElementById("outputName");
    var outputMobile = document.getElementById("outputMobile");
    var outputEmail = document.getElementById("outputEmail");
    var outputEducation = document.getElementById("outputEducation");
    var outputSkills = document.getElementById("outputSkills");
    var outputExperience = document.getElementById("outputExperience");
    var resumeOutput = document.getElementById("resumeOutput");
    var outputProfilePicture = document.getElementById("outputProfilePicture");
    outputName.innerText = "".concat(data.name);
    outputMobile.innerText = "Mobile: ".concat(data.mobile);
    outputEmail.innerText = "Email: ".concat(data.email);
    outputEducation.innerText = "Education: ".concat(data.education);
    outputSkills.innerText = "Skills: ".concat(data.skills);
    outputExperience.innerText = "Experience: ".concat(data.experience);
    // Set the uploaded image as the profile picture
    if (data.profilePicture) {
        outputProfilePicture.src = data.profilePicture.toString();
    }
    else {
        outputProfilePicture.src = ''; // Set to default if no picture is uploaded
    }
    resumeOutput.style.display = "block"; // Show the resume section
    // Make sections editable by adding contenteditable and saving changes on blur
    makeEditable(outputName, 'name', data);
    makeEditable(outputMobile, 'mobile', data);
    makeEditable(outputEmail, 'email', data);
    makeEditable(outputEducation, 'education', data);
    makeEditable(outputSkills, 'skills', data);
    makeEditable(outputExperience, 'experience', data);
}
function makeEditable(element, field, data) {
    element.setAttribute("contenteditable", "true");
    element.addEventListener("blur", function () {
        // Update the ResumeData object when content is edited
        data[field] = element.innerText;
        console.log("Updated ".concat(field, ": ").concat(element.innerText));
    });
}
var resumeForm = document.getElementById("resumeForm");
resumeForm.addEventListener("submit", generateResume);
