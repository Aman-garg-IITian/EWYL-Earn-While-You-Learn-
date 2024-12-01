1. INTRODUCTION
"Earn While You Learn" is essentially a job portal designed to make job hunting and learning go
hand in hand. It's like a virtual space where students and teachers from IIT Jammu can meet up
for job opportunities within the institute. Professors and staff can easily post jobs on this website,
and students can check them out and apply. It's a win-win – students get a chance to earn while
studying, and teachers find talented folks within the IIT community. It's all about making job
searches simpler and more connected to the school experience.

2. PROJECT OVERVIEW
The "Earn while you learn" website is a dynamic platform designed to bridge the gap
between job seekers and recruiters within the academic community of IIT Jammu. The
primary objective of this project is to create a user-friendly online space where students and
staff can seamlessly connect for part-time job opportunities, fostering a symbiotic
relationship that encourages skill development and financial independence among the student
body.
User Registration:
Students: Easy registration process for students to create profiles showcasing their skills and
academic achievements by uploading their Resume.
Staff/Recruiters: Dedicated registration for staff to post job opportunities.

Job Posting:
Recruiters: Ability to post job listings with detailed descriptions, job requirements, and
number of positions available with the provided stipend for the work.

Application Process:
Showcasing all jobs in a brief manner using pagination. The applicant can apply for any job
with just 2 clicks and can submit optional SOP with a word limit of 250 words to strongly
present themselves. Recruiters are not allowed to apply for jobs.

Selection Process:
Streamlined application management system for the recruiter to review, shortlist, accept or
reject the applicant and communicate the necessary information with applicants.

User Authentication and Security:
Robust user authentication mechanisms to ensure the security and confidentiality of user
data. The passwords are saved in the database in encrypted form and all the authentication is
done using jwt tokens.

3. USER ROLES
Students:
Registration: Students must sign up using their IIT Jammu email for account
verification through a verification link.
Profile Management: Maintain a comprehensive profile showcasing skills, resume,
and academic background.
Job Application: Apply to part-time job listings posted by recruiters.

Recruiters:
Registration: Recruiters are required to register using their official IIT Jammu email
for verification.
Job Posting: Post part-time job opportunities with detailed descriptions, requirements,
and relevant documents.
Application Management: Review, shortlist, and communicate with student
applicants.

4. FEATURES-
FEATURES FOR APPLICANTS:

SEARCH BAR:

● User Input: Users can enter job titles and specific skills directly into the search bar.
● Efficiency: This feature streamlines the job search process, allowing users to quickly
find relevant positions without navigating through multiple pages.
● Keyword Matching: The search algorithm matches user input with job titles and
skills, providing accurate and tailored results.

STATUS OF JOB:
● Application Tracking: Users can track the progress of their job applications.
● Transparency: The system provides transparency by clearly indicating whether an
application is "Applied" or "Rejected."
● Feedback: For rejected applications, a reason for rejection is provided, helping
applicants understand areas for improvement.

SOP (Statement of Purpose):
● Personalization: Applicants can submit a personalized SOP with their job application.
● Showcasing Skills: The SOP allows applicants to highlight their skills, express
genuine interest, and differentiate themselves from other candidates.
● Recruiter Insight: Recruiters gain insight into the applicant's motivations and
qualifications through the SOP.

RATINGS FEATURE:
● Post-Job Evaluation: After completing a job, applicants can rate their overall
experience.
● Feedback Loop: Ratings provide a feedback loop, enabling applicants to share
insights about the job and the employer.
● Informed Decisions: Future applicants can use these ratings to make informed
decisions about pursuing a specific job opportunity.

CLEARLY MENTIONED JOB DETAILS:
● Comprehensive Information: Job details include essential information such as
deadline, salary, required skills, and role responsibilities.
● Informed Decision-Making: Applicants can assess the suitability of a job based on
detailed information, making more informed decisions about whether to apply.

FILTERS:
User Filters (Job Search):

● Users can apply filters like salary range, job types, and duration to make their job
search more tailored.
● Sorting options based on these filters enhance the efficiency of the job search process,
helping users find the most relevant opportunities quickly.
Recruiter Filters (Applied Jobs):

● Recruiters have the ability to apply filters to manage and analyze the pool of
applicants for a particular job.
● Filters may include criteria such as skills, experience level, and education, allowing
recruiters to efficiently shortlist candidates based on specific requirements.
Applicant Filters (Applied Jobs):

● Applicants can also utilize filters to manage and track their applied jobs.
● Filters may include sorting options based on the status of their applications (e.g.,
Shortlisted, Accepted, Rejected) and additional criteria to help applicants organize
and prioritize their job applications.

STATUS OF APPLICATION:
● Application Categorization: Applications are categorized into statuses like
"Shortlisted," "Accepted," "Rejected," or "Canceled."
● Additional Context: Notes submitted by recruiters provide context and reasoning
behind each application status.

● Improved Communication: Enhances communication between applicants and
recruiters, leading to a more transparent and efficient recruitment process.

UPDATE USER INFO:
● Profile Maintenance: Users can update their profiles by adding new resumes, profile
pictures, and skills.
● Adaptability: Enables users to adapt their profiles to changes in skills, experiences, or
career objectives.
● Improved Visibility: A current and comprehensive profile increases visibility to
recruiters, potentially improving the chances of being noticed for relevant
opportunities.

EDIT/DELETE JOB:
Edit Job:
● Recruiters have the ability to edit job postings, allowing them to make changes to
various details.
● Editable fields may include deadlines, salary, job duration, required skills, and other
relevant information.

Delete Job:
● Recruiters can also delete job postings when necessary.
● Deleting a job removes it from the active job listings, preventing further applications.

INVALID INPUT CHECKING:

Deadline Check:

● Ensures recruiters enter future dates for job deadlines.
● Prevents posting jobs with unrealistic or expired deadlines.
Salary Range Validation:

● Verifies that entered salary falls within predefined ranges.

Duration Validation:

● Checks job duration for practicality.
● Prevents posting jobs with impractical timeframes.
Other Field Validations:

● Validates various fields for accuracy.
● Ensures mandatory fields are filled, maintaining data integrity.

CANCEL APPLICATIONS:
● If a recruiter deletes a job, all applicants for that job will have their applications
marked as "canceled."
● When an applicant is accepted for a job, any other pending applications from the
same applicant will be automatically canceled.
● Applicants have the option to cancel their own application if it is in process and has
not been accepted by the recruiter.

CAP ON NUMBER OF ACTIVE AND ACCEPTED APPLICATION:-
● Each applicant is limited to a maximum of 10 active applications at any given time.
● Once an applicant successfully secures a job, all other outstanding applications from
that applicant will be automatically canceled.

EMPLOYEES INFO:
● Recruiters have access to a list of all current employees.
● The list includes relevant information such as the date of joining for each employee.
● Recruiters can view uploaded Minutes of Meetings (MOM) for their current
employees.
