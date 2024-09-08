interface ResumeData {
    name: string;
    mobile: string;
    email: string;
    education: string;
    skills: string;
    experience: string;
    profilePicture: string | ArrayBuffer | null;
}

function generateResume(event: Event): void {
    event.preventDefault();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const mobileInput = document.getElementById("mobile") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const educationInput = document.getElementById("education") as HTMLInputElement;
    const skillsInput = document.getElementById("skills") as HTMLInputElement;
    const experienceInput = document.getElementById("experience") as HTMLTextAreaElement;
    const profileInput = document.getElementById("profilePicture") as HTMLInputElement;

    // Handle the profile picture input
    const file = profileInput.files?.[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const resumeData: ResumeData = {
            name: nameInput.value,
            mobile: mobileInput.value,
            email: emailInput.value,
            education: educationInput.value,
            skills: skillsInput.value,
            experience: experienceInput.value,
            profilePicture: e.target?.result || ""
        };

        displayResume(resumeData);
    };

    if (file) {
        reader.readAsDataURL(file); // Read the uploaded image as a DataURL
    }
}

function displayResume(data: ResumeData): void {
    const outputName = document.getElementById("outputName") as HTMLElement;
    const outputMobile = document.getElementById("outputMobile") as HTMLElement;
    const outputEmail = document.getElementById("outputEmail") as HTMLElement;
    const outputEducation = document.getElementById("outputEducation") as HTMLElement;
    const outputSkills = document.getElementById("outputSkills") as HTMLElement;
    const outputExperience = document.getElementById("outputExperience") as HTMLElement;
    const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
    const outputProfilePicture = document.getElementById("outputProfilePicture") as HTMLImageElement;

    outputName.innerText = `${data.name}`;
    outputMobile.innerText = `Mobile: ${data.mobile}`;
    outputEmail.innerText = `Email: ${data.email}`;
    outputEducation.innerText = `Education: ${data.education}`;
    outputSkills.innerText = `Skills: ${data.skills}`;
    outputExperience.innerText = `Experience: ${data.experience}`;
    
    // Set the uploaded image as the profile picture
    if (data.profilePicture) {
        outputProfilePicture.src = data.profilePicture.toString();
    } else {
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

function makeEditable(element: HTMLElement, field: keyof ResumeData, data: ResumeData): void {
    element.setAttribute("contenteditable", "true");
    element.addEventListener("blur", function () {
        // Update the ResumeData object when content is edited
        data[field] = element.innerText;
        console.log(`Updated ${field}: ${element.innerText}`);
    });
}

const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
resumeForm.addEventListener("submit", generateResume);
